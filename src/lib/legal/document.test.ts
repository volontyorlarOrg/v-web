import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import en from "@/i18n/messages/en.json";
import ru from "@/i18n/messages/ru.json";
import uz from "@/i18n/messages/uz.json";

import { LEGAL_DOCUMENT_HASHES } from "./document";

const catalogs = { uz, ru, en };

describe("published legal text", () => {
  it.each(["uz", "ru", "en"] as const)(
    "matches the %s text volunteers consent to in the backend archive",
    (locale) => {
      const { privacy, terms } = catalogs[locale];
      const text = `${JSON.stringify({ privacy, terms }, null, 2)}\n`;
      expect(createHash("sha256").update(text).digest("hex")).toBe(
        LEGAL_DOCUMENT_HASHES[locale],
      );
    },
  );
});
