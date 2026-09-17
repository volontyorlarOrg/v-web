# Volontyorlar — Web Logo Kit

All logos redrawn as clean vector SVGs from the original PNG pack, plus the PNG sizes,
favicons, app icons and social images a website needs. Open `preview.html` to see everything.

## Folders

| Folder     | What's inside                                                                                                          | Use it for                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `svg/`     | Every logo as a vector (25 files)                                                                                      | **First choice on the website** — sharp at any size, tiny file size   |
| `png/`     | Same logos as transparent PNGs in several widths (`-480w` = 480 px wide)                                               | Email signatures, CMS/builders that don't accept SVG, documents       |
| `favicon/` | `favicon.ico/.svg`, 16–96 px PNGs, Apple touch icon, Android + maskable icons, `site.webmanifest`, `head-snippet.html` | Browser tab, bookmarks, phone home screen                             |
| `social/`  | Open Graph share image (1200×630, blue + light), square avatars (1080×1080)                                            | Link previews on Telegram / Facebook / LinkedIn / X, profile pictures |

## Which logo where

| Logo                                 | File                                                                                    | Background                                                                                |
| ------------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Wordmark (primary)                   | `wordmark-blue-orange-heart`                                                            | White / light                                                                             |
| Wordmark on blue                     | `wordmark-white-orange-heart`                                                           | Brand blue                                                                                |
| Wordmark on orange or photos         | `wordmark-white`                                                                        | Orange, dark photos                                                                       |
| Wordmark single colour               | `wordmark-blue`, `wordmark-orange`                                                      | Light                                                                                     |
| Wordmark reversed accent             | `wordmark-orange-blue-heart`                                                            | Light                                                                                     |
| Lockup (icon + wordmark)             | `lockup-blue-orange-heart`                                                              | Light — site header, footer                                                               |
| Lockup on blue                       | `lockup-white-orange-heart`                                                             | Brand blue                                                                                |
| Lockup on orange/photos              | `lockup-orange-white`, `lockup-white`                                                   | Blue, orange, photos                                                                      |
| App icon                             | `icon-blue-orange-heart` (primary), `icon-blue`, `icon-orange`, `icon-white-blue-glyph` | Any                                                                                       |
| Glyph only ("on" + heart, no square) | `glyph-blue-orange-heart`, `glyph-white`, `glyph-white-orange-heart`, `glyph-blue`      | Watermarks, loaders                                                                       |
| Heart                                | `heart-orange`, `heart-blue`, `heart-white`                                             | Bullets, likes, accents                                                                   |
| `*-currentcolor.svg`                 | wordmark, glyph, heart                                                                  | Paste inline into HTML; they take the CSS `color` of their parent (good for hover states) |

## Quick code

```html
<!-- Header logo -->
<a href="/" class="logo">
  <img src="/svg/lockup-blue-orange-heart.svg" alt="Volontyorlar" height="40" />
</a>

<!-- Recolourable inline wordmark: paste the contents of wordmark-currentcolor.svg -->
<span style="color:#007FC2">…inline svg…</span>
```

**Favicons:** copy everything in `favicon/` to the site root and paste `favicon/head-snippet.html`
into `<head>`. Replace `YOUR-DOMAIN` in the social tags and upload `social/og-image-1200x630.png`.

SVG sizes: the wordmark is 1000 × 210.74 (ratio ≈ 4.75 : 1), the icon 1000 × 1000,
the lockups 1657 × 400 (`lockup-white` ≈ 1721 × 400). Set only `height` (or only `width`) in HTML so they scale in proportion.

## Colours

| Name   | HEX       | RGB           | Role               |
| ------ | --------- | ------------- | ------------------ |
| Blue   | `#007FC2` | 0, 127, 194   | Primary            |
| Orange | `#E85D30` | 232, 93, 48   | Accent, the heart  |
| White  | `#FFFFFF` | 255, 255, 255 | Dominant surface   |
| Slate  | `#5B6B78` | 91, 107, 120  | Body text on light |
| Muted  | `#9AA8B4` | 154, 168, 180 | Captions, footers  |

```css
:root {
  --vol-blue: #007fc2;
  --vol-orange: #e85d30;
  --vol-slate: #5b6b78;
  --vol-muted: #9aa8b4;
}
```

## Usage rules (from the brand pack)

- Clear space: at least the height of the "o" free on every side of the mark.
- Minimum size: wordmark 120 px wide; icon 16 px.
- Never stretch, rotate, add shadows, or recolour the heart to anything but orange, white or blue.
- On photos use the white versions, and make sure the area behind is dark enough.
- Type: Century Gothic; web fallback Poppins (Google Fonts), then Futura, Avenir, Arial.
