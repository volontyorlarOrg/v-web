import type { MetadataRoute } from "next";

import { defaultLocale, locales } from "@/i18n/routing";
import { alternateUrls, localeUrl, publicRoutes } from "@/lib/routing/routes";
import { hasVerifiedMarketingOrigin } from "@/lib/seo/origin";

/**
 * One entry per route per locale, each carrying the full `hreflang` set so the
 * three language versions are reported as alternates of one another. The
 * sitemap stays empty while no canonical host is configured, matching
 * `robots.ts`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasVerifiedMarketingOrigin()) return [];

  const lastModified = new Date();

  return publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route.key),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...alternateUrls(route.key),
          "x-default": localeUrl(defaultLocale, route.key),
        },
      },
    })),
  );
}
