# Applied UI System

The token values, typography scale, and named rules live in
[`../../DESIGN.md`](../../DESIGN.md). This page records how they are applied in
code, plus the localization and accessibility behaviour that goes with them.

## The two faces in code

`src/app/[locale]/layout.tsx` loads Onest and Source Serif 4 through `next/font`
and puts both variables on `<html>`. `globals.css` maps them to `--font-sans` and
`--font-serif`, and a base rule gives `h1`, `h2` and `.display-face` the serif at
weight 400. Headings therefore need no font class, and `font-bold` must never be
added to one — see [Two faces](../../DESIGN.md#two-faces).

`.display-face` exists for the handful of non-heading elements that belong to the
display voice: the large figures in `StatGrid` and the regions band.

The reverse also happens. The footer's column headings and `PageHero`'s metadata
headings are `h2` for the document outline but are 12px uppercase labels by
voice, so they carry `font-sans` explicitly. A tag says what an element is in the
document, not how it should read.

## Where tokens live

`src/app/globals.css` declares every semantic token in a Tailwind 4 `@theme`
block, so `bg-paper`, `text-ink-muted`, `border-border`, `bg-action`, `bg-accent`
and `text-brand` are generated utilities. Components must not contain literal
hex values.

The dark theme is the same token names with different values, declared under
`:root[data-theme="dark"]` in the base layer. Because the utilities reference
the variables rather than inlining them, a component that uses `bg-paper` is
already themed. `src/lib/theme.ts` owns the attribute: a boot script in
`<head>` sets `data-theme` from the stored choice or the system preference
before first paint, `ThemeToggle` writes it, and the hero map re-reads its
palette when it changes. The choice is the one thing the site keeps in the
browser, in `localStorage`, and the privacy page says so.

Fills have their own tokens and their own label tokens. `action` /
`action-hover` fill the primary button and take `ink-inverse`; they are ink in
the light theme and ivory in the dark, and `ink-inverse` is Paper's value in
the light and Ink's in the dark so the pair inverts together. `band` fills the
traction band, the closing callout and the footer with `knockout` type and
`band-copy` secondary copy; it stays dark in both themes. `accent` is the one
blue fill, with a `knockout` label. `brand` is `#007FC2` in both themes and
used only by the mark.

The ground is flat: `body` paints `paper` and nothing else. The whiteboard's
dot grid and radial wash are gone, and the token test asserts they stay gone.

`src/app/design-tokens.test.ts` parses that file and asserts the whole contrast
contract in both themes, plus the rules that define the register: every blue
token has a hue between 195° and 225°, every neutral is warm, the graphics
blues stay *below* 4.5:1 on paper so they cannot become body text, and every
label clears AA on its fill. If one of those ever fails, the system has
changed and needs a real decision rather than a silent drift.

## Where the blue appears

Ink carries the weight: the primary button, the traction band, the closing
callout and the footer are near-black fills with ivory type, each marked by a
`primary` hairline.

Blue does the accent's jobs and nothing else:

| Surface | Treatment |
| --- | --- |
| The mark | `text-brand` |
| Eyebrow rules, step nodes, the process rail, the fieldwork route and its nodes | `bg-primary` / `stroke: primary` |
| The hairline on every ink band and the closing callout | `border-t-primary` / `bg-primary` |
| Links, the active tab's label, small numbers, the focus ring | `text-primary-ink` |
| The active tab, the active language, the hero's region chip | `bg-accent-soft text-primary-ink` |
| The one join or apply action on a screen | `buttonClass({ variant: "accent" })` |
| The hero map's plate and leaders, its markers, its tile sides | `primary`, `primary-ink`, `primary-muted` read from the tokens |

The traction figures are the loudest thing on the site, so they get the
heaviest surface: a full-width `band` in ink with knockout numerals over a
`primary` hairline that draws itself in. They read as one instrument wherever
they appear — the home page and `/about` use the same band — and the closing
call to action is distinguished from it by being a rounded panel inside a paper
section rather than a band.

The step rail's fourth node is `bg-ink` with a `text-ink` number: the volunteer's
step in the page's own ink against the institution's three blue nodes.

## Display type fills its column

`--text-display` sizes against the viewport, which is the wrong reference for a
headline inside a `76rem` column: past that width the column stops growing and
the type stops with it. The home hero used to compound the problem with a
`max-w-3xl` wrapper and a `max-w-[15ch]` measure, so its headline occupied
**51%** of the column at every desktop width and the page read as mostly margin.

Both hero headlines now size against their **container** instead. The copy block
declares `container-type: inline-size`, and `.hero-display` /
`.page-display` use `cqi` inside a `clamp()`:

```css
.hero-display {
  font-size: clamp(2.75rem, 7.8cqi, 6.25rem);
  text-wrap: balance;
}
```

The headline therefore fills about 93% of its measure at every width from 390px
up, and the coefficient is a design decision rather than a guess: it is set so
the longest balanced line lands just inside the column. `text-wrap: balance`
does the rest — for a two-sentence headline it minimises the longest line, which
puts the break on the sentence boundary in all three locales without any markup
saying so.

Do not put a `ch` measure back on these headlines. A character count and a
container-relative size fight each other, and the smaller one silently wins.

## Composition primitives

| Component | Role |
| --- | --- |
| `Section` | Vertical rhythm, tone band, hairline boundary, container; the `ink` tone adds the blue hairline |
| `SectionHeader` / `Eyebrow` | Muted uppercase label led by a blue rule, headline, lead sentence |
| `PageHero` | Opening block for every page below the home page |
| `StatGrid` | The ink figure band: display-serif numerals that count up over a drawn blue rule |
| `StepRail` | The process rail; blue nodes for Volontyorlar's work, an ink node for the volunteer's, drawn step by step as it is scrolled |
| `NameBoard` | A grid of white bordered cards for partner, supporter, and source names |
| `ProseSections` | Legal and explanatory pages at one measure |
| `StatusChip` | Dashed pill for planned or unpublished material |
| `SectionBackdrop` | The ambient layer on the toned bands; `sourcing` and `channels` |
| `buttonClass` | The single action styling contract, built with CVA: `primary`, `accent`, `outline`, `ghost`, `inverse` |
| `ActionLink` | Chooses a locale-aware link or a safe external anchor |
| `HeroMapSection` | The home page hero and its scroll-driven map of the fourteen regions |
| `CountUp` | Counts a figure from 1 to its real value the first time it is scrolled into view |
| `NumberedRail` | The shared 01–NN hairline rail used for lists that read as a sequence |
| `WorkField` | The home page's six responsibilities as cards connected by one animated fieldwork route |
| `Scene` / `SplitWords` | The entry-scene boundary and the word-by-word heading mask; server components that only add markup and classes |
| `SceneObserver` | The one `IntersectionObserver` that marks scenes entered; mounted once in the marketing layout |
| `SmoothScroll` | Mounts `lenis` when motion is allowed |
| `ThemeToggle` | The labelled switch that flips `data-theme` and stores the choice |
| `NavTabs` | The header tabs, rendered from the provisional item set with the active tab as an `accent-soft` pill |
| `PageBreadcrumbJsonLd` | The localized home-to-current-page structured-data trail |
| `Marquee` | The continuously rolling partner and source rows |
| `RollingWords` | The hero eyebrow's cycling region name |
| `BrandSignature` | The oversized lockup that writes itself and raises the mark's hands; kept for a closing band, not currently mounted |

Cards are back where a fixed group benefits from them. `WorkField`, `NameBoard`,
the founders on `/about` and the audiences on `/contact` are white
`bg-surface` cards with a `border` hairline and the `xl` radius; inside a card
there is type and at most a rule, never a nested box. `WorkField` keeps its
central route: the cards pair around it on wide screens with a short connector
from each card's edge, and collapse onto a left-hand route on mobile; the
moving stroke is decorative and all copy is complete at rest.

Lists whose length varies stay as hairline-ruled rows, because an empty cell in
a card grid looks like a fault: the steps, the story on `/about` and what to
expect on `/volunteering` use `NumberedRail`, the contact channels and the
responsibilities are ruled lists.

The home page shows partners and sources as two `Marquee` rows rolling in
opposite directions rather than as a `NameBoard` grid, because nine names in a
three-column grid left two empty cells. `/partners` keeps the `NameBoard`
cards: a page whose job is to be scanned should not move.

## Brand usage in code

`BrandMark` renders the delivered geometry inline so it inherits `currentColor`
and costs no request. It appears at 32px in the header and 48px on the 404 page,
always above the documented 16px minimum, and always in `text-brand` — the
delivered `#007FC2` — or `text-knockout` on the footer band. It is the one
element that does not take the derived blue.

`BrandArc` is the arc alone. Large decorative shapes use it so the logo is never
cropped, tinted, or scaled below its minimum; as a derived device it takes the
derived blue.

`BrandMarkRaise` is the same geometry split into its two moving parts — the head
and the arc drawn with `pathLength="100"` — so a signature can pop the head and
then draw the arc outward from its centre, which reads as the two hands going
up.

The organisation name is HTML text in Onest beside the mark, not the delivered
SVG lockup: an SVG loaded through `<img>` cannot fetch its webfont, so that
lockup's wordmark renders in a different system face on every platform. See
[`../brand/BRAND_ASSETS.md`](../brand/BRAND_ASSETS.md).

## Localization behaviour

- Three locales, `uz` (default), `ru`, `en`, one per URL, prefix always present.
- The client provider carries locale context with `messages={null}`; translated
  labels cross the Server/Client boundary as props rather than as a catalog.
- `src/proxy.ts` sends a prefix-less URL to the best `Accept-Language` match.
- No locale cookie and no language in `localStorage`: the URL is the only
  language state, so a canonical URL can never render two different languages,
  and every response stays cacheable. The theme choice is the only thing stored
  in the browser, and it never affects what a URL renders on the server.
- The language disclosure is in the header at every width and in the footer. It
  is a 40px pill showing the language code, opens a list of native language
  names, and links to the same route in another locale, so switching never drops
  the reader onto the home page.
- `html[lang]` matches the active locale on every page.
- `src/i18n/messages.test.ts` enforces key parity across the three catalogs,
  rejects empty and placeholder strings, requires the turned comma `ʻ` in Uzbek
  rather than a straight apostrophe, and checks that Russian is actually
  Cyrillic. A missing translation fails the suite instead of silently rendering
  English.
- Russian runs longest. Display and button copy is checked at 360px in all three
  languages.

## Accessibility

- One `h1` per page; section headings descend in order.
- A skip link is the first focusable element of every page.
- The base layer gives every focusable element a 3px `primary-ink` outline at
  3px offset; nothing removes it.
- Controls clear 44px in both dimensions.
- The mobile disclosure sets `aria-expanded` and `aria-controls`, closes on
  Escape with focus returned to the trigger, and closes on selection. The panel
  uses the `hidden` attribute, so its contents leave the accessibility tree.
- Status is never carried by colour alone: the application availability chip
  says so in words, and the ink step node reinforces a title that already
  names who acts.
- Decorative marks and rails are `aria-hidden`; the ordered list carries the
  meaning of the step rail.
- Reduced motion is honoured globally in the base layer, and again by one block
  that switches off the marquees and the rolling eyebrow.
  The boot script leaves `data-motion` off the document for those visitors, so
  no entry scene ever hides anything and `lenis` is never mounted. The hero map
  reads the same preference in JavaScript, holds one frame, and does not pin.
- The theme switch is a `switch` with an accessible name and `aria-checked`, so
  its state is announced; it sits beside the language control at every width.
- The rolling region name in the hero eyebrow is `aria-hidden`; the eyebrow's
  accessible text is the static label beside it, and the `h1` under it carries
  the message. Under reduced motion it stops on the first name.
- Each marquee is a labelled group of real list items. The second copy of the
  track is `aria-hidden`, the rows pause on hover and on focus within, and under
  reduced motion the duplicate is removed and the row scrolls by hand.
- The hero map's canvas, its plan-view fallback and its numbered pins are all
  `aria-hidden`. The information they carry — the names of all fourteen regions
  — is a visible, ordered list in the markup beside the caption, so nothing
  depends on seeing the picture.
- The hero copy and the map caption share one pinned panel. The hero copy is
  marked `inert` once it has faded, so keyboard focus never lands on an
  invisible link. The caption is never made inert: it carries the region index
  that names the map for assistive technology, and it has nothing focusable.

## Responsive rules

- Mobile is the primary composition. `body` clips horizontal overflow and an
  end-to-end test asserts `scrollWidth === clientWidth` at 390px.
- Two-column compositions collapse in reading order below the large breakpoint.
- The header shows the tabs from the large breakpoint and moves them into the
  disclosure panel below it; the language and theme controls never move.
- The header tabs are a provisional set, `HEADER_NAV_ITEMS` in
  `src/lib/content/nav-tabs.ts`: Volunteering, Events (an anchor into the home
  page's sources band), Partners, About, Contact. Each points at a registered
  route, a test checks that and that every tab has a label in all three
  catalogs, and the footer and sitemap still read `src/lib/routing/routes.ts`.
  When the real information architecture lands, replace the provisional set rather
  than growing it.
- The header lockup drops to the mark alone below 360px. `Volontyorlar` set beside
  the mark, the language control and the menu button do not fit a 320px screen
  together, and the mark is the part that still identifies the site.
