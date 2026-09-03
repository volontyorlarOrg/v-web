import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { RouteKey } from "@/lib/routing/routes";
import {
  hasVerifiedMarketingOrigin,
  marketingOrigin,
  marketingUrl,
} from "@/lib/seo/origin";
import { alternateUrls, localeUrl } from "@/lib/seo/urls";

const openGraphLocales: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export async function buildPageMetadata({
  locale,
  route,
  namespace,
  absoluteTitle = false,
}: {
  locale: Locale;
  route: RouteKey;
  namespace: string;
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const common = await getTranslations({ locale, namespace: "common" });

  const title = t("metaTitle");
  const description = t("metaDescription");
  const canonical = localeUrl(locale, route);
  const indexable = hasVerifiedMarketingOrigin();
  const socialImage = {
    url: marketingUrl("/opengraph-image.png"),
    width: 1200,
    height: 630,
    alt: common("organizationName"),
  };

  return {
    metadataBase: new URL(marketingOrigin()),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: alternateUrls(route),
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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
