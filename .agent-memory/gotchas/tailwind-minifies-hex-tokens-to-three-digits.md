# Reading a colour token as a base-16 integer gives the wrong colour

The region map takes its colours from the semantic tokens rather than literals,
by reading the custom properties off `document.documentElement`. The first
version parsed them by hand:

```ts
Number.parseInt(value.replace("#", ""), 16);
```

The whole country rendered saturated blue. Tailwind emits the minified form, so
`--color-surface: #ffffff` arrives as `#fff`, and `parseInt("fff", 16)` is
`0x000fff` — a valid colour, three digits short.

The fix is to let three parse it: `new Color().setStyle(value)` handles `#fff`,
`#ffffff`, `rgb()`, and named colours. Any code reading a design token at run
time should assume the minified form, not the value written in `globals.css`.

The failure is quiet: nothing throws, nothing warns, and a shorthand token still
produces a plausible-looking colour. Check the rendered result, not the parse.

Related: [[three-js-scoped-to-the-region-map]]
