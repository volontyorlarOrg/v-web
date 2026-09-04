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

## Needs verification

| Decision | Current evidence |
| --- | --- |
| Public marketing domain | None |
| Product application origin | None |
| Hosting provider | None |
| Preview deployment policy | None |
| Canonical and `www` redirect policy | None |
| DNS ownership | None |
| Deployment trigger and rollback procedure | None |

Do not copy hostnames, project identifiers, redirects, or environment values
from any reference repository. Add them only once they are verified externally
and represented in executable configuration.
