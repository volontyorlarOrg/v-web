import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const CSS = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [path] : [];
  });
}

describe("typography", () => {
  it("sets the whole site in Onest, with no second typeface", () => {
    expect(CSS).toMatch(/--font-sans:\s*var\(--font-onest\)/);
    expect(CSS).not.toMatch(/--font-serif|font-source-serif|Source_Serif/);
  });

  it("gives headings Onest at extra-bold weight with tight tracking", () => {
    const base = CSS.slice(CSS.indexOf("h1,"), CSS.indexOf("::selection"));
    expect(base).toContain("--font-sans");
    expect(base).toMatch(/font-weight:\s*800/);
    expect(base).toMatch(/letter-spacing:\s*-0\.0\d+em/);
  });

  it("never reaches for a serif utility in source", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles(join(ROOT, "src"))) {
      const source = readFileSync(file, "utf8");
      if (/\bfont-serif\b|Source_Serif_4/.test(source)) {
        offenders.push(file.replace(`${ROOT}/`, ""));
      }
    }

    expect(offenders).toEqual([]);
  });

  it("keeps the display scale ahead of the body scale", () => {
    const size = (token: string) => {
      const match = CSS.match(new RegExp(`--text-${token}:\\s*clamp\\(([^,]+),`));
      if (!match) throw new Error(`no --text-${token} in globals.css`);
      return Number.parseFloat(match[1]);
    };
    expect(size("display")).toBeGreaterThan(size("headline"));
    expect(size("headline")).toBeGreaterThan(size("lead"));
  });
});
