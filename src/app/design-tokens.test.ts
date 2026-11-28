import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function tokenIn(source: string, name: string): string | null {
  const match = source.match(
    new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6});`),
  );
  return match ? match[1] : null;
}

function token(name: string): string {
  const value = tokenIn(CSS, name);
  if (!value) throw new Error(`Missing design token --color-${name}`);
  return value;
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

const SURFACES = ["paper", "surface", "surface-sunk", "surface-soft"];
const TEXT_TOKENS = ["ink", "ink-muted", "primary-ink", "accent-ink"];
const GRAPHICS_TOKENS = ["primary", "accent"];
const SOLID_FILLS = [
  "action",
  "action-hover",
  "band",
  "primary-deep",
  "accent-ink",
  "ink",
];
const HUE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["primary", "accent"],
  ["primary", "accent-ink"],
  ["primary-ink", "accent"],
  ["primary-ink", "accent-ink"],
  ["action", "accent"],
];
const LIGHT_HUE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ...HUE_PAIRS,
  ["primary-deep", "accent"],
];

describe("brand values match the logo kit", () => {
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

  it("fills actions and the band with the text-safe blue in the light theme", () => {
    expect(token("action")).toBe(token("primary-ink"));
    expect(token("band")).toBe(token("primary-ink"));
  });
});

describe("text tokens meet AA on every light surface", () => {
  it.each(TEXT_TOKENS)("%s", (foreground) => {
    for (const surface of SURFACES) {
      expect(
        contrast(token(foreground), token(surface)),
        `${foreground} on ${surface}`,
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });
});

describe("graphics tokens clear 3:1 but are not usable for body text", () => {
  it.each(GRAPHICS_TOKENS)("%s", (foreground) => {
    for (const surface of SURFACES) {
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
  it.each(SOLID_FILLS)("white on %s", (background) => {
    expect(
      contrast(token("knockout"), token(background)),
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps secondary copy on the band legible", () => {
    expect(contrast(token("band-copy"), token("band"))).toBeGreaterThanOrEqual(
      AA_TEXT,
    );
  });

  it("keeps the inverse button legible at rest and on hover", () => {
    expect(contrast(token("action"), token("knockout"))).toBeGreaterThanOrEqual(
      AA_TEXT,
    );
    expect(
      contrast(token("primary-deep"), token("primary-muted")),
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe("the two hues must never be combined", () => {
  it.each(LIGHT_HUE_PAIRS)(
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

describe("the landing palette from the 2026-11 redesign", () => {
  it.each([
    ["navy-900", "#0b1b2b"],
    ["navy-800", "#0a2034"],
    ["navy-700", "#17395a"],
    ["blue-600", "#007fc2"],
    ["blue-700", "#006da8"],
    ["blue-400", "#34a9ec"],
    ["lenta", "#0e77b6"],
    ["orange-600", "#e85d30"],
    ["orange-700", "#d24e22"],
    ["fog-50", "#f3f7fa"],
    ["fog-200", "#e3eaf1"],
    ["fog-500", "#5b6b7c"],
    ["fog-600", "#4a5b6c"],
    ["navy-muted", "#9fb3c8"],
  ])("%s is %s", (name, value) => {
    expect(token(name)).toBe(value);
  });

  it("keeps the brand blue and orange equal to the logo kit", () => {
    expect(token("blue-600")).toBe(token("primary"));
    expect(token("orange-600")).toBe(token("accent"));
  });

  it.each(["knockout", "navy-copy", "navy-muted", "blue-400"])(
    "%s reads at AA on the navy ground",
    (foreground) => {
      expect(contrast(token(foreground), token("navy-900"))).toBeGreaterThanOrEqual(AA_TEXT);
      expect(contrast(token(foreground), token("navy-800"))).toBeGreaterThanOrEqual(AA_TEXT);
    },
  );

  it.each(["navy-900", "fog-600", "fog-500"])("%s reads at AA on the light grounds", (foreground) => {
    for (const surface of ["fog-50", "surface"]) {
      expect(contrast(token(foreground), token(surface)), `${foreground} on ${surface}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it("keeps white labels on the orange action at least large-text legible", () => {
    expect(contrast(token("knockout"), token("orange-600"))).toBeGreaterThanOrEqual(AA_LARGE);
    expect(contrast(token("knockout"), token("orange-700"))).toBeGreaterThanOrEqual(AA_LARGE);
  });

  it("keeps tag text legible on its tint", () => {
    expect(contrast(token("orange-ink"), token("orange-50"))).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrast(token("blue-ink"), token("blue-50"))).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("defines a single light token set, with no dark theme switch", () => {
    expect(CSS).not.toMatch(/data-theme/);
  });
});
