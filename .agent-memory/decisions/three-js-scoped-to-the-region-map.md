# three.js is allowed, on one surface, on conditions

`AGENTS.md` used to say no surface justifies WebGL. The home page now carries a
scroll-driven relief map of the fourteen regions, so that line is no longer true
and has been rewritten. What follows is the reasoning, so the exception does not
quietly become a precedent.

## Why plain three and not @react-three/fiber

The scene is a fixed set of meshes driven by one number. R3F's declarative model
buys little here and costs a hard React version pin: `@react-three/fiber@9`
declares `react: ">=19 <19.3"`, while this repository floats on `react: ^19.2.4`.
A routine minor bump would break installs for a convenience the scene does not
need. `three` alone has no React peer at all.

## The three conditions

1. **The section is complete before any script runs.** A server-rendered SVG plan
   map is in the document, and the canvas only fades over it once it reports
   ready. This is what makes the map compatible with
   [[scroll-driven-reveals-are-blank-off-screen]]: scrolling changes the viewing
   angle, it does not bring the section into existence. Cost is about 9KB gzipped
   on the home page document, and it is worth it.
2. **The library is never in the initial bundle.** `scene.ts` is imported inside
   an `IntersectionObserver` callback, so its 81KB gzipped chunk is fetched only
   as the section approaches and never on any other page.
3. **Reduced motion is honoured in JavaScript, not only in CSS.** The global
   `prefers-reduced-motion` rule in `globals.css` cannot reach a canvas, so the
   component reads the media query itself and holds one frame.

Anything that wants WebGL elsewhere has to clear the same three bars. If it
cannot, it does not ship.

## What the map may not say

It shows the country's fourteen regions and is framed as where the club is
heading — the claim `TARGET_REGION_COUNT` already makes. Pins are all identical
on purpose: sizing them by region area would read as a claim about activity that
[[product-brief-is-not-live-state]] does not permit.

Related: [[tailwind-minifies-hex-tokens-to-three-digits]]
