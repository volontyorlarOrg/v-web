import { defineRouting } from "next-intl/routing";

/**
 * Uzbek is the default audience locale. Russian and English are full product
 * locales, not fallbacks: every user-facing string exists in all three.
 */
export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

/** Native label for the language switcher; never translated. */
export const localeNames: Record<Locale, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // One locale per URL. The prefix is always present so a canonical URL can
  // never render two different languages.
  localePrefix: "always",
  // No cookie is written: the URL is the only source of language state, and
  // the site stays cookie-free for privacy and caching.
  localeCookie: false,
  // Alternates are emitted from the metadata layer instead, so they stay in
  // one place with the canonical URLs.
  alternateLinks: false,
});

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
