# Web Security Boundary

## Implemented

`next.config.ts` disables the framework fingerprint and sends these headers on
every response:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-DNS-Prefetch-Control: on`
- `Permissions-Policy` denying camera, microphone, geolocation, and
  browsing-topics
- `Strict-Transport-Security` for HTTPS deployments
- a Content Security Policy

They are built by `src/lib/security/headers.ts`, which `next.config.ts` calls
with development derived from `NODE_ENV` and secure transport derived from a
validated HTTPS `NEXT_PUBLIC_SITE_URL`.

The policy is first-party only, which the site can afford because it loads no
third-party script, style, frame, font, or image:

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none';
form-action 'self'; img-src 'self' data:; font-src 'self';
style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';
connect-src 'self'; manifest-src 'self'; upgrade-insecure-requests
```

Development adds `'unsafe-eval'` to `script-src` because React uses it for
debugging, and `ws:` to `connect-src` for hot reload. These exceptions are
excluded from production headers.

**`upgrade-insecure-requests` and `Strict-Transport-Security` are sent only when
the configured marketing origin uses HTTPS.** Both describe a site reached over
TLS. A production-mode server may still run over plain HTTP locally or behind a
TLS-terminating platform, so `NODE_ENV` alone is not transport evidence.
Chromium exempts localhost from insecure-request upgrades; WebKit does not.
Keying the directives to the verified public origin keeps local production
smoke tests styled and hydrated in Safari while retaining them for an HTTPS
launch. Unit tests cover configuration parsing, and Playwright asserts the
actual response headers on the plain-HTTP test server.

**Known weakness:** `script-src` and `style-src` allow `'unsafe-inline'`.
Next.js App Router emits inline bootstrap scripts and inlines critical CSS, and
tightening this to a nonce would require rendering every page per-request, which
would give up static generation for a site that currently ships no third-party
code and no user input. Revisit this the moment a third-party script is
introduced.

Remote `next/image` hosts are empty. Fonts are self-hosted by `next/font`.

## Trust boundary

The marketing site has no accounts, sessions, forms, uploads, or database. It
never receives user input, so it has nothing to validate or sanitise, and it
never handles volunteer data.

It sets **no cookies**. The locale cookie `next-intl` would otherwise write is
disabled in `src/i18n/routing.ts`, so the URL remains the only language state.
The one browser-storage value is the light/dark theme choice in `localStorage`;
it stays on the device and is never sent to the server. The privacy page states
this distinction explicitly.

Outbound links to Telegram, Instagram, or the product application open with
`rel="noopener noreferrer"`.

## Not implemented

- authentication, authorization, or session handling
- form submission, file upload, or rate limiting
- analytics, monitoring, or error reporting
- Telegram signature verification

## Secrets

The site requires no secret to install, lint, typecheck, test, or build, and CI
supplies none. The four supported variables are all `NEXT_PUBLIC_*` and are
embedded in the browser bundle by design; none of them may ever hold a bot
token, session key, or database credential. If a public-site build ever needs a
secret, revisit the repository boundary before adding one.

## Needs verification

- Whether the eventual host applies or overrides these headers
- Whether a stricter CSP becomes possible or necessary once hosting is chosen
- HTTPS behaviour and HSTS preload eligibility on the production domain
