import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultLocale, locales } from "@/i18n/routing";
import { publicRoutes } from "@/lib/routing/routes";
import { alternateUrls, localeUrl } from "@/lib/seo/urls";

describe("canonical and alternate URLs", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
  });

  it("builds absolute canonical URLs on the configured origin", () => {
    expect(localeUrl("ru", "contact")).toBe("https://example.org/ru/contact");
  });

  it("lists every locale and x-default for every route", () => {
    for (const route of publicRoutes) {
      const alternates = alternateUrls(route.key);
      expect(Object.keys(alternates).sort()).toEqual([...locales, "x-default"].sort());
      for (const locale of locales) {
        expect(alternates[locale]).toBe(localeUrl(locale, route.key));
      }
    }
  });

  it("points x-default at the default locale", () => {
    expect(alternateUrls("home")["x-default"]).toBe(localeUrl(defaultLocale, "home"));
  });
});
