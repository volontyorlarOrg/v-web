# Volontyorlar Web

The public, mobile-first marketing website for **Volontyorlar**, the
volunteering platform for young people in Uzbekistan, plus the public
volunteer profiles at `volontyorlar.uz/{username}`.

Volunteer accounts, opportunity applications and records belong to the
Volontyorlar application (`v-app`).

## Requirements

- Node.js 22.13 or newer (unit tests run on Node 24)
- npm and the committed `package-lock.json`

## Setup

```bash
npm ci
npm run dev
```

`npm run dev` reads the shared `../env/local/web.local.env` and serves
[http://localhost:3000](http://localhost:3000), which redirects to the best
matching locale. `npm run dev:standalone` runs `next dev` with whatever
environment you export yourself.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Turbopack development server on the shared local environment |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route typegen plus a strict TypeScript check |
| `npm run test` | Vitest unit and component tests |
| `npm run test:e2e` | Playwright smoke suite against a production build and a stub API |
| `npm run build` | Webpack production build |
| `npm run start` | Serve an existing production build |
| `npm run verify:release` | Validate launch URLs without printing their values |

## Frontend foundation

- Next.js 16 App Router and React 19, server components by default
- Tailwind CSS 4 with semantic tokens in `src/app/globals.css`
- `next-intl` for `uz` / `ru` / `en` routing and catalogs
- Onest and Source Serif 4, self-hosted through `next/font`
- shadcn/ui primitives on `radix-ui`, `class-variance-authority`, `clsx`,
  `tailwind-merge` and Lucide icons

## Routes

`/` redirects to a locale. Each locale serves:

```
/{uz|ru|en}                 home (landing)
/{uz|ru|en}/about
/{uz|ru|en}/volunteering
/{uz|ru|en}/partners
/{uz|ru|en}/blog            and /blog/{slug}
/{uz|ru|en}/contact
/{uz|ru|en}/privacy
/{uz|ru|en}/terms
/{username}                 public volunteer profile
```

Plus `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and the API
routes under `/api/blog/*`.

The blog and public profiles read the backend server-side; everything else is
static.

## Environment variables

See `.env.example`. All are optional and blank by default, and the site
degrades instead of guessing:

| Variable | Effect while unset |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Pages send `noindex`, `robots.txt` disallows crawling, the sitemap is empty |
| `NEXT_PUBLIC_APP_ORIGIN` | Sign-in and app links are not rendered |
| `VOLONTYORLAR_API_URL` | No blog and no public profiles |
| `BLOG_ADMIN_ORIGIN`, `BLOG_REVALIDATION_SECRET` | Blog previews and on-demand revalidation are off |
| `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` | The join action falls back to the contact page and the channel is omitted |
| `GOOGLE_SITE_VERIFICATION`, `YANDEX_VERIFICATION`, `BING_SITE_VERIFICATION` | No ownership tokens are published |
| `LEGAL_CONTACT_EMAIL`, `LEGAL_CORRESPONDENCE_ADDRESS` | The legal pages omit those lines |

`NEXT_PUBLIC_*` values are embedded in the browser bundle. Never put a bot
token, session key or database credential in one.
