# Volontyorlar Brand Assets

## Source authority

The master logo set was delivered as a self-contained package with its own
specification. That specification is archived verbatim at
[`LOGO_SPEC.md`](LOGO_SPEC.md) and is the authority for geometry, colour, clear
space, and minimum size. This page records only how the set is installed in this
repository and which constraints apply on the web.

The delivered vectors and rasters are installed unmodified under `public/logo/`.
Two files in that folder are derived here rather than delivered; they are marked
as such below.

## Colour

Two brand colours, both from the UN Volunteers / International Volunteer Day
brand guide. [`LOGO_SPEC.md`](LOGO_SPEC.md) is the authority; this table records
the values as they are installed in the token system.

| Role | Hex | On white | Token | Use |
| --- | --- | --- | --- | --- |
| **Blue — the platform** | `#007FC2` | 4.36:1 | `--color-primary` | The mark, icons, structure, navigation, large graphics |
| Blue deep | `#005E92` | 6.96:1 | `--color-primary-ink` | Body text, small labels, white-on-blue buttons |
| **Orange — the volunteer** | `#E85D30` | 3.48:1 | `--color-accent` | Confirmations, achievement, highlights, large graphics |
| Orange deep | `#B34917` | 5.41:1 | `--color-accent-ink` | Orange text, white-on-orange buttons |
| Ink | `#222B33` | 14.37:1 | `--color-ink` | Body copy, wordmark |
| Knockout | `#FFFFFF` | — | `--color-knockout` | On blue, orange, or ink |

### The role split

Blue is the institution: navigation, structure, primary actions, the mark.
Orange is the person: a confirmed hour, a level reached, a thank-you. White
dominates, blue carries structure, and orange appears only where a person did
something. Rationing the orange is what keeps it meaning something.

### Three rules that are not negotiable

1. **The mark is never two-colour.** The two hues sit 1.25:1 apart, and 1.24:1
   once desaturated. In greyscale, one-colour print, embroidery, or for a viewer
   with colour vision deficiency, an orange dot on a blue arc merges into one
   flat shape. The mark is blue, ink, or white — one colour at a time.
2. **Never orange text on blue, or blue text on orange.** Same 1.25:1, and they
   vibrate optically at that luminance.
3. **Each hue has a graphics value and a text value.** `#007FC2` and `#E85D30`
   clear the 3:1 graphics threshold on white but miss the 4.5:1 text floor. Use
   them for the mark, headings at 24px and above, and large figures. Anything
   text-sized, and any knockout label on a solid fill, uses `#005E92` or
   `#B34917`.

All three are enforced by `src/app/design-tokens.test.ts`, including the
negative assertions: brand blue and brand orange must each stay *below* 4.5:1 on
paper, and every blue/orange pairing must stay below 3:1, so nobody can quietly
combine them.

### Surfaces

Orange clears 3:1 on every light surface in the system, but only just on the
tinted bands: 3.48:1 on white, 3.33:1 on paper, 3.02:1 on the sunk band, and
3.04:1 on the soft blue band. Orange figures therefore belong on white cards.
The test asserts all four so a future change to a band tone fails loudly instead
of silently dropping below the threshold.

### No red

The palette defines no red. An earlier `--color-destructive` of `#B3261E` was
removed because it is 1.21:1 against orange deep — visually the same colour at a
glance, and a trap for anyone reaching for "a red" to signal urgency. If a
destructive or deadline state is ever needed, it has to be chosen against
`#B34917` at 3:1 or better, and added to the specification rather than picked in
a component.

## Construction and usage

Read [`LOGO_SPEC.md`](LOGO_SPEC.md) for the 200 × 200 construction table. The
whole mark derives from the arc radius, the arc stroke width, and the dot
radius — change one and re-derive the rest rather than nudging parts
independently.

- Minimum size is 16 px; the mark holds at 16, 24, and 32 px without
  simplification.
- Clear space is one dot radius (20 units at construction scale) on every side,
  and scales with the mark.
- Never stretch, rotate, recolour parts separately, outline, or add glow.

## Canonical files

Vectors in `public/logo/`:

| Asset | Intended use |
| --- | --- |
| `mark-blue.svg` | Primary mark; stroked path, smallest file, best for web |
| `mark-white.svg` | Knockout mark on dark or photographic surfaces |
| `mark-ink.svg` | One-colour dark mark |
| `mark-blue-outlined.svg` | Stroke converted to filled path, for print, cutting, embroidery, and renderers that cannot stroke reliably |
| `mark-black-outlined.svg` | One-colour black outlined mark, for trademark filing artwork |
| `icon-blue.svg` | Rounded-square app icon, mark at 78% |
| `icon-white.svg` | Rounded-square app icon on light ground |
| `lockup-horizontal.svg` | Mark plus wordmark for light surfaces |
| `lockup-horizontal-white.svg` | **Derived.** Knockout recolour of the horizontal lockup for dark surfaces |
| `social-card.svg` | **Derived.** Source for the 1200 × 630 social image; renamed to Youth Volunteer Club and re-rendered when the product name was corrected |

Rasters in `public/logo/png/` cover the mark at 16–1024 px, the app icon at
180/192/512/1024 px, and the horizontal lockup at 720 and 1440 px.

App icons use the Next.js `app/` file conventions and are served from the route
tree, not from `public/`:

| Asset | Source |
| --- | --- |
| `src/app/favicon.ico` | **Rebuilt.** The delivered `favicon.ico` held a single 16 px frame despite the spec calling for 16–256 px, so it was repacked from `png/mark-blue-{16,32,48,64,128,256}.png` |
| `src/app/icon.svg` | Copy of `icon-blue.svg` |
| `src/app/apple-icon.png` | Copy of `png/icon-blue-180.png` |
| `src/app/opengraph-image.png` | Rendered from `public/logo/social-card.svg` |

Because those file conventions are in place, `app/layout.tsx` deliberately does
not set `metadata.icons`; an explicit entry there would override them.

## How the site uses the set

The production site does **not** use the horizontal lockup. It renders the mark
inline from the construction geometry so it inherits `currentColor`, and sets
the organisation name as real HTML text in Onest beside it. Two reasons:

- the lockup's wordmark cannot render reliably (see below);
- the lockup's wordmark reads `volontyorlar`, while the canonical product name
  is Youth Volunteer Club. Which of the two the brand keeps is unresolved and is
  listed under **Needs verification**.

Large decorative shapes on the site use the arc alone, a derived graphic device,
so the logo is never cropped or scaled below its 16px minimum. Section labels
use a plain rule rather than a miniature mark for the same reason.

## Constraints

Size the horizontal lockup by eye, not by reusing an old width. Its box is
720 × 160, but the artwork inside measures roughly 583 × 71 — about 8.3:1, with
the rest as padding. At a fixed CSS width it therefore renders a noticeably
smaller wordmark than the 4.2:1 asset it replaced.

The wordmark in the lockups is SVG `<text>` set in
`Onest, 'Segoe UI', system-ui, sans-serif`. Two consequences follow:

- An SVG loaded through `<img>` or `next/image` cannot fetch a webfont, so the
  wordmark falls back to a system face and renders differently per platform.
  Where the wordmark must be pixel-identical, use `png/lockup-horizontal-*.png`
  instead of the SVG.
- The delivered spec states the wordmark is a system fallback, not final type.
  It still needs a licensed face with U+02BB support and letterform adjustment.
  Do not treat the current lockup as a finished wordmark.

See [`../../.agent-memory/gotchas/svg-lockup-wordmark-font.md`](../../.agent-memory/gotchas/svg-lockup-wordmark-font.md).

## Resolved

- **Palette conflict.** Previously the explorations, `DESIGN.md`, and
  `.impeccable/design.json` were built on teal `#45C1C4`, which is not a brand
  colour. The explorations and that token file are gone.
- **Second brand colour.** The specification now defines orange `#E85D30` /
  `#B34917` alongside the blues, with an explicit role split. The token system,
  the design system, and the contrast test were updated to match; the site
  applies orange to the traction figures and to the one step in the volunteer
  journey the volunteer performs.

## Superseded assets

- The five-colour YVC mark is archived at
  `reference/yvc-legacy-mark.png` and `reference/yvc-legacy-mark-white.png`. It
  is history, not a current asset. The product brief's instruction to "use all
  five logo colors" for categories and levels no longer has a source palette.
- The teal `#45C1C4` reconstructions rebuilt from a JPEG screenshot are removed.
  The archived screenshot stays at `reference/volontyorlar-logo-reference.jpg`
  (SHA-256 `36902f064e74553cbdba919beef096aeec1454060c8b470b459dadc18b82d37e`).

## Needs verification

- Whether the delivered `volontyorlar` wordmark is retained alongside the
  canonical product name Youth Volunteer Club, and which of the two is the legal
  and public name
- Final wordmark typeface, licence, and letterform adjustment
- Trademark clearance and ownership; the spec's filing checklist is not done
- Approved print colours and partner co-branding rules
