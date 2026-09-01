# Current Web Architecture

## Implemented

The repository is a single Next.js 16 App Router application using React 19,
strict TypeScript, Tailwind CSS 4, and npm. All current routes render from local
source and assets; no API route, database client, authentication provider, or
backend transport is present.

```mermaid
flowchart LR
  Visitor --> Next[Next.js App Router]
  Next --> Index[/ design index]
  Next --> V1[/v1 poster exploration]
  Next --> V2[/v2 record exploration]
  Next --> V3[/v3 night landing test]
  V3 --> Assets[public/logo and static demo content]
```

## Current modules

| Location | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root metadata, fonts, document shell, and exploration switcher |
| `app/page.tsx` | Index of the three design directions |
| `app/v1/page.tsx` | Poster direction |
| `app/v2/page.tsx` | Record direction |
| `app/v3/page.tsx` | Mobile-first V3 landing-page test |
| `app/globals.css` | Tailwind import and base tokens shared by the explorations |
| `public/logo/` | Canonical vector and generated raster logo assets |
| `lib/utils.ts` | Shared class-name composition helper |

## Dependency responsibilities

- Next.js and React: routing, rendering, metadata, images, and fonts.
- Tailwind CSS: layout and styling utilities.
- Motion: available for purposeful interaction; not required by every surface.
- i18next/react-i18next: installed localization foundation; no catalogs or URL
  locale routing are implemented yet.
- next-themes: installed theme foundation; no theme provider is implemented yet.
- Radix Accordion and shadcn configuration: accessible primitive foundation.
- Lucide: interface icons.
- Three.js: available only when a product-specific scene justifies its cost.

## Presented, not implemented

The product brief describes opportunity discovery, Telegram sign-in, profiles,
applications, reusable essays, volunteer records, and administration. None is
implemented in this repository. V3 uses clearly illustrative static content to
test the marketing explanation of that planned loop.

## Needs verification

- Whether the public site and authenticated product will share a repository
- Backend framework, API origin, endpoint shapes, and error contracts
- Authentication/session ownership
- Data persistence and hosting topology
- Analytics, observability, and error reporting
