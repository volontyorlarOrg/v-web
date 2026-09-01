# Applied UI System

The token values, typography scale, and named rules live in
[`../../DESIGN.md`](../../DESIGN.md). This page records how they are applied in
code, plus the localization and accessibility behaviour that goes with them.

## Where tokens live

`src/app/globals.css` declares every semantic token in a Tailwind 4 `@theme`
block, so `bg-paper`, `text-ink-muted`, `border-border`, and
`bg-primary-ink` are generated utilities. Components must not contain literal
hex values.

`src/app/design-tokens.test.ts` parses that file and asserts the contrast
contract on every documented pairing, including the deliberate negative: brand
blue `#007FC2` must stay below 4.5:1 on paper, because the moment it passes, the
"graphics and 24px and above" rule in the brand specification has changed and
needs a real decision rather than a silent drift.

## Composition primitives

| Component | Role |
| --- | --- |
| `Section` | Vertical rhythm, tone band, hairline boundary, container |
| `SectionHeader` / `Eyebrow` | Rule-led label, headline, lead sentence |
| `PageHero` | Opening block for every page below the home page |
| `StatGrid` | Hairline grid of tabular figures |
| `StepRail` | The four-step rail; decorative rail, semantic ordered list |
| `NameBoard` | Separated cards for partner, supporter, and source names |
| `ProseSections` | Legal and explanatory pages at one measure |
| `StatusChip` | Dashed label for planned or unpublished material |
| `buttonClass` | The single action styling contract, built with CVA |
| `ActionLink` | Chooses a locale-aware link or a safe external anchor |

`NameBoard` and the course topics use separated cards rather than the hairline
grid used elsewhere: their length varies, and an unfilled cell in a gap-filled
grid reads as a rendering fault.

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
- Status is never carried by colour alone: the "in preparation" chip says so.
- Decorative marks and rails are `aria-hidden`; the ordered list carries the
  meaning of the step rail.
- Reduced motion is honoured globally in the base layer.

## Responsive rules

- Mobile is the primary composition. `body` clips horizontal overflow and an
  end-to-end test asserts `scrollWidth === clientWidth` at 390px.
- Two-column compositions collapse in reading order below the large breakpoint.
- The header shows page links from the large breakpoint and moves them into the
  disclosure panel below it; the language control never moves.
