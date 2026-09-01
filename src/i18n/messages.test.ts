import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/routing";

const MESSAGES_DIR = join(process.cwd(), "src/i18n/messages");

type Messages = { [key: string]: string | Messages };

function load(locale: string): Messages {
  return JSON.parse(readFileSync(join(MESSAGES_DIR, `${locale}.json`), "utf8"));
}

function flatten(messages: Messages, prefix = ""): string[] {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === "string"
      ? [`${prefix}${key}`]
      : flatten(value, `${prefix}${key}.`),
  );
}

function values(messages: Messages): Array<[string, string]> {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === "string"
      ? [[key, value] as [string, string]]
      : values(value),
  );
}

describe("message catalogs", () => {
  it("has exactly one catalog per supported locale", () => {
    const files = readdirSync(MESSAGES_DIR).filter((name) => name.endsWith(".json"));
    expect(files.sort()).toEqual(locales.map((locale) => `${locale}.json`).sort());
  });

  it("defines the same keys in every locale, so no locale falls back to English", () => {
    const reference = flatten(load("en")).sort();
    expect(reference.length).toBeGreaterThan(100);

    for (const locale of locales) {
      expect(flatten(load(locale)).sort(), `locale: ${locale}`).toEqual(reference);
    }
  });

  it("has no empty or placeholder string", () => {
    for (const locale of locales) {
      for (const [key, value] of values(load(locale))) {
        expect(value.trim(), `${locale}: ${key}`).not.toBe("");
        expect(value, `${locale}: ${key}`).not.toMatch(/TODO|FIXME|\{\{|lorem/i);
      }
    }
  });

  it("writes Uzbek with the turned comma, not a straight apostrophe", () => {
    for (const [key, value] of values(load("uz"))) {
      expect(value, `uz: ${key} uses ' instead of ʻ`).not.toMatch(/[a-z]'[a-z]/i);
    }
  });

  it("writes Russian in Cyrillic rather than leaving English copy behind", () => {
    const ru = values(load("ru"));
    const cyrillic = ru.filter(([, value]) => /[Ѐ-ӿ]/.test(value));
    expect(cyrillic.length / ru.length).toBeGreaterThan(0.8);
  });
});
