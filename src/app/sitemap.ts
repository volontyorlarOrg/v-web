import type { MetadataRoute } from "next";

import { locales } from "@/i18n/routing";
import { publicRoutes } from "@/lib/routing/routes";
import { hasVerifiedMarketingOrigin } from "@/lib/seo/origin";
import { alternateUrls, localeUrl } from "@/lib/seo/urls";
import { getBlogList } from "@/lib/blog/blog.server";
import { marketingUrl } from "@/lib/seo/origin";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!hasVerifiedMarketingOrigin()) return [];

  const lastModified = new Date();

  const staticPages = publicRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route.key),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: alternateUrls(route.key) },
    })),
  );
  const articlePages: MetadataRoute.Sitemap = [];
  try {
    let page = 1;
    let total = Infinity;
    while ((page - 1) * 24 < total && page <= 100) {
      const list = await getBlogList("uz", page, 24);
      total = list.total;
      for (const item of list.items) {
        const languages = Object.fromEntries(
          item.availableLocales.map((locale) => [
            locale,
            marketingUrl(`/${locale}/blog/${encodeURIComponent(item.slug)}`),
          ]),
        );
        for (const locale of item.availableLocales) {
          articlePages.push({
            url: marketingUrl(
              `/${locale}/blog/${encodeURIComponent(item.slug)}`,
            ),
            lastModified: item.publishedAt
              ? new Date(item.publishedAt)
              : lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
            alternates: { languages },
          });
        }
      }
      if (!list.items.length) break;
      page += 1;
    }
  } catch {
    return staticPages;
  }
  return [...staticPages, ...articlePages];
}
