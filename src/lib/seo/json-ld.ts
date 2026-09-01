import type { Locale } from "@/i18n/routing";
import { localeUrl, type RouteKey } from "@/lib/routing/routes";
import { marketingUrl } from "@/lib/seo/origin";
import { FOUNDED_ON, FOUNDERS } from "@/lib/content/org";
import { verifiedSocialUrls } from "@/lib/constants/channels";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd({
  locale,
  name,
  description,
}: {
  locale: Locale;
  name: string;
  description: string;
}): JsonLd {
  const sameAs = verifiedSocialUrls();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${localeUrl(locale, "home")}#organization`,
    name,
    alternateName: "YVC",
    description,
    url: localeUrl(locale, "home"),
    logo: marketingUrl("/logo/png/mark-blue-512.png"),
    foundingDate: FOUNDED_ON,
    founder: FOUNDERS.map((founder) => ({ "@type": "Person", name: founder })),
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function webSiteJsonLd({
  locale,
  name,
  description,
}: {
  locale: Locale;
  name: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${localeUrl(locale, "home")}#website`,
    name,
    description,
    url: localeUrl(locale, "home"),
    inLanguage: locale,
    publisher: { "@id": `${localeUrl(locale, "home")}#organization` },
  };
}

export function breadcrumbJsonLd({
  locale,
  trail,
}: {
  locale: Locale;
  trail: ReadonlyArray<{ name: string; route: RouteKey }>;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localeUrl(locale, item.route),
    })),
  };
}
