import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import uzMessages from "@/i18n/messages/uz.json";
import { defaultLocale } from "@/i18n/routing";

const CSS = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function lightToken(name: string): string {
  const match = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6});`));
  if (!match) throw new Error(`Missing design token --color-${name}`);
  return match[1];
}

describe("web app manifest", () => {
  const result = manifest();

  it("names the organisation as the site does", () => {
    expect(result.name).toBe(uzMessages.common.organizationName);
    expect(result.short_name).toBe(uzMessages.common.organizationShortName);
    expect(result.description).toBe(uzMessages.home.metaDescription);
  });

  it("starts at the root so the proxy can negotiate the visitor's locale", () => {
    expect(result.start_url).toBe("/");
    expect(result.scope).toBe("/");
    expect(result.lang).toBe(defaultLocale);
  });

  it("paints the launch screen with the light theme's own tokens", () => {
    expect(result.background_color).toBe(lightToken("paper"));
    expect(result.theme_color).toBe(lightToken("action"));
  });

  it("points every icon at a file that exists", () => {
    const icons = result.icons ?? [];
    expect(icons.length).toBeGreaterThan(0);

    for (const icon of icons) {
      expect(existsSync(join(process.cwd(), "public", icon.src))).toBe(true);
    }
  });

  it("ships the two raster sizes an installable icon needs", () => {
    const sizes = (result.icons ?? []).map((icon) => icon.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  it("never claims a maskable icon, because the tile has transparent corners", () => {
    for (const icon of result.icons ?? []) {
      expect(icon.purpose).toBe("any");
    }
  });
});
