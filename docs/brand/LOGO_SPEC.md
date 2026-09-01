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

| Use | Hex | Contrast on white |
|---|---|---|
| **Logo, icons, large graphics** | `#007FC2` | 4.36:1 — passes the 3:1 graphics threshold |
| **Body text, small button labels** | `#005E92` | 6.96:1 — passes AA text |
| Ink / wordmark | `#222B33` | 14.37:1 |
| Knockout | `#FFFFFF` | — |

> **Important:** `#007FC2` is 4.36:1 on white, which clears the 3:1 requirement for graphics and large text but **misses the 4.5:1 floor for body text.** Use it for the mark and for headings at 24px+ or 18.66px+ bold. Anything smaller, and any white-on-blue button label, uses `#005E92`.

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
