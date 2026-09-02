<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# YVC Web — Agent Guide

This repository is the public **Youth Volunteer Club** marketing website. Read
this file before meaningful work, then use [`docs/README.md`](docs/README.md) to
load only the project context the task needs.

## Product identity

**Youth Volunteer Club (YVC)** helps high school students in Uzbekistan find
volunteering that is real and worth their time. YVC finds opportunities,
contacts organisers, sources events, builds partnerships, supplies volunteers,
and is building regional operations toward all 14 regions.

Do not call the product "Youth Volunteering Community"; that name is retired.
The delivered logo lockup still carries a `volontyorlar` wordmark, which is why
the site renders the organisation name as real text next to the mark instead of
using the lockup — see `docs/brand/BRAND_ASSETS.md`.

Verified facts live in `src/lib/content/org.ts` and in
[`PRODUCT.md`](PRODUCT.md). Nothing outside those sources may be presented as
fact: no extra partners, statistics, testimonials, awards, offices, addresses,
or integrations.

## Repository boundary

This repository owns the public marketing site only: positioning, public pages,
partner presentation, SEO, metadata, structured data, legal pages, and links
into the separate product application.

It does not own volunteer authentication, sessions, dashboards, profiles,
applications, essays, ratings, attendance records, or admin workflows. Those
belong to the separate YVC application. Do not rebuild them here.

## Technology stack

- Next.js 16 App Router, React 19, strict TypeScript, Node.js 22.13+
- Tailwind CSS 4 with semantic tokens in `src/app/globals.css`
- `next-intl` for `uz` / `ru` / `en` routing and catalogs
- Radix/shadcn-compatible foundation: `class-variance-authority`, `clsx`,
  `tailwind-merge`, Lucide icons
- Vitest + Testing Library for units and components, Playwright for smoke paths
- npm with a committed lockfile

There is no theme library and no animation library: the design ships one light
theme and motion is otherwise CSS-only. Do not add TanStack, React Hook Form,
Zod, Zustand, auth SDKs, or dashboard packages.

`three` is the single exception, and it is scoped to one surface: the home
page's hero map (`src/components/marketing/hero-map/`). It is loaded
dynamically so it never enters the initial bundle, and the section renders a
complete server-side SVG map without it. Adding WebGL anywhere else, or reaching
for a React renderer such as `@react-three/fiber`, needs a fresh decision — see
`docs/architecture/ARCHITECTURE.md`.

For framework behaviour, read `node_modules/next/dist/docs/` before relying on
older Next.js knowledge. Middleware is called Proxy in Next.js 16
(`src/proxy.ts`).

## Repository map

```text
src/app/[locale]/(marketing)/  -> production marketing pages
src/app/{robots,sitemap}.ts    -> crawl policy and localized sitemap
src/app/global-not-found.tsx   -> 404 for unmatched URLs (root layout is dynamic)
src/i18n/                      -> routing, navigation, request config, catalogs
src/lib/seo/                   -> origin helpers, metadata builder, JSON-LD
src/lib/routing/routes.ts      -> the public route registry
src/lib/content/               -> verified facts and call-to-action resolution
src/lib/constants/             -> external channels and analytics event names
src/components/{ui,brand,marketing}/
e2e/                           -> Playwright smoke suite
docs/                          -> stable project documentation
.agent-memory/                 -> durable decisions, discoveries, gotchas
```

## Critical rules

- Preserve the mobile-first path from Telegram: no horizontal overflow, thumb
  sized controls, fast first render, and no hover-only interaction.
- Never invent an origin. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ORIGIN`,
  `NEXT_PUBLIC_TELEGRAM_URL`, and `NEXT_PUBLIC_INSTAGRAM_URL` are all blank by
  default, and the interface degrades instead of guessing. An unconfigured
  marketing origin means `noindex` plus a disallowing `robots.txt`.
- Keep secrets out of source control. `NEXT_PUBLIC_*` values reach every browser.
- Every user-facing string exists in `uz`, `ru`, and `en`. Uzbek uses the turned
  comma `ʻ` (U+02BB), Russian uses Cyrillic, and a test enforces key parity.
- Add a public page by registering it in `src/lib/routing/routes.ts`; anything
  else is invisible to the navigation and the sitemap.
- Two brand colours with a role each. **Blue is the institution**: navigation,
  structure, primary actions, the mark. **Orange is the person**: a confirmed
  hour, a level reached, a number counting what people did. Blue and orange sit
  1.25:1 apart and must never be combined — no two-colour mark, no orange on
  blue, no blue on orange. Each hue has a graphics value (`#007FC2`, `#E85D30`,
  24px and above) and a text value (`#005E92`, `#B34917`). The palette defines
  no red. Use semantic tokens, never a literal hex.
- Preserve reduced-motion behaviour, keyboard access, visible focus states, one
  logical `h1` per page, and responsive behaviour.
- Update `/docs` when stable environment or architecture behaviour changes.

## Code conventions

- **Source files carry no comments.** Explanations go in `/docs` — see
  [`docs/operations/EXTENDING.md`](docs/operations/EXTENDING.md). Names, types,
  and test names carry intent inside the source. Compiler and linter directives
  are not comments and stay.
- Server Components by default; `"use client"` only for event handlers, client
  state, browser APIs, or an interactive primitive, with the boundary as low as
  practical.
- Internal links use `navHref()` with `Link` from `@/i18n/navigation`, which
  adds the locale prefix itself. `localePath()` and `localeUrl()` are for
  anchors, canonical URLs, and structured data. Mixing them yields `/uz/uz/...`.
- No literal hex, no hard-coded origin, no fabricated fact.

## Default verification

```bash
npm run lint
npm run typecheck
npm run test
git diff --check
```

Add `npm run build` for build or deployment work, and `npm run test:e2e` when
routing, navigation, or the information architecture changes. For UI work also
inspect the affected routes at mobile and desktop widths and with reduced
motion.

To add anything — a page, copy, a locale, a token, a component, an external
link — follow [`docs/operations/EXTENDING.md`](docs/operations/EXTENDING.md).
