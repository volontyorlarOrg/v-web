import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { defaultLocale, type Locale } from "@/i18n/routing";
import { alternateUrls, localeUrl, type RouteKey } from "@/lib/routing/routes";
import { hasVerifiedMarketingOrigin, marketingOrigin } from "@/lib/seo/origin";

/** Open Graph locale identifiers for the three product languages. */
const openGraphLocales: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/**
 * Every marketing page builds its metadata here so canonical URLs, `hreflang`
 * alternates, Open Graph, and indexing policy stay consistent.
 *
 * Indexing is opt-in: without a configured marketing origin the deployment has
 * no verified canonical host, so the pages are marked `noindex` rather than
 * inviting search engines onto a preview or placeholder domain.
 */
export async function buildPageMetadata({
  locale,
  route,
  namespace,
  absoluteTitle = false,
}: {
  locale: Locale;
  route: RouteKey;
  /** Message namespace holding `metaTitle` and `metaDescription`. */
  namespace: string;
  /** Skip the "· YVC" suffix, for titles that already name the organisation. */
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const common = await getTranslations({ locale, namespace: "common" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = localeUrl(locale, route);
  const indexable = hasVerifiedMarketingOrigin();

  return {
    metadataBase: new URL(marketingOrigin()),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...alternateUrls(route),
        "x-default": localeUrl(defaultLocale, route),
      },
    },
    openGraph: {
      type: "website",
      siteName: common("organizationName"),
      title,
      description,
      url: canonical,
      locale: openGraphLocales[locale],
      alternateLocale: Object.entries(openGraphLocales)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
