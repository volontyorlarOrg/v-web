# Volontyorlar — logo specification

**Mark:** a circle above an open arc. Reads simultaneously as a person with raised arms, the letter V, and a smile.
**Primary colour:** `#007FC2` — UN Blue, taken from the UN Volunteers / International Volunteer Day brand guide.

## Construction (200 × 200 unit square)

| | |
|---|---|
| Arc centre | (100, 72) |
| Arc radius | 59 |
| Arc stroke width | 13 |
| Arc endpoints | (41.74, 81.30) and (158.26, 81.30) |
| Arc sweep | 161.86° |
| Caps | round |
| Dot centre | (100, 76) |
| Dot radius | 20 |
| Gap, dot to arc inner edge | 28.5 units |

Everything derives from three numbers: the arc radius, the stroke width and the dot radius. Change one and re-derive the rest — do not nudge parts independently.

## Colour

Two brand colours, both from the UN Volunteers / International Volunteer Day brand guide.

| Role | Hex | On white | Use |
|---|---|---|---|
| **Blue — the platform** | `#007FC2` | 4.36:1 | the mark, icons, structure, navigation, large graphics |
| Blue deep | `#005E92` | 6.96:1 | body text, small labels, white-on-blue buttons |
| **Orange — the volunteer** | `#E85D30` | 3.48:1 | confirmations, achievement, highlights, large graphics |
| Orange deep | `#B34917` | 5.41:1 | orange text, white-on-orange buttons |
| Ink | `#222B33` | 14.37:1 | body copy, wordmark |
| Knockout | `#FFFFFF` | — | on blue, orange or ink |

**Role split.** Blue is the institution: navigation, structure, primary actions, the mark. Orange is the person: a confirmed hour, a level reached, a thank-you. That is Ruler 70 / Hero 30, expressed in colour. Rationing the orange is what keeps it meaning something.

**60-30-10.** White dominates. Blue carries structure. Orange appears only where a person did something.

### Three colour rules that are not negotiable

1. **The mark is never two-colour.** `#007FC2` and `#E85D30` sit at almost identical luminance — **1.25:1 against each other**, and 1.24:1 once desaturated. In greyscale, one-colour print, embroidery, or for a viewer with colour vision deficiency, an orange dot on a blue arc merges into one flat shape. Every orange and amber from `#EA7B4E` to `#FFCE6D` was tested against the blue: none reaches 3:1, and the ones that come closest fail against white. The mark is blue, ink, or white — one colour at a time.
2. **Never set orange text on blue, or blue text on orange.** 1.25:1. They also vibrate optically at that luminance.
3. **`#007FC2` is 4.36:1 on white** — clears the 3:1 graphics threshold, misses the 4.5:1 text floor. Fine for the mark and headings at 24px+ (or 18.66px+ bold). Body text and small button labels use `#005E92`. Same logic for orange: `#E85D30` for graphics, `#B34917` for text.

## Sizes

- **Minimum size:** 16 px. Verified — the mark holds at 16, 24 and 32 px with no simplification needed.
- **Clear space:** one dot-radius (20 units at this scale) on every side. It scales with the mark.

## Files

| File | Use |
|---|---|
| `mark-blue.svg` | primary — stroked path, smallest file, best for web |
| `mark-blue-outlined.svg` | **stroke converted to a filled path** — use for trademark filing, print, laser cutting, embroidery, and any system that cannot render strokes reliably |
| `mark-black-outlined.svg` | one-colour black, outlined — trademark filings usually want black-and-white |
| `mark-ink.svg` / `mark-white.svg` | dark and knockout versions |
| `icon-blue.svg` / `icon-white.svg` | rounded-square app icon, mark at 78% |
| `lockup-horizontal.svg` | mark plus wordmark |
| `png/` | rasters, 16 → 1024 px |
| `favicon.ico` | multi-resolution, 16 → 256 px |

**On the lockup:** the wordmark is currently set in a system fallback, not final type. It needs a licensed face with U+02BB support (Onest is verified) and then custom letterform adjustment — a descriptive name means the wordmark has to carry the distinctiveness the word cannot.

## Before filing

1. Reverse-image search the mark, and search the WIPO Global Brand Database. A circle above an arc is a common construction — confirm it is clear in your classes before you commit.
2. File the **composite** (mark plus wordmark) as a figurative mark, and the word mark separately.
3. Use `mark-black-outlined.svg` for the filing artwork.
4. Uzbekistan is first-to-file. Register the domain and file in the same week, before any public announcement.
