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
block, so `bg-paper`, `text-ink-muted`, `border-border`, `bg-primary-ink`, and
`text-accent` are generated utilities. Components must not contain literal hex
values.

`src/app/design-tokens.test.ts` parses that file and asserts the whole contrast
contract, including the deliberate negatives: the two graphics hues must each
stay *below* 4.5:1 on paper, and every blue/orange pairing must stay below 3:1.
If one of those ever passes, the brand specification has changed and needs a
real decision rather than a silent drift.

## Where the two hues appear

Blue carries the header, footer, navigation, buttons, focus ring, eyebrow rules,
the mark, decorative arcs, and the closing callout band.

The traction figures are the loudest thing on the site, so they get their own
colourway: a full-width `primary-ink` band with knockout numerals over a
`primary` hairline that draws itself in. They read as one instrument wherever
they appear — the home page and `/about` use the same band — and the closing
call to action is distinguished from it by being a rounded panel inside a paper
section rather than a band.

That band is why orange now appears in exactly one place:

| Surface | Treatment |
| --- | --- |
| The fourth node and number in `StepRail` | `bg-accent` / `text-accent-ink` |

Orange used to carry the traction figures as well. Moving them onto blue was a
deliberate trade: orange on blue is forbidden, so a figure cannot be both loud
and orange. Size and inversion now carry the emphasis that hue used to, and the
one place a person's own action is called out — the volunteer's step — keeps the
hue. If the figures ever return to paper, `text-accent` on `surface` (white,
3.48:1) is the pairing to use; on a tinted band the margin narrows to 3.02:1.

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
  font-size: clamp(2.75rem, 8.2cqi, 6.75rem);
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
| `Section` | Vertical rhythm, tone band, hairline boundary, container |
| `SectionHeader` / `Eyebrow` | Rule-led label, headline, lead sentence |
| `PageHero` | Opening block for every page below the home page |
| `StatGrid` | The knockout figure band: display-serif numerals that count up over a drawn rule |
| `StepRail` | The process rail; blue nodes for Volontyorlar's work, orange for the volunteer's, drawn step by step as it is scrolled |
| `NameBoard` | Hairline-ruled rows of partner, supporter, and source names |
| `ProseSections` | Legal and explanatory pages at one measure |
| `StatusChip` | Dashed pill for planned or unpublished material |
| `SectionBackdrop` | The ambient layer on the toned bands; `sourcing` and `channels` |
| `buttonClass` | The single action styling contract, built with CVA |
| `ActionLink` | Chooses a locale-aware link or a safe external anchor |
| `HeroMapSection` | The home page hero and its scroll-driven map of the fourteen regions |
| `CountUp` | Counts a figure from 1 to its real value the first time it is scrolled into view |
| `NumberedRail` | The shared 01–NN hairline rail used for lists that read as a sequence |
| `WorkField` | The home page's six responsibilities connected by one animated fieldwork route |
| `Reveal` | Marks a block or a sequence for the scroll-driven reveal; a server component that only adds a class |
| `Marquee` | The continuously rolling partner and source rows |
| `RollingWords` | The hero eyebrow's cycling region name |
| `BrandSignature` | The oversized footer lockup that writes itself and raises the mark's hands |

Nothing on the home page is a bordered card. `StatGrid`, `NameBoard` and
`WorkField` use hairline structure rather than containers. `WorkField` pairs the
six responsibilities around a central route on wide screens and collapses them
onto a left-hand route on mobile; the moving stroke is decorative and all copy
is complete at rest.

The home page shows partners and sources as two `Marquee` rows rolling in
opposite directions rather than as a `NameBoard` grid, because nine names in a
three-column grid left two empty cells. `/partners` keeps the readable
`NameBoard` lists: a page whose job is to be scanned should not move.

No page uses a bordered card. Lists that read as a sequence — what to expect and
the story on `/about` — use `NumberedRail`; the home page's responsibilities are
not presented as steps and therefore use `WorkField`. Pages stay distinct
through arrangement rather than through different containers: `/volunteering`
places its rail beside a heading, `/about` centres its rail at one measure, and
`/contact` gives each channel a full-width row of its own.

## Brand usage in code

`BrandMark` renders the delivered geometry inline so it inherits `currentColor`
and costs no request. It appears at 32px in the header and 48px on the 404 page,
always above the documented 16px minimum.

`BrandArc` is the arc alone. Large decorative shapes use it so the logo is never
cropped, tinted, or scaled below its minimum.

`BrandMarkRaise` is the same geometry split into its two moving parts — the head
and the arc drawn with `pathLength="100"` — so the footer signature can pop the
head and then draw the arc outward from its centre, which reads as the two hands
going up. It is used only there.

The organisation name is HTML text in Onest beside the mark, not the delivered
SVG lockup: an SVG loaded through `<img>` cannot fetch its webfont, so that
lockup's wordmark renders in a different system face on every platform. See
[`../brand/BRAND_ASSETS.md`](../brand/BRAND_ASSETS.md).

## Localization behaviour

- Three locales, `uz` (default), `ru`, `en`, one per URL, prefix always present.
- `src/proxy.ts` sends a prefix-less URL to the best `Accept-Language` match.
- No locale cookie and no `localStorage`: the URL is the only language state, so
  a canonical URL can never render two different languages, and every response
  stays cacheable.
- The language disclosure is in the header at every width and in the footer. It
  shows the active language, opens a list of native language names, and links to
  the same route in another locale, so switching never drops the reader onto the
  home page.
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
  says so in words, and the orange step node reinforces a title that already
  names who acts.
- Decorative marks and rails are `aria-hidden`; the ordered list carries the
  meaning of the step rail.
- Reduced motion is honoured globally in the base layer, and again by one block
  that switches off every scroll-driven reveal, the marquees, the rolling
  eyebrow and the footer signature. The hero map reads the same preference in
  JavaScript, holds one frame, and does not pin.
- The rolling region name in the hero eyebrow is `aria-hidden`; the eyebrow's
  accessible text is the static label beside it, and the `h1` under it carries
  the message. Under reduced motion it stops on the first name.
- Each marquee is a labelled group of real list items. The second copy of the
  track is `aria-hidden`, the rows pause on hover and on focus within, and under
  reduced motion the duplicate is removed and the row scrolls by hand.
- The footer signature is `aria-hidden`: it repeats the organisation name that
  the lockup, the description and the copyright line already carry as text.
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
- The header shows page links from the large breakpoint and moves them into the
  disclosure panel below it; the language control never moves.
- Navigation follows the reader's questions rather than the organisation chart:
  **Volunteering** (what would I do), **Partners** (who is behind this),
  **About** (who are you), **Contact** (how do I reach you).
  `src/lib/routing/routes.ts` is the single source of that order, so the
  header, the footer and the sitemap cannot disagree.
- The header lockup drops to the mark alone below 360px. `Volontyorlar` set beside
  the mark, the language control and the menu button do not fit a 320px screen
  together, and the mark is the part that still identifies the site.
