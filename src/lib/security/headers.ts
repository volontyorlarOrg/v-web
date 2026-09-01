export type SecurityHeader = { key: string; value: string };

export function contentSecurityPolicy({ secureTransport }: { secureTransport: boolean }): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "manifest-src 'self'",
    ...(secureTransport ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

export function securityHeaders({
  secureTransport,
}: {
  secureTransport: boolean;
}): SecurityHeader[] {
  return [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    ...(secureTransport
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ]
      : []),
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ secureTransport }) },
  ];
}
