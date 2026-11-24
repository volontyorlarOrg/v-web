import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

import { googleTagManagerId } from "./src/lib/analytics/config";
import {
  configuredTransportIsSecure,
  securityHeaders,
} from "./src/lib/security/headers";

const development = process.env.NODE_ENV === "development";
const secureTransport = configuredTransportIsSecure(process.env.NEXT_PUBLIC_SITE_URL);
const analyticsEnabled = Boolean(googleTagManagerId());

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({ development, secureTransport, analyticsEnabled }),
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
