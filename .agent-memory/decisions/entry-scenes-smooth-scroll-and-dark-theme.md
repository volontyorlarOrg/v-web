# Entry scenes, smooth scrolling and a dark theme without new frameworks

On 3 September 2026 the site gained three things it had previously refused:
motion that plays as sections enter, smoothed scrolling, and a dark theme. The
reference was jamals.uz, which does all three with GSAP, SplitText and Lenis on
a dark grain ground. The decisions, so they are not re-litigated:

**No animation library.** jamals.uz's whole effect is a masked line rise on
headings, a fade-and-rise on blocks, a stagger on lists, and a "play once at
88% of the viewport" trigger. That is one `IntersectionObserver`, one attribute
and about eighty lines of CSS transitions, so that is what was built. Word
masks replace line masks because words survive a resize and a locale change
without re-splitting; `SplitText`'s line splitting is the one thing GSAP would
have added, and it is the thing that breaks. `lenis` was taken as-is because a
hand-rolled smooth scroll is the opposite of clean.

**Complete at rest, still.** The old scroll reveals were removed because they
left sections blank in captures. The scenes keep that promise a different way:
the hidden state exists only under `html[data-motion]`, which the boot script
sets, and only until the scene is marked entered. No JavaScript, reduced motion
and print all see the finished page. A full-page capture taken *with* motion
on and *without* scrolling still shows un-entered sections at rest, which is the
trade every reference site makes and the one the user chose.

**The scenes animate `translate`, not `transform`.** The work-field route
carries `transform: translateX(-50%)`; a stagger that wrote `transform` on the
grid's children moved it sideways during entry. The individual transform
properties compose, so `translate` and `scale` are what every scene uses.

**Fills got their own tokens.** In the light theme `primary-ink` was the text
blue, the button fill and the band, and that worked because one value can be
both on white. On near-black it cannot: the blue that reads as text is far too
light to carry a white label. `action`, `action-hover`, `band` and `band-copy`
split the roles; in the light theme they equal the old values, so nothing moved.

**Dark means black, not blue.** The user's brief: "dark black, blue and white;
blue and white for buttons, dark black for the background". Paper is `#0A0E13`,
the band a navy one step up, the buttons a mid blue that holds a white label at
5:1. The whiteboard grid stays in both themes so the dark theme reads as the
same board with the lights off.

**The theme is the one thing stored in the browser.** `localStorage`, not a
cookie: a cookie reaches the server and tempts a per-request render. The privacy
page's "writes nothing to your browser's storage" was no longer true, so its
cookies section now says exactly what is kept and that it never leaves the
device. Check that copy before adding anything else that persists.

**The nav tabs are provisional.** `HEADER_NAV_ITEMS` defines the flat five-tab
bar with entries that point at registered routes and a home-page
anchor. The footer and sitemap still read the route registry. Replace the set
when the real information architecture is decided; do not grow it.

See also [[scroll-driven-reveals-are-blank-off-screen]],
[[two-brand-hues-with-a-role-split]] and
[[production-design-and-locale-architecture]].
