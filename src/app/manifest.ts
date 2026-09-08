import type { MetadataRoute } from "next";

import uzMessages from "@/i18n/messages/uz.json";
import { defaultLocale } from "@/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: uzMessages.common.organizationName,
    short_name: uzMessages.common.organizationShortName,
    description: uzMessages.home.metaDescription,
    lang: defaultLocale,
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f8fb",
    theme_color: "#005e92",
    icons: [
      { src: "/logo/png/icon-blue-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo/png/icon-blue-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo/icon-blue.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
