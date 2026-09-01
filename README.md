# YVC Web

Public, mobile-first website for Youth Volunteering Community. This repository
currently contains landing-page explorations and the shared frontend
environment. This setup does not implement authenticated product flows.

## Requirements

- Node.js 22.13 or newer
- npm and the committed `package-lock.json`

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Turbopack development server |
| `npm run dev:webpack` | Start the Webpack fallback server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Run the strict TypeScript check |
| `npm run build` | Create a Webpack production build |
| `npm run start` | Serve an existing production build |

## Frontend foundation

- Next.js 16 App Router and React 19
- strict TypeScript with `@/*` aliases for both `src/` and the repository root
- Tailwind CSS 4
- i18next/react-i18next for English and Uzbek localization
- Motion for interaction and section motion
- next-themes for class-based themes
- Radix primitives, shadcn configuration, CVA, clsx, and tailwind-merge
- Lucide icons and Three.js for product-specific visual scenes when justified

See [`docs/README.md`](docs/README.md) for project context and
[`docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md`](docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md)
for the environment contract.

## Environment variables

The marketing site currently requires no runtime secrets or public environment
variables. Keep local values in `.env.local`; only the value-free
`.env.example` may be committed.

Do not add Telegram bot tokens, database credentials, or session secrets to
`NEXT_PUBLIC_*` variables; those values are sent to every browser.
