# The SVG lockup wordmark does not render consistently

`public/logo/lockup-horizontal.svg` and its knockout variant set the wordmark as
SVG `<text>` in `Onest, 'Segoe UI', system-ui, sans-serif`. An SVG loaded through
`<img>` or `next/image` is rendered as an isolated document that cannot fetch
external resources, so no webfont loads and the wordmark falls back to a
different system face on macOS, Windows, and Android.

Symptoms are easy to misread: the mark is always correct, only the word changes
shape, so it looks like a rendering bug rather than a font substitution.

Do not fix this by outlining or embedding a font. The delivered specification
states the wordmark is a system fallback pending a licensed face with U+02BB
support plus letterform adjustment, so any correction now would be thrown away.
Where a fixed wordmark is required, use `public/logo/png/lockup-horizontal-*.png`.
