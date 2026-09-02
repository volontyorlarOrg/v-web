# Project Memory

Store durable project knowledge here when it would otherwise be expensive to
rediscover.

- `decisions/` — choices and the reasoning behind them
- `discoveries/` — verified facts about the project or its integrations
- `gotchas/` — recurring failure modes and constraints

Keep temporary plans, command logs, and ordinary status updates out of this
folder. Never store secrets or unverified external claims.

## Current entries

- `decisions/production-design-and-locale-architecture.md` — why the four
  exploration routes became one design system, one typeface, and three locales
- `decisions/indexing-gated-on-verified-origin.md` — why the site refuses to be
  indexed until a canonical origin is configured
- `decisions/two-brand-hues-with-a-role-split.md` — blue for the institution,
  orange for the person, and why they may never touch
- `decisions/source-files-carry-no-comments.md` — where the explanations went
- `decisions/three-js-scoped-to-the-hero-map.md` — why WebGL is allowed on one
  surface, and the three conditions it has to keep meeting
- `gotchas/product-brief-is-not-live-state.md` — what may and may not be claimed
- `gotchas/svg-lockup-wordmark-font.md` — why the delivered lockup is not used
- `gotchas/scroll-driven-reveals-are-blank-off-screen.md` — why there are no
  scroll reveals
- `gotchas/next-intl-provider-ships-every-message.md` — how to avoid shipping
  every locale string to the browser
- `gotchas/next-typegen-before-typecheck.md` — why `typecheck` runs typegen
- `gotchas/tailwind-minifies-hex-tokens-to-three-digits.md` — why a design token
  read at run time must not be parsed as a base-16 integer
- `gotchas/building-while-the-dev-server-runs-unstyles-the-page.md` — why a
  production build breaks a live `next dev`, and how to recognise it
- `gotchas/upgrade-insecure-requests-breaks-safari-on-localhost.md` — why the
  site rendered unstyled in Safari and perfectly in Chrome
- `gotchas/a-base-rule-on-headings-catches-label-headings.md` — why the footer's
  column headings had to opt back into the sans
