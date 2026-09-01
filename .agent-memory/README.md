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
- `gotchas/product-brief-is-not-live-state.md` — what may and may not be claimed
- `gotchas/svg-lockup-wordmark-font.md` — why the delivered lockup is not used
- `gotchas/scroll-driven-reveals-are-blank-off-screen.md` — why there are no
  scroll reveals
- `gotchas/next-intl-provider-ships-every-message.md` — how to avoid shipping
  every locale string to the browser
- `gotchas/next-typegen-before-typecheck.md` — why `typecheck` runs typegen
