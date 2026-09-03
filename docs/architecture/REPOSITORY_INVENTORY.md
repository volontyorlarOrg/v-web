# Repository Inventory

This is the maintained ownership map for the repository. It covers the files
that define the marketing site, its tests, documentation, configuration, and
public assets. Generated dependencies and build output are excluded at the end.

## Root and automation

| Files | Owner and purpose |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md` | Agent operating rules; `AGENTS.md` is authoritative |
| `README.md`, `PRODUCT.md`, `DESIGN.md`, `SECURITY.md` | Public entry point, product truth, design contract, security entry point |
| `package.json`, `package-lock.json` | Main application dependency graph and reproducible npm resolution |
| `next.config.ts`, `postcss.config.mjs` | Next.js runtime/security headers and Tailwind/PostCSS integration |
| `tsconfig.json`, `next-env.d.ts` | Strict TypeScript and generated Next.js declarations |
| `eslint.config.mjs`, `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts` | Static, unit/component, and browser-test configuration |
| `components.json` | shadcn-compatible component generator settings; it does not add a runtime |
| `.env.example`, `.gitignore` | Value-free environment contract and ignored local/generated state |
| `.github/workflows/ci.yml`, `.github/workflows/codeql.yml`, `.github/dependabot.yml` | Verification, security scanning, and dependency-update automation |
| `.vscode/extensions.json`, `.claude/launch.json` | Optional editor and local launch recommendations |
| `.agents/skills/*`, `.claude/skills/*` | Mirrored project-local design skill instructions |
| `.impeccable/config.json` | Project-level design detector configuration |

## Application routes and rendering

| File | Ownership |
| --- | --- |
| `src/proxy.ts` | Locale negotiation and prefix redirects |
| `src/app/[locale]/layout.tsx` | Root document, locale validation, fonts, theme boot, locale-only client provider |
| `src/app/[locale]/(marketing)/layout.tsx` | Shared marketing shell, skip link, landmarks, header/footer, scene and scroll clients |
| `src/app/[locale]/(marketing)/page.tsx` | Home-page composition and verified home content mapping |
| `src/app/[locale]/(marketing)/about/page.tsx` | Organisation story, founders, and traction composition |
| `src/app/[locale]/(marketing)/volunteering/page.tsx` | Volunteering explanation and application-origin availability state |
| `src/app/[locale]/(marketing)/partners/page.tsx` | Verified partner, supporter, and source presentation |
| `src/app/[locale]/(marketing)/contact/page.tsx` | Configured public channels and audience guidance |
| `src/app/[locale]/(marketing)/privacy/page.tsx`, `terms/page.tsx` | Localized legal documents backed by the shared prose primitive |
| `src/app/global-not-found.tsx` | Standalone multilingual 404 document required by the dynamic root layout |
| `src/app/robots.ts`, `src/app/sitemap.ts` | Origin-gated crawl policy and localized route publication |
| `src/app/globals.css` | Ordered Tailwind tokens, base styles, component classes, themes, motion, print |
| `src/app/icon.svg`, `apple-icon.png`, `favicon.ico` | Next.js metadata-file assets inherited inside the localized layout |

## Components

| Area | Files and boundary |
| --- | --- |
| Brand | `brand/logo.tsx` owns mark/arc/lockup SVG markup; `brand/signature.tsx` owns the footer-only animated signature |
| Action and page structure | `marketing/action-link.tsx`, `page-hero.tsx`, `section.tsx`, `prose.tsx`, `numbered-rail.tsx`, `name-board.tsx`, `stats.tsx`, `steps.tsx`, `work-field.tsx` |
| Navigation shell | `marketing/site-header.tsx`, `site-footer.tsx`, `nav-tabs.tsx`, `mobile-nav.tsx`, `locale-switcher.tsx`, `theme-toggle.tsx` |
| SEO rendering | `marketing/json-ld.tsx`, `page-breadcrumb-json-ld.tsx` |
| Motion | `marketing/scene.tsx`, `scene-observer.tsx`, `smooth-scroll.tsx`, `rolling-words.tsx`, `count-up.tsx`, `marquee.tsx`, `section-backdrop.tsx`, `theme-script.tsx` |
| Hero map | `marketing/hero-map/hero-map-section.tsx` is the server composition; `hero-map-flat.tsx` is the complete SVG fallback; `hero-map-stage.tsx` owns the client lifecycle; `scene.ts` owns Three.js resources; `timeline.ts` and `framing.ts` are pure animation geometry |
| UI foundation | `components/ui/button.tsx` owns the shared action class variants; no rendered generic Button wrapper exists |

Components under `marketing` may depend on `lib` and `i18n`. They do not own
verified facts or environment parsing. Client components keep the browser-only
boundary at the interactive leaf and receive translated copy from server
parents; the client provider carries locale context without message data.

## Localization and libraries

| Area | Files and boundary |
| --- | --- |
| Localization | `src/i18n/routing.ts` owns locales and URL policy; `navigation.ts` exposes only used locale-aware navigation helpers; `request.ts` is the implicit `next-intl` request entry; `messages/{uz,ru,en}.json` own translated prose |
| Verified content | `src/lib/content/org.ts` owns facts and proper nouns; `cta.ts` owns configured destination policy; `nav-tabs.ts` owns the provisional header information architecture |
| Routing | `src/lib/routing/routes.ts` owns route identity, navigation flags, sitemap values, and relative paths; it is framework- and environment-independent |
| SEO | `src/lib/seo/origin.ts` validates configured origins; `urls.ts` builds absolute localized URLs; `metadata.ts` builds page metadata; `json-ld.ts` builds structured-data objects |
| Channels | `src/lib/constants/channels.ts` validates public channel URLs and returns configured ID/URL pairs |
| Theme/utilities | `src/lib/theme.ts` owns theme persistence, the pre-paint script, and motion capability; `src/lib/utils.ts` owns class merging |
| Map | `src/lib/map/region-geometry.ts` is generated geometry; `regions.ts` joins localized names; `svg-path.ts` converts geometry for the server fallback |
| Security | `src/lib/security/headers.ts` builds the environment-aware response-header set consumed by `next.config.ts` |
| Geometry tool | `scripts/build-region-geometry.mjs` is the manual Natural Earth ingestion and simplification tool; it is not a build step |
| Release tool | `scripts/verify-release-config.mjs` validates the canonical HTTPS origin and any configured public integration URLs without printing values |

## Tests and their contracts

| Files | Contract |
| --- | --- |
| `src/i18n/messages.test.ts` | Catalog parity, non-placeholder copy, Uzbek punctuation, Russian script |
| `src/app/design-tokens.test.ts`, `typography.test.ts` | Palette/contrast and typography/source invariants |
| `src/app/seo-routes.test.ts` | Origin-gated robots and sitemap behavior |
| `src/lib/routing/routes.test.ts`, `src/lib/seo/urls.test.ts` | Route-registry integrity, relative paths, canonical and alternate URLs |
| `src/lib/seo/origin.test.ts`, `src/lib/constants/channels.test.ts`, `src/lib/content/cta.test.ts` | Environment validation and safe fallback policy |
| `src/lib/content/nav-tabs.test.ts` | Provisional header items point at registered routes and have labels |
| `src/lib/security/headers.test.ts` | CSP and development/production transport-header split |
| `src/lib/map/regions.test.ts` | Fourteen-region identity, names, anchors, and map bounds |
| `src/components/marketing/hero-map/timeline.test.ts`, `framing.test.ts` | Scroll-act order and camera-fit invariants |
| `src/components/marketing/json-ld.test.tsx`, `page-breadcrumb-json-ld.test.tsx` | Safe JSON serialization and localized breadcrumb structure |
| `src/components/marketing/locale-switcher.test.tsx`, `mobile-nav.test.tsx`, `theme-toggle.test.tsx`, `scene.test.tsx` | Interactive state, keyboard behavior, theme/motion persistence, scene semantics |
| `e2e/smoke.spec.ts` | Locale, navigation, legal, 404, CTA, social metadata, removed-route, overflow, no-JavaScript map, and hero-map paths across Chromium, Firefox, and WebKit |

Vitest does not render async Server Components; their integration behavior
belongs in Playwright, matching the installed Next.js 16 testing guidance.

## Documentation and durable context

| Files | Ownership |
| --- | --- |
| `docs/README.md` | Documentation router and source-of-truth order |
| `docs/architecture/{ARCHITECTURE,DOMAINS,REPOSITORY_INVENTORY}.md` | Runtime/module design, origin topology, exhaustive ownership map |
| `docs/ui/UI_SYSTEM.md`, `docs/web/SEO_AND_ROUTES.md` | Applied UI/accessibility behavior and public web publication policy |
| `docs/operations/{DEVELOPMENT_AND_DEPLOYMENT,EXTENDING,AGENT_SKILLS}.md` | Commands, environment, extension mechanics, and local skill policy |
| `docs/security/SECURITY.md` | Implemented headers, storage, trust boundary, known gaps |
| `docs/brand/{BRAND_ASSETS,LOGO_SPEC}.md` | Brand-use contract and delivered geometry |
| `docs/data/DATA_MODEL.md`, `docs/integrations/TELEGRAM.md` | Vocabulary and integration unknowns owned by the separate application |
| `docs/MARKETING_AGENT_HANDOFF.md` | Historical input only; not a live specification |
| `.agent-memory/README.md`, `decisions/*.md`, `gotchas/*.md` | Durable rationale and expensive-to-rediscover failure modes |
| `.agent-memory/{decisions,discoveries,gotchas}/.gitkeep` | Empty-category retention only |

The three files under `docs/brand/reference/` are evidence inputs:
`volontyorlar-logo-reference.jpg`, `volontyor-legacy-mark.png`, and
`volontyor-legacy-mark-white.png`.

## Public brand asset package

`public/logo/` is a deliberate export package, not dead application code. The
site renders the mark inline, while metadata and external consumers use these
files. `public/opengraph-image.png` is the 1200×630 social image referenced by
absolute URL from localized page metadata.

- SVG: `icon-blue.svg`, `icon-white.svg`, `lockup-horizontal.svg`,
  `lockup-horizontal-white.svg`, `mark-blue.svg`, `mark-ink.svg`,
  `mark-white.svg`, `mark-blue-outlined.svg`, `mark-black-outlined.svg`,
  `social-card.svg`.
- PNG icons: `png/icon-blue-{180,192,512,1024}.png`,
  `png/icon-white-512.png`.
- PNG marks: `png/mark-blue-{16,32,48,64,128,256,512,1024}.png`,
  `png/mark-ink-{256,1024}.png`, `png/mark-white-{256,1024}.png`.
- PNG lockups: `png/lockup-horizontal-{720,1440}.png`.

Do not remove an apparently unimported public brand file without checking
`docs/brand/BRAND_ASSETS.md`; several are delivery formats rather than runtime
requests.

## Separate video package and local state

The tracked `video/` tree is a standalone Remotion project with its own package,
configuration, components, scenes, copy, fonts, and theme. In this working-tree
snapshot all 24 video files are already deleted by unrelated user work. The main
site excludes `video/**` from TypeScript and ESLint, so this review neither
restores nor alters that deletion.

`node_modules/`, `.next/`, `tsconfig.tsbuildinfo`, and `test-results/` are
generated. `.env.local` contains untracked machine-local public configuration.
`.impeccable/hook.cache.json` and `.impeccable/review/*.png` are local design
tool evidence. None is an architectural source of truth.
