import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contrast guard for the token system.
 *
 * The brand specification allows `#007FC2` for graphics and text at 24px and
 * above only, and requires `#005E92` for body-size text and white-on-blue
 * labels. These assertions keep a future palette edit from quietly breaking
 * that, which is easy to do because both blues look similar.
 */
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
  const [high, low] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const AA_TEXT = 4.5;
const AA_LARGE = 3;

describe("design tokens", () => {
  const paper = token("paper");
  const surface = token("surface");
  const sunk = token("surface-sunk");
  const soft = token("surface-soft");

  it.each([
    ["ink on paper", "ink", "paper"],
    ["ink on surface", "ink", "surface"],
    ["ink-muted on paper", "ink-muted", "paper"],
    ["ink-muted on sunk surface", "ink-muted", "surface-sunk"],
    ["ink-muted on soft surface", "ink-muted", "surface-soft"],
    ["primary-ink on paper", "primary-ink", "paper"],
    ["primary-ink on soft surface", "primary-ink", "surface-soft"],
    ["destructive on paper", "destructive", "paper"],
  ])("%s meets AA for body text", (_label, foreground, background) => {
    expect(contrast(token(foreground), token(background))).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps solid actions legible: white on primary-ink and on primary-deep", () => {
    expect(contrast(token("primary-fg"), token("primary-ink"))).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrast(token("primary-fg"), token("primary-deep"))).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("keeps muted copy on the blue band legible", () => {
    expect(contrast(token("primary-muted"), token("primary-ink"))).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it("allows the brand blue for graphics and large type on every light surface", () => {
    for (const background of [paper, surface, sunk, soft]) {
      expect(contrast(token("primary"), background)).toBeGreaterThanOrEqual(AA_LARGE);
    }
  });

  it("documents that the brand blue is not usable for body text", () => {
    // If this ever passes, the palette changed and the "24px and above" rule in
    // docs/ui/UI_SYSTEM.md must be revisited rather than silently dropped.
    expect(contrast(token("primary"), paper)).toBeLessThan(AA_TEXT);
  });

  it("gives interactive borders a visible 3:1 boundary", () => {
    expect(contrast(token("border-control"), paper)).toBeGreaterThanOrEqual(AA_LARGE);
  });

  it("uses the delivered brand values", () => {
    expect(token("primary")).toBe("#007fc2");
    expect(token("primary-ink")).toBe("#005e92");
  });
});
