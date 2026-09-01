# Indexing is opt-in, keyed on NEXT_PUBLIC_SITE_URL

No production hostname is proven by this repository, and the handoff forbids
inventing one. Rather than skip `robots.ts`, `sitemap.ts`, and canonical URLs
until a domain exists, they were built and gated:

- `hasVerifiedMarketingOrigin()` is false while `NEXT_PUBLIC_SITE_URL` is empty;
- pages then send `noindex, nofollow`, `robots.txt` disallows everything, and
  the sitemap is empty;
- `marketingOrigin()` falls back to `http://localhost:3000`, which is obviously
  not a claim about production.

This means **a production deployment that forgets the variable will not be
indexed**. That is the intended failure direction — an unindexed launch is
recoverable, a placeholder host competing with the real domain in search results
is not — but it must be on the launch checklist. It is, in
`docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md`.

The same shape covers `NEXT_PUBLIC_APP_ORIGIN` (app links are not rendered) and
the channel URLs (the join action falls back to `/contact`).
