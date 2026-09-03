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
| `localeUrl("uz", "about")` in `src/lib/seo/urls.ts` | `https://…/uz/about` | Canonical URLs, sitemap, structured data |

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

Every token has a light value in `@theme` and, where it differs, a dark value in
the `:root[data-theme="dark"]` block directly below it. A token that is not
overridden there keeps its light value in both themes, which is how `knockout`
and `accent` work. Add the dark value in the same commit as the light one; the
token test reads both blocks.

Adding a colour means updating `docs/brand/BRAND_ASSETS.md` and adding
assertions to `src/app/design-tokens.test.ts`. That test encodes the brand's
non-negotiable rules as executable checks, including the negative ones: brand
blue and brand orange must each stay *below* the body-text threshold, and every
blue/orange pairing must stay below 3:1. A new hue needs the same treatment
against both existing ones, in both themes.

Fills are their own tokens. `action` and `action-hover` fill solid buttons,
`band` fills the solid band and the closing panel, and `band-copy` is the
secondary copy on it. `primary-ink` is text-sized blue only. In the light theme
`action` and `band` equal `primary-ink`; in the dark theme they diverge, because
a blue light enough to read on near-black is too light to carry a white label.

Before reaching for a colour, check the role split in `../../DESIGN.md`. Blue is
the institution; orange is the person; there is no third hue and no red.

## Add motion to a section

Wrap the block in `Scene` from `src/components/marketing/scene.tsx` and mark the
actors inside it: `scene-rise` on a block, `scene-stagger` on a list whose
direct children should follow one another, `scene-rule` on a hairline that
should draw in, `SplitWords` inside a heading that should rise word by word.
Delays are custom properties (`[--scene-delay:340ms]`), so a component never
needs a style object. `SectionHeader`, `StatGrid`, `NumberedRail`, `NameBoard`
and `WorkField` are already scenes; do not nest one scene inside another,
because the outer boundary would hide the inner actors until both have entered.

Anything above the fold on load — the two heroes — uses the `enter-rise` and
`enter-words` keyframes instead, so it plays without waiting for hydration.

Every scene is complete at rest: without JavaScript, under reduced motion, and
in print nothing is hidden. Keep it that way; the hidden state exists only under
`html[data-motion]`, and only until the observer marks the scene `data-in`.

## Add a component

Server Components are the default. `"use client"` is justified by event
handlers, client state, browser APIs, or an interactive primitive — and the
boundary goes as low as possible.

Client components receive translated copy from their server parents. The root
layout sets `messages={null}` on `NextIntlClientProvider`, so locale and
navigation context reach the client without serializing a catalog. Passing any
message subset ships more JSON in every document, in every locale, and should
be a deliberate decision. `docs/architecture/ARCHITECTURE.md` has the earlier
whole-catalog measurements.

Shared action styling comes from `buttonClass`. Solid actions use `action`, not
`primary` or `primary-ink`: a white label needs 4.5:1, and the dark theme keeps
the text-blue and fill-blue roles separate.

For brand marks, `BrandMark` is the logo and must never render below 16px or be
cropped; `BrandArc` is the derived shape for large decoration.

## Link to something outside the site

Never hard-code an origin. Everything external resolves through a helper:

| Need | Helper |
| --- | --- |
| The product application | `appHref(path)` in `src/lib/seo/origin.ts` |
| A public channel | `channelUrl(id)` in `src/lib/constants/channels.ts` |
| A call to action | `joinDestination()` / `opportunitiesDestination()` |

Application-only destinations return `null` when the app origin is missing;
community actions may fall back to an internal public page. The interface must
handle either outcome rather than guess. Only `https` channel URLs are
accepted. See `../architecture/DOMAINS.md`.

## Add analytics

No provider or speculative event vocabulary is installed. Add both only with a
concrete measurement requirement. Centralize event names at that point, never
attach volunteer PII, essays, phone numbers, Telegram identities, or form
contents, and revisit the Content Security Policy in `next.config.ts` — it
currently allows no third-party connection at all.

## Add a dependency

The default answer is no. `docs/architecture/ARCHITECTURE.md` lists what was
removed and why, and `AGENTS.md` lists the categories that do not belong in a
marketing repository. A dependency needs a concrete, implemented requirement,
not an anticipated one. `lenis` is the one motion dependency and it does one
thing, smooth scrolling; entry motion is deliberately CSS plus one observer
rather than an animation library.

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
