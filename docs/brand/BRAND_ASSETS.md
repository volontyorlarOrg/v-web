# Volontyorlar Brand Assets

## Source authority

The logo is the **Volontyorlar web logo kit** (`volontyorlar-web-logo-kit.zip`):
the "on" icon with its orange heart, the `volontyorlar` wordmark, and the lockup
that sets them side by side. The kit's README is archived verbatim at
[`LOGO_SPEC.md`](LOGO_SPEC.md) and is the authority for which variant goes on
which background, clear space, minimum size, and the brand colours. This page
records only how the kit is installed in this repository and which constraints
apply on the web.

The previous circle-and-arc mark is superseded. Its specification and its
primary SVG are archived under `reference/` (see [Superseded assets](#superseded-assets)).

## Colour

The kit's two brand colours are the same two the token system was already built
on, so no token changed value. The text-safe values below are this site's own
derivation: the kit does not define them, and neither brand colour reaches 4.5:1
on white.

| Role                       | Hex       | On white | Token                 | Use                                                    |
| -------------------------- | --------- | -------- | --------------------- | ------------------------------------------------------ |
| **Blue — the platform**    | `#007FC2` | 4.36:1   | `--color-primary`     | Icons, structure, navigation, large graphics           |
| Blue deep                  | `#005E92` | 6.96:1   | `--color-primary-ink` | Body text, small labels, white-on-blue buttons         |
| **Orange — the volunteer** | `#E85D30` | 3.48:1   | `--color-accent`      | Confirmations, achievement, highlights, large graphics |
| Orange deep                | `#B34917` | 5.41:1   | `--color-accent-ink`  | Orange text, white-on-orange buttons                   |
| Ink                        | `#222B33` | 14.37:1  | `--color-ink`         | Body copy                                              |
| Knockout                   | `#FFFFFF` | —        | `--color-knockout`    | On blue, orange, or ink                                |

The logo reads three tokens of its own, so the artwork never follows a theme's
re-tinted interface blue:

| Token                 | Light     | Dark      | Paints               |
| --------------------- | --------- | --------- | -------------------- |
| `--color-logo-blue`   | `#007FC2` | `#007FC2` | The icon tile        |
| `--color-logo-orange` | `#E85D30` | `#E85D30` | Both hearts          |
| `--color-logo-word`   | `#007FC2` | `#FFFFFF` | The wordmark letters |

The kit also names Slate `#5B6B78` for body text and Muted `#9AA8B4` for
captions. They are not adopted: `--color-ink-muted` (`#566270`) already does
that job and clears AA on every surface, and Muted does not reach 3:1 on white.

### The role split

Blue is the institution: navigation, structure, primary actions. Orange is the
person: a confirmed hour, a level reached, a thank-you. White dominates, blue
carries structure, and orange appears only where a person did something.
Rationing the orange is what keeps it meaning something.

### Rules that are not negotiable

1. **Interface colour never pairs the two hues.** They sit 1.25:1 apart, and
   1.24:1 once desaturated. Never orange text on blue, or blue text on orange;
   they vibrate optically at that luminance and merge in greyscale.
2. **The logo is the one place blue and orange meet, and only as the kit drew
   it.** The heart is a separate shape with clear space around it, so it never
   touches the blue it sits beside. Use the kit's two-colour artwork as
   delivered, and its one-colour versions (`*-blue`, `*-orange`, `*-white`)
   wherever colour cannot be relied on: one-colour print, embroidery,
   greyscale. The heart is orange, white, or blue — nothing else.
3. **Each hue has a graphics value and a text value.** `#007FC2` and `#E85D30`
   clear the 3:1 graphics threshold on white but miss the 4.5:1 text floor. Use
   them for the logo, headings at 24px and above, and large figures. Anything
   text-sized, and any knockout label on a solid fill, uses `#005E92` or
   `#B34917`.

Rules 1 and 3 are enforced by `src/app/design-tokens.test.ts`, including the
negative assertions: brand blue and brand orange must each stay _below_ 4.5:1 on
paper, and every blue/orange pairing must stay below 3:1, so nobody can quietly
combine them.

### Surfaces

Orange clears 3:1 on every light surface in the system, but only just on the
tinted bands: 3.48:1 on white, 3.33:1 on paper, 3.02:1 on the sunk band, and
3.04:1 on the soft blue band. If orange ever carries a large figure, it belongs
on white. The production evidence strip instead uses knockout figures on blue,
leaving orange to the volunteer's step. The test asserts all four light
surfaces so a future use cannot silently drop below the threshold.

### No red

The palette defines no red. An earlier `--color-destructive` of `#B3261E` was
removed because it is 1.21:1 against orange deep — visually the same colour at a
glance, and a trap for anyone reaching for "a red" to signal urgency. If a
destructive or deadline state is ever needed, it has to be chosen against
`#B34917` at 3:1 or better, and added to this page rather than picked in a
component.

## Usage on the web

- **Which variant where** is the kit's table in [`LOGO_SPEC.md`](LOGO_SPEC.md).
  On light surfaces the lockup is blue with the orange heart; on brand blue,
  photos, and dark surfaces the wordmark is white with the orange heart.
- **Minimum size:** icon 16 px, wordmark 120 px wide. The lockup is sized so
  the wordmark is 120.8px wide (a 42.4px icon), and where that does not fit —
  the site header below 390px — the header shows the icon alone rather than a
  smaller wordmark.
- **Clear space:** at least the height of the wordmark's "o" on every side.
- Never stretch, rotate, add shadows, or recolour parts outside the kit's
  variants.
- **Type.** The kit names Century Gothic with Poppins as the web fallback. The
  wordmark is outlined vector art, so it needs neither; the interface stays on
  Onest and Source Serif 4 (see `DESIGN.md`). Changing the interface face is a
  separate decision.

## Canonical files

`public/logo/` holds the kit's folders unmodified, so every file is reachable at
`/logo/<folder>/<file>`:

| Folder                                                | Contents                                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `public/logo/svg/`                                    | All 25 vectors: `icon-*`, `glyph-*`, `wordmark-*`, `lockup-*`, `heart-*`, and the three `*-currentcolor.svg` |
| `public/logo/png/{icon,glyph,wordmark,lockup,heart}/` | Transparent rasters; the `-480w` suffix is the width in pixels                                               |
| `public/logo/favicon/`                                | `favicon.ico`/`.svg`, 16–96 px PNGs, the Apple touch icon, Android and maskable icons                        |
| `public/logo/social/`                                 | Open Graph images (blue and light, 1200 × 630) and 1080 × 1080 avatars                                       |

Two kit files are deliberately **not** installed: `favicon/site.webmanifest`
(its icon paths assume the site root; `src/app/manifest.ts` is the manifest) and
`favicon/head-snippet.html` (Next.js emits those tags from the file conventions
below). `preview.html` stays in the zip.

The route tree serves copies through the Next.js `app/` file conventions:

| Asset                        | Source                                                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/favicon.ico`        | Kit `favicon/favicon.ico` (16, 32 and 48 px frames)                                                                                                                          |
| `src/app/icon.svg`           | Kit `favicon/favicon.svg`, the primary icon                                                                                                                                  |
| `src/app/icon.png`           | Kit `favicon/android-chrome-192x192.png`. Google's favicon formats are BMP, GIF, ICO, PNG, JPEG, PPM and TIFF, so the SVG alone cannot represent the site in a search result |
| `src/app/apple-icon.png`     | Kit `favicon/apple-touch-icon.png` (180 px, full bleed)                                                                                                                      |
| `public/opengraph-image.png` | Kit `social/og-image-1200x630.png`; referenced explicitly by localized page metadata                                                                                         |

The manifest lists the kit's two Android icons as `any`, and its two
`maskable-icon-*` files as `maskable`: those are full-bleed, so a launcher can
crop them to any shape. The structured-data `logo` is
`png/icon/icon-blue-orange-heart-512w.png`.

Because those file conventions are in place, `app/layout.tsx` deliberately does
not set `metadata.icons`; an explicit entry there would override them.

## How the site renders the logo

`src/components/brand/logo.tsx` draws the kit's paths inline, from
`src/components/brand/logo-paths.ts`, rather than loading the SVG files. Inline
paths cost no request and let the wordmark take its colour from a token, so one
component serves both themes. The paths are the kit's, copied without change;
update them only from a new kit.

The lockup is two SVGs laid out to the kit's own lockup geometry from one
variable, `--logo`, the icon's size: the wordmark is `0.6006` of it tall, starts
`0.24` of it down, and follows a gap of `0.3025` of it. Those are the
`scale(0.4)` icon and `translate(521 96) scale(1.14)` wordmark of
`lockup-blue-orange-heart.svg`, measured against its 400-unit height.
`--logo` is `2.65rem`: at the kit's ratio a 32px icon would give a 91px
wordmark, under the 120px minimum. The same components, tokens and path file are
in `../v-app`, `../v-staff` and `../v-admin`; the portals set the portal's name
after the lockup and pass `condensed` in their crowded shell header.

## Superseded assets

- The circle-and-arc mark ("a person with raised arms") is archived as
  `reference/circle-arc-mark.svg`, with its specification at
  `reference/circle-arc-logo-spec.md`. Its colour table is where the text-safe
  values above were first derived. It is history, not a current asset.
- The five-colour mark before it is archived at
  `reference/volontyor-legacy-mark.png` and
  `reference/volontyor-legacy-mark-white.png`.
- The teal `#45C1C4` reconstructions rebuilt from a JPEG screenshot are removed.
  The archived screenshot stays at `reference/volontyorlar-logo-reference.jpg`
  (SHA-256 `36902f064e74553cbdba919beef096aeec1454060c8b470b459dadc18b82d37e`).

## Needs verification

- Whether `Volontyorlar` is the legal name as well as the public one
- Trademark clearance and ownership of the new mark
- Approved print colours and partner co-branding rules
