# Volontyorlar Web

The public, mobile-first marketing website for **Volontyorlar**,
a volunteering community for high school students in Uzbekistan.

This repository is the marketing site only. Volunteer accounts, opportunity
browsing, applications, and records belong to the separate Volontyorlar application.

## Requirements

- Node.js 22.13 or newer
- npm and the committed `package-lock.json`

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); it redirects to the best
matching locale.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Turbopack development server |
| `npm run dev:webpack` | Webpack development fallback |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route typegen plus a strict TypeScript check |
| `npm run test` | Vitest unit and component tests |
| `npm run test:e2e` | Playwright smoke suite against a production build |
| `npm run build` | Webpack production build |
| `npm run start` | Serve an existing production build |
| `npm run verify:release` | Validate launch URLs without printing their values |

## Frontend foundation

- Next.js 16 App Router and React 19, server components by default
- Strict TypeScript with the `@/*` alias pointing at `src/`
- Tailwind CSS 4 with semantic tokens in `src/app/globals.css`
- `next-intl` for `uz` / `ru` / `en` routing and catalogs
- `class-variance-authority`, `clsx`, `tailwind-merge`, and Lucide icons
- Source Serif 4 and Onest, self-hosted through `next/font`

Every marketing route is statically generated. The only runtime code is
`src/proxy.ts`, which sends a prefix-less URL to the right locale.

## Routes

`/` redirects to a locale. Each locale then serves the same seven pages:

```
/{uz|ru|en}
/{uz|ru|en}/about
/{uz|ru|en}/volunteering
/{uz|ru|en}/partners
/{uz|ru|en}/contact
/{uz|ru|en}/privacy
/{uz|ru|en}/terms
```

Plus `/robots.txt` and `/sitemap.xml`.

## Environment variables

All four variables in `.env.example` are optional and blank on purpose, because
no domain or channel address is verified yet:

| Variable | Effect while unset |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Pages send `noindex`, `robots.txt` disallows crawling, and the sitemap is empty |
| `NEXT_PUBLIC_APP_ORIGIN` | Links into the Volontyorlar application, including the hero sign-in action, are not rendered |
| `NEXT_PUBLIC_TELEGRAM_URL` | The join action falls back to the contact page |
| `NEXT_PUBLIC_INSTAGRAM_URL` | The channel is omitted from the footer and contact page |

Local development values belong in `.env.local`, which is untracked. While a
service has no verified address, put a clearly-marked placeholder there rather
than a fabricated value in tracked source, and replace it once the real address
is confirmed. The Playwright suite pins all four variables to empty so it always
exercises the unconfigured baseline.

`NEXT_PUBLIC_*` values are embedded in the browser bundle. Never put a bot
token, session key, or database credential in one.

See [`docs/README.md`](docs/README.md) for project context and
[`docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md`](docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md)
for the environment contract.
