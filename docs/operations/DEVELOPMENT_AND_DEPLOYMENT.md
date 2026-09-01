# Development, Quality, and Deployment

## Prerequisites and setup

- Node.js `>=22.13.0` (enforced by `package.json`)
- npm and the committed `package-lock.json`

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The development server runs on `http://localhost:3000`.

## Environment

The public site currently has no required environment variables and must install,
lint, typecheck, and build without secrets. `NEXT_PUBLIC_SHOW_STYLE_SWITCHER=true`
is an optional local-only comparison aid; it is blank by default so previews and
release builds do not contain the version switcher. Add another variable only
when executable code consumes it, document its exposure and purpose here, and
add a value-free placeholder to `.env.example`.

Never place Telegram bot tokens, session keys, database credentials, or other
secrets in `NEXT_PUBLIC_*` variables. Next.js includes those values in browser
bundles.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Turbopack development server |
| `npm run dev:webpack` | Webpack development fallback |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Strict TypeScript check |
| `npm run build` | Webpack production build |
| `npm run start` | Serve an existing production build |

No first-party test runner or browser automation suite is configured yet.

## Dependency boundary

The dependency set intentionally mirrors the active marketing foundation from
Dwelve: localization, themes, motion, accessible disclosure primitives, shared
class utilities, icons, and optional product-specific 3D scenes. Auth, forms,
query/data clients, charts, PDF handling, drag-and-drop, and dashboard packages
were not copied because they are not part of the current public-site runtime.

## CI

GitHub Actions installs from the lockfile, runs ESLint and TypeScript, creates a
production build, and audits high-severity dependency findings. CodeQL scans
JavaScript and TypeScript on main, pull requests, and a weekly schedule.

CI deliberately supplies no environment variables. If a public-site build later
requires a secret, revisit the repository boundary before adding one.

## Deployment

The hosting provider, production domain, preview-indexing policy, environment
values, and deployment trigger are not documented yet and need verification.
Do not copy Dwelve domains or Vercel project identifiers into YVC.
