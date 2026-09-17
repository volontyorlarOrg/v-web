# The logo kit, drawn inline

The circle-and-arc mark was replaced by the Volontyorlar web logo kit: the "on"
icon with an orange heart, and an outlined `volontyorlar` wordmark. The kit's
README is `docs/brand/LOGO_SPEC.md`; its files are `public/logo/`.

**Inline paths, not `<img>`.** `brand/logo-paths.ts` holds the kit's five
distinct paths (tile, "on", icon heart, wordmark, wordmark heart), verified
identical across every kit SVG that uses them. Drawing them inline costs no
request and lets one component follow the theme. The old reason for setting
the name as HTML text — an SVG `<text>` wordmark that could not load its
webfont — is gone, because this wordmark is outlines.

**Three logo tokens.** `logo-blue` and `logo-orange` are fixed; `logo-word` is
blue in light and white in dark. The logo does not use `primary`, because the
dark theme re-tints `primary` to `#3aa0e4` and the kit forbids recolouring.

**The 120px wordmark minimum sets every size.** At a 32px icon the kit's lockup
geometry gives a 91px wordmark, so the lockup is sized from `--logo: 2.65rem`
(wordmark 120.8px). That wider lockup no longer fits beside the header's three
controls at 360px, so the header shows the icon alone below 390px. Shrinking the
wordmark to fit would break the kit's rule.

**Two colours in the logo only.** The interface rule that blue and orange never
touch stands. The kit's primary logo is two-colour; its heart is a separate
shape beside the blue, and the kit ships one-colour versions for print.

**Removed with the old mark:** `BrandMark`, `BrandArc`, `BrandMarkRaise`, and
`BrandSignature` with its CSS — the signature was already unused after the
footer redesign, and its motion was the old mark's head and arms. `BrandHeart`
replaces the arc as the large decorative device.

See also [[two-brand-hues-with-a-role-split]].
