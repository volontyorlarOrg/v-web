import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function token(name: string): string {
  const match = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6});`));
  if (!match) throw new Error(`Missing design token --color-${name}`);
  return match[1];
}

function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [high, low] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (high + 0.05) / (low + 0.05);
}

const AA_TEXT = 4.5;
const AA_LARGE = 3;

const LIGHT_SURFACES = ["paper", "surface", "surface-sunk", "surface-soft"];

describe("brand values match docs/brand/LOGO_SPEC.md", () => {
  it.each([
    ["primary", "#007fc2"],
    ["primary-ink", "#005e92"],
    ["accent", "#e85d30"],
    ["accent-ink", "#b34917"],
    ["ink", "#222b33"],
    ["knockout", "#ffffff"],
  ])("%s is %s", (name, value) => {
    expect(token(name)).toBe(value);
  });
});

describe("text tokens meet AA on every light surface", () => {
  it.each(["ink", "ink-muted", "primary-ink", "accent-ink"])(
    "%s",
    (foreground) => {
      for (const surface of LIGHT_SURFACES) {
        expect(
          contrast(token(foreground), token(surface)),
          `${foreground} on ${surface}`,
        ).toBeGreaterThanOrEqual(AA_TEXT);
      }
    },
  );
});

describe("graphics tokens clear 3:1 but are not usable for body text", () => {
  it.each(["primary", "accent"])("%s", (foreground) => {
    for (const surface of LIGHT_SURFACES) {
      expect(
        contrast(token(foreground), token(surface)),
        `${foreground} on ${surface}`,
      ).toBeGreaterThanOrEqual(AA_LARGE);
    }
    expect(contrast(token(foreground), token("paper"))).toBeLessThan(AA_TEXT);
  });

  it("puts orange figures on white, where the margin is comfortable", () => {
    expect(contrast(token("accent"), token("surface"))).toBeGreaterThan(3.4);
  });
});

describe("knockout labels on solid fills", () => {
  it.each(["primary-ink", "primary-deep", "accent-ink", "ink"])(
    "white on %s",
    (background) => {
      expect(
        contrast(token("knockout"), token(background)),
      ).toBeGreaterThanOrEqual(AA_TEXT);
    },
  );

  it("keeps muted copy on the blue band legible", () => {
    expect(
      contrast(token("primary-muted"), token("primary-ink")),
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe("the two hues must never be combined", () => {
  it.each([
    ["primary", "accent"],
    ["primary", "accent-ink"],
    ["primary-ink", "accent"],
    ["primary-deep", "accent"],
  ])(
    "%s and %s are too close to sit on each other",
    (blue, orange) => {
      expect(contrast(token(blue), token(orange))).toBeLessThan(AA_LARGE);
    },
  );
});

describe("structural tokens", () => {
  it("gives interactive borders a visible 3:1 boundary", () => {
    expect(
      contrast(token("border-control"), token("paper")),
    ).toBeGreaterThanOrEqual(AA_LARGE);
  });

  it("defines no red, which would be indistinguishable from accent-ink", () => {
    expect(CSS).not.toMatch(/--color-destructive/);
  });
});
