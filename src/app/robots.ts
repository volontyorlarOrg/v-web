import type { MetadataRoute } from "next";

import { hasVerifiedMarketingOrigin, marketingOrigin, marketingUrl } from "@/lib/seo/origin";

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
