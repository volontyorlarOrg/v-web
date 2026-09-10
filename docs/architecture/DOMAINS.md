# Domains and Hosting

## Implemented

No production hostname is hard-coded anywhere. All origins are read from
configuration through `src/lib/seo/origin.ts` and `src/lib/constants/channels.ts`:

| Helper | Source | Behaviour when unset |
| --- | --- | --- |
| `marketingOrigin()` | `NEXT_PUBLIC_SITE_URL` | Falls back to `http://localhost:3000` |
| `hasVerifiedMarketingOrigin()` | `NEXT_PUBLIC_SITE_URL` | `false` |
| `appOrigin()` / `appHref(path)` | `NEXT_PUBLIC_APP_ORIGIN` | `null`; app links are not rendered |
| `channelUrl('telegram' \| 'instagram')` | `NEXT_PUBLIC_TELEGRAM_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` | `null`; the channel is omitted |

Values must be `http(s)` origins; anything else is rejected and treated as
unset. A configured origin is normalised, so a trailing path is discarded.

`loginDestination(locale)` in `src/lib/content/cta.ts` resolves the sign-in
action — in the hero, in the desktop header beside "Join us", and in the
mobile menu — from `appHref('/{locale}/login')`, so a visitor lands in the
product application in the language they were reading. It returns `null`
while the product origin is unset, so the button is absent rather than
pointing somewhere invented. That is the whole reason a deployment without
`NEXT_PUBLIC_APP_ORIGIN` shows only "Join us": set the variable on the host
and redeploy. Give a development machine a placeholder origin in `.env.local`
to render it.

`opportunitiesDestination(locale)` follows the same application-only rule for
the volunteering page. `joinDestination()` is different by design: it uses the
configured Telegram channel when present and otherwise stays inside the
marketing site at `/contact`.

Every destination carries `newTab`. Links into the product application open in
the same tab — it is the same product — while the Telegram community channel
opens a new one. `ActionLink` and `MobileNav` read that flag rather than
treating every external link alike.

**Indexing is gated on the marketing origin.** While `NEXT_PUBLIC_SITE_URL` is
empty, every page sends `noindex, nofollow`, `robots.txt` disallows all crawling,
and the sitemap is empty. A preview or placeholder deployment therefore cannot
compete with the eventual production domain.

Production has been serving with the origin set since 2026-09-09: `robots.txt`
answers `Allow: /` with `Host:` and `Sitemap:` lines, `sitemap.xml` publishes all
21 localized URLs, and every page carries `index, follow` with an apex canonical.
Google accepted the sitemap on the same day.

## Verified

| Decision | Value | Evidence |
| --- | --- | --- |
| Public marketing domain | `https://volontyorlar.uz` | `NEXT_PUBLIC_SITE_URL` in the `env/` store's production file for this project |
| Product application origin | `https://app.volontyorlar.uz` | `NEXT_PUBLIC_APP_ORIGIN` in the same file, and the Telegram OIDC redirect registered against that host |
| Hosting provider | Vercel, one project per frontend; the API is a Render service | `env/SERVICE_SETUP.md` and `env/README.md`, which map each production file to its provider |
| Deployment trigger | A push to `main` | Both frontends deploy from `main` |
| Authoritative DNS | aHOST (`rdns1`–`rdns3.ahost.uz`) | `dig NS volontyorlar.uz`, answered 2026-09-09 |
| Canonical host | The apex. `www.volontyorlar.uz` redirects to it, preserving the path | `dig`/`curl` against production, 2026-09-09 |
| Google ownership | Verified by DNS `TXT` on the apex, as a Search Console **Domain** property | The `google-site-verification=` record is present in the apex `TXT` set |

These are recorded here because they are settled, not because they are
hard-coded. Nothing above appears in source: every origin is still read through
`src/lib/seo/origin.ts`, and the behaviour when a value is unset is unchanged.
The real values live in the `env/` store beside these repositories, outside
version control, and are set in the Vercel project rather than in this
repository.

## Needs verification

| Decision | Current evidence |
| --- | --- |
| Preview deployment policy | None. Whether previews are reachable, and whether `NEXT_PUBLIC_SITE_URL` is scoped to production, decides whether a preview advertises a canonical URL it does not serve |
| Rollback procedure | None |
| Redirect permanence | The `www` redirect answers `307`, which is temporary. Vercel defaults a domain redirect to `307` and offers `308`; until it is `308`, Google is told the move may be undone and may keep the `www` URL alongside the apex. The canonical tag on every `www` page already points at the apex, so this is a weaker signal rather than a broken one |

Do not copy hostnames, project identifiers, redirects, or environment values
from any reference repository. Add them only once they are verified externally
and represented in executable configuration.

## Account entry from marketing

When `NEXT_PUBLIC_APP_ORIGIN` is configured, the header (including mobile
navigation), homepage hero, and closing homepage action send visitors to
`/{locale}/signup` in the separate application. Existing users retain the
`/{locale}/login` action. These routes are implemented by `v-app`.

Without an application origin, these primary actions keep their community
labels and use the existing Telegram/contact fallback. Footer community links
continue to use `joinDestination()` independently of account creation.
