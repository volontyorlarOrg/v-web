# Web Security Boundary

## Implemented

`next.config.ts` disables the framework fingerprint and sends baseline headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-DNS-Prefetch-Control: on`
- a restrictive camera, microphone, geolocation, and browsing-topics policy
- HSTS for HTTPS deployments

Remote Next Image hosts are empty. The marketing site currently requires no
environment variables.

## Not implemented

- Content Security Policy
- authentication or authorization
- session cookies
- form submission or file upload
- rate limiting
- analytics, monitoring, or error reporting
- Telegram signature verification

## Needs verification

A CSP must be designed only after the real Telegram flow and any third-party
assets are known. Do not copy Dwelve's Google-specific allowances. Production
headers and HTTPS behavior must be verified against the deployed host.
