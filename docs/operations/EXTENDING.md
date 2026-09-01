# Extending the Site

How to add to this repository without breaking the guarantees it already makes.
Read [`../../AGENTS.md`](../../AGENTS.md) first for the rules; this page is the
mechanics.

## Code conventions

**Source files carry no comments.** Explanations live in `/docs`, where they can
be found by someone who has not opened the file, reviewed as prose, and kept
current independently of the code. Names, types, and test names do the work
inside the source.

Two consequences:

- If a piece of code needs an explanation, the explanation belongs on the
  relevant page in `/docs`, and the code needs a clearer name or a test that
  states the intent. A test name is the right place for "this must never
  happen".
- Compiler and linter directives — `@ts-expect-error`, `eslint-disable` — are
  not comments and stay.

Everything else follows from the source layout in `AGENTS.md`.

## Add a public page

1. **Register the route** in `src/lib/routing/routes.ts`. The registry is the
   only list; navigation, footer, sitemap, and canonical URLs all read from it,
   so a page that is not registered is invisible to all four.

   ```ts
   { key: "stories", path: "/stories", inMainNav: true, inLegalNav: false,
     priority: 0.7, changeFrequency: "monthly" }
   ```

2. **Add `nav.stories`** to all three catalogs in `src/i18n/messages/`, plus a
   namespace holding at least `metaTitle` and `metaDescription`.

3. **Create** `src/app/[locale]/(marketing)/stories/page.tsx` following any
   existing page: `generateMetadata` delegating to `buildPageMetadata`, a
   default export that awaits `params` and calls `setRequestLocale`, and a
   separate synchronous component that calls `useTranslations`.

   `setRequestLocale` is what keeps the page statically generated. Without it
   the route opts into dynamic rendering.

4. **Emit breadcrumbs** with `breadcrumbJsonLd` if the page sits below home.

5. **Run the checks.** The sitemap, `hreflang` alternates, and footer links are
   automatic. The catalog parity test will fail until all three locales have the
   new keys.

## Internal links: `navHref` vs `localePath`

This is the one easy mistake in the codebase.

| Helper | Returns | Use with |
| --- | --- | --- |
| `navHref("about")` | `/about` | `Link` from `@/i18n/navigation`, which adds the locale itself |
| `localePath("uz", "about")` | `/uz/about` | Plain anchors, and anything outside the locale segment |
| `localeUrl("uz", "about")` | `https://…/uz/about` | Canonical URLs, sitemap, structured data |

Passing a `localePath` result to the locale-aware `Link` produces `/uz/uz/about`.
The home route is the other trap: its registered path is the empty string, which
`navHref` turns into `/`.

`ActionLink` picks the right element for a `Destination`, so components should
not branch on internal versus external themselves.

## Add or change copy

Every user-facing string exists in `uz`, `ru`, and `en`. `src/i18n/messages.test.ts`
fails the build if a key is missing from any catalog, if a value is empty or
looks like a placeholder, if Uzbek uses a straight apostrophe where the turned
comma `ʻ` (U+02BB) belongs, or if the Russian catalog stops being Cyrillic.

Proper nouns — organisation names, partner names, founder names — stay in
`src/lib/content/org.ts`, not in the catalogs. Only the prose around them is
translated.

Dates that appear on the site, such as the legal review date, are constants in
`src/lib/content/org.ts` and are formatted per locale at render time. Keeping
them out of the catalogs is what stops three translations of the same date
drifting apart.

Russian runs longest. Check display and button copy at 360px in all three
languages before calling it done.

## Add a locale

1. Add the code to `locales` and a native label to `localeNames` in
   `src/i18n/routing.ts`.
2. Add `src/i18n/messages/<code>.json` with the full key set.
3. Add an Open Graph locale to `openGraphLocales` in `src/lib/seo/metadata.ts`.
4. Confirm the typeface covers the script. Onest carries Latin, Latin Extended,
   and Cyrillic; a new script means a new subset or a second family.

Routing, the sitemap, `hreflang`, the switcher, and the proxy all read from
`routing.ts` and need no further change.

## Add a colour or token

Tokens live in the `@theme` block of `src/app/globals.css` and nowhere else.
Components use the generated utilities — `bg-surface`, `text-accent-ink` — and
never a literal hex value.

Adding a colour means updating `docs/brand/BRAND_ASSETS.md` and adding
assertions to `src/app/design-tokens.test.ts`. That test encodes the brand's
non-negotiable rules as executable checks, including the negative ones: brand
blue and brand orange must each stay *below* the body-text threshold, and every
blue/orange pairing must stay below 3:1. A new hue needs the same treatment
against both existing ones.

Before reaching for a colour, check the role split in `../../DESIGN.md`. Blue is
the institution; orange is the person; there is no third hue and no red.

## Add a component

Server Components are the default. `"use client"` is justified by event
handlers, client state, browser APIs, or an interactive primitive — and the
boundary goes as low as possible.

Both current client components take their copy as props from the server, which
is why the root layout hands `NextIntlClientProvider` only the `nav` namespace.
Widening that subset ships more JSON in every document, in every locale, and
should be a deliberate decision. `docs/architecture/ARCHITECTURE.md` has the
measurements.

Shared action styling comes from `buttonClass`. Solid actions use
`primary-ink`, not `primary`, because a white label needs 4.5:1 and the lighter
brand blue does not reach it.

For brand marks, `BrandMark` is the logo and must never render below 16px or be
cropped; `BrandArc` is the derived shape for large decoration.

## Link to something outside the site

Never hard-code an origin. Everything external resolves through a helper:

| Need | Helper |
| --- | --- |
| The product application | `appHref(path)` in `src/lib/seo/origin.ts` |
| A public channel | `channelUrl(id)` in `src/lib/constants/channels.ts` |
| A call to action | `joinDestination()` / `opportunitiesDestination()` |

Each returns `null` or falls back to an internal page when the value is not
configured, and the interface must handle that rather than guess. Only `https`
channel URLs are accepted. See `../architecture/DOMAINS.md`.

## Add analytics

`src/lib/constants/analytics.ts` holds the event vocabulary. No provider is
installed and nothing dispatches these yet; the file exists so the names are
decided in one place rather than invented per component.

If a provider is added, never attach volunteer PII, essays, phone numbers,
Telegram identities, or form contents to an event, and revisit the Content
Security Policy in `next.config.ts` — it currently allows no third-party
connection at all.

## Add a dependency

The default answer is no. `docs/architecture/ARCHITECTURE.md` lists what was
removed and why, and `AGENTS.md` lists the categories that do not belong in a
marketing repository. A dependency needs a concrete, implemented requirement,
not an anticipated one.

Known constraint: `@vitejs/plugin-react` cannot be installed. Its current major
peers `@babel/core@^8` while the `shadcn` CLI pins `^7`. Vitest transforms TSX
with esbuild using `jsx: "react-jsx"` from `tsconfig.json`, so the plugin is not
needed.

## Checks

```bash
npm run lint
npm run typecheck
npm run test
git diff --check
```

Add `npm run build` for build or deployment work, and `npm run test:e2e` when
routing, navigation, or the information architecture changes.

`npm run typecheck` runs `next typegen` first because `PageProps`, `LayoutProps`,
and the `next/root-params` types are generated. If typecheck reports missing
modules for routes that were just deleted, the generated types are stale:
`rm -rf .next tsconfig.tsbuildinfo` and run it again.
