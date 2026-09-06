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

The delivered specification defines two brand colours, both from the UN
Volunteers / International Volunteer Day brand guide, and an ink.
[`LOGO_SPEC.md`](LOGO_SPEC.md) is the authority for the mark and for print;
this section records what the web token system takes from it and where it
departs. The web palette is ivory paper, near-black ink, and one blue — see
[`../../DESIGN.md`](../../DESIGN.md) — and the mark is the one element that
keeps its delivered value unchanged.

| Spec role | Spec hex | Web token | Web hex | On ivory | Use on the web |
| --- | --- | --- | --- | --- | --- |
| **Blue — the platform** | `#007FC2` | `--color-brand` | `#007FC2` | 4.14:1 | The mark, and nothing else |
| | | `--color-primary` | `#3B82B8` | 3.93:1 | Rails, nodes, eyebrow rules, the hero map's plate; graphics 24px and above |
| Blue deep | `#005E92` | `--color-primary-ink` | `#23608C` | 6.38:1 | Links, small labels, the focus ring; the one text-sized blue |
| | | `--color-accent` | `#2A6A9C` | 5.48:1 | The one filled join or apply action; knockout label at 5.5:1 |
| **Orange — the volunteer** | `#E85D30` | — | — | — | Not in the web palette |
| Orange deep | `#B34917` | — | — | — | Not in the web palette |
| Ink | `#222B33` | `--color-ink` | `#141413` | 17.5:1 | Body copy, the wordmark, and the fills that carry weight |
| Knockout | `#FFFFFF` | `--color-knockout` | `#FAF9F5` | — | Ivory type on ink and on the blue fill |

The derived blues are the brand blue calmed down: the same hue family
(201–208°), less saturated, a touch deeper, so they sit on warm ivory rather
than vibrating against it. The mark does not take the calmer register; the
delivered `mark-blue.svg` and `--color-brand` are the same colour.

The web ink is `#141413` rather than the specification's `#222B33`. The
specification's ink was chosen against a cool blue-white page; the web page is
warm ivory, and a cool navy-black on it reads as a mismatch. The delivered
`mark-ink.svg` is unchanged and is still the right one-colour dark mark for
print.

### Orange on the web

Orange is not in the web palette. The site and the application use one accent
hue, blue, in the role the reference register gives its terracotta; the
specification's orange remains available for print and partner material where
the specification's own rules apply. Nothing on the web reaches for `#E85D30`
or `#B34917`, and the token test asserts that every non-neutral token is blue.

### Rules that are not negotiable

1. **The mark is never two-colour, and never recoloured.** The mark is
   `brand` blue, ink, or knockout — one colour at a time — and on the web it is
   always `#007FC2` or ivory. Recolouring it into the derived blue would
   quietly change the logo.
2. **The blue has a graphics value and a text value.** `#007FC2` and `#3B82B8`
   clear the 3:1 graphics threshold on every surface but stay below the 4.5:1
   text floor on paper. Use them for the mark, rails, nodes and marks 24px and
   above. Anything text-sized uses `#23608C`; a knockout label sits on
   `#2A6A9C` or on ink.
3. **Ink carries weight.** The primary button, the traction band, the closing
   callout and the footer are ink fills with ivory type. A blue fill is the one
   join or apply action a screen has.

All three are enforced by `src/app/design-tokens.test.ts`: the mark's value is
pinned in both themes, the graphics blues must stay *below* 4.5:1 on paper,
every label must clear AA on its fill, and every blue token must have a hue
between 195° and 225°.

### Surfaces

The graphics blue clears 3:1 on every light surface in the system — 4.14:1 on
white, 3.93:1 on paper, 3.56:1 on the sunk band, 3.54:1 on the soft band and
3.33:1 on the accent tint — and the text blue clears 4.5:1 on all of them, at
5.41:1 on the tint where the margin is narrowest. The test asserts all six
surfaces in both themes so a future use cannot silently drop below the
threshold.

### No red

The palette defines no red. An earlier `--color-destructive` of `#B3261E` was
removed when the palette still carried orange, because it was 1.21:1 against
orange deep; with orange gone the reason changed but the rule did not. If a
destructive or deadline state is ever needed, it has to be chosen against the
blue and the ink at 3:1 or better, given a token in both themes, and added to
the specification rather than picked in a component.

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
| `social-card.svg` | **Derived.** Source for the 1200 × 630 social image; renamed to Volontyorlar and re-rendered when the product name was corrected |

Rasters in `public/logo/png/` cover the mark at 16–1024 px, the app icon at
180/192/512/1024 px, and the horizontal lockup at 720 and 1440 px.

App icons use the Next.js `app/` file conventions and are served from the route
tree, not from `public/`:

| Asset | Source |
| --- | --- |
| `src/app/favicon.ico` | **Rebuilt.** The delivered `favicon.ico` held a single 16 px frame despite the spec calling for 16–256 px, so it was repacked from `png/mark-blue-{16,32,48,64,128,256}.png` |
| `src/app/icon.svg` | Copy of `icon-blue.svg` |
| `src/app/apple-icon.png` | Copy of `png/icon-blue-180.png` |
| `public/opengraph-image.png` | Rendered from `public/logo/social-card.svg`; referenced explicitly by localized page metadata |

Because those file conventions are in place, `app/layout.tsx` deliberately does
not set `metadata.icons`; an explicit entry there would override them.

## How the site uses the set

The production site does **not** use the horizontal lockup. It renders the mark
inline from the construction geometry so it inherits `currentColor`, and sets
the organisation name as real HTML text in Onest beside it. Two reasons:

- the lockup's wordmark cannot render reliably (see below).

The lockup's `volontyorlar` wordmark and the canonical product name Volontyorlar
now read the same word, so the earlier mismatch between the two is resolved.

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
- **Second brand colour.** The specification defines orange `#E85D30` /
  `#B34917` alongside the blues, with an explicit role split. The site carried
  it for a time on the traction figures and then on the one step the volunteer
  performs. It has since left the web palette altogether: the site and the
  application use ivory, ink and one derived blue, and the mark alone keeps the
  delivered `#007FC2`. See `.agent-memory/decisions/ivory-ink-and-one-blue.md`.

## Superseded assets

- The superseded five-colour mark is archived at
  `reference/volontyor-legacy-mark.png` and
  `reference/volontyor-legacy-mark-white.png`. It is history, not a current
  asset. The product brief's instruction to "use all
  five logo colors" for categories and levels no longer has a source palette.
- The teal `#45C1C4` reconstructions rebuilt from a JPEG screenshot are removed.
  The archived screenshot stays at `reference/volontyorlar-logo-reference.jpg`
  (SHA-256 `36902f064e74553cbdba919beef096aeec1454060c8b470b459dadc18b82d37e`).

## Needs verification

- Whether `Volontyorlar` is the legal name as well as the public one
- Final wordmark typeface, licence, and letterform adjustment
- Trademark clearance and ownership; the spec's filing checklist is not done
- Approved print colours and partner co-branding rules
