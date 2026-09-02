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
the mark, decorative arcs, and the closing callout band. Orange appears in
exactly two places, and both are moments a person acted:

| Surface | Treatment |
| --- | --- |
| Traction figures in `StatGrid` | `text-accent` on white cards |
| The fourth node and number in `StepRail` | `bg-accent` / `text-accent-ink` |

The regions band keeps white figures on blue even though "500+ applications" is
the same kind of human number, because orange on blue is forbidden. That
constraint is the rule working, not a gap.

Orange figures sit on `surface` (white, 3.48:1) rather than on a tinted band,
where the margin narrows to 3.02:1.

## Composition primitives

| Component | Role |
| --- | --- |
| `Section` | Vertical rhythm, tone band, hairline boundary, container |
| `SectionHeader` / `Eyebrow` | Rule-led label, headline, lead sentence |
| `PageHero` | Opening block for every page below the home page |
| `StatGrid` | Orange tabular figures in the display serif under hairline rules |
| `StepRail` | The four-step rail; blue nodes for YVC's work, orange for the volunteer's |
| `NameBoard` | Hairline-ruled rows of partner, supporter, and source names |
| `ProseSections` | Legal and explanatory pages at one measure |
| `StatusChip` | Dashed label for planned or unpublished material |
| `buttonClass` | The single action styling contract, built with CVA |
| `ActionLink` | Chooses a locale-aware link or a safe external anchor |
| `HeroMapSection` | The home page hero and its scroll-driven map of the fourteen regions |

Nothing on the home page is a bordered card any more. `StatGrid`, `NameBoard`,
the course topics and the "what we do" list all use a hairline rule above each
item with a generous gap, so a short list and a long one look equally deliberate
and an unfilled grid cell cannot read as a rendering fault.

## Brand usage in code

`BrandMark` renders the delivered geometry inline so it inherits `currentColor`
and costs no request. It appears at 32px in the header and 48px on the 404 page,
always above the documented 16px minimum.

`BrandArc` is the arc alone. Large decorative shapes use it so the logo is never
cropped, tinted, or scaled below its minimum.

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
- The language control is in the header at every width and in the footer. It
  links to the same route in another locale, so switching never drops the reader
  onto the home page.
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
- Status is never carried by colour alone: the "in preparation" chip says so in
  words, and the orange step node reinforces a title that already names who
  acts.
- Decorative marks and rails are `aria-hidden`; the ordered list carries the
  meaning of the step rail.
- Reduced motion is honoured globally in the base layer. The hero map reads the
  same preference in JavaScript, holds one frame, and does not pin.
- The hero map's canvas and its plan-view fallback are both `aria-hidden`. The
  information they carry — the names of all fourteen regions — is a real list in
  the markup, so nothing depends on seeing the picture.
- The hero copy and the map caption share one pinned panel. Whichever has faded
  out is marked `inert`, so keyboard focus never lands on an invisible link.

## Responsive rules

- Mobile is the primary composition. `body` clips horizontal overflow and an
  end-to-end test asserts `scrollWidth === clientWidth` at 390px.
- Two-column compositions collapse in reading order below the large breakpoint.
- The header shows page links from the large breakpoint and moves them into the
  disclosure panel below it; the language control never moves.
