import type { MetadataRoute } from "next";

import { hasVerifiedMarketingOrigin, marketingOrigin, marketingUrl } from "@/lib/seo/origin";

/**
 * Indexing is opt-in. Until `NEXT_PUBLIC_SITE_URL` names a verified canonical
 * host, every deployment — preview or placeholder — asks crawlers to stay away
 * rather than competing with the eventual production domain.
 */
export default function robots(): MetadataRoute.Robots {
  if (!hasVerifiedMarketingOrigin()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: marketingUrl("/sitemap.xml"),
    host: marketingOrigin(),
  };
}
