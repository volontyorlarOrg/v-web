import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { localePath, type RouteKey } from "@/lib/routing/routes";
import { marketingOrigin } from "@/lib/seo/origin";

export function localeUrl(locale: Locale, route: RouteKey): string {
  return new URL(localePath(locale, route), `${marketingOrigin()}/`).toString();
}

export function alternateUrls(route: RouteKey): Record<Locale | "x-default", string> {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, localeUrl(locale, route)]),
  ) as Record<Locale, string>;

  return {
    ...alternates,
    "x-default": localeUrl(defaultLocale, route),
  };
}
