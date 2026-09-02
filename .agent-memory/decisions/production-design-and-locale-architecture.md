# The production consolidation: one design, three locales

The `/`, `/v1`, `/v2`, `/v3` explorations and the style switcher were replaced
by one production site. The reasoning, so it is not re-litigated:

**Design.** V1's poster confidence, V2's evidence discipline, and V3's
mobile-first honesty were kept; V1's yellow, V2's serif register, and V3's dark
teal field were dropped. None of the three palettes survives contact with the
delivered UN Blue brand set, and the earlier teal came from a JPEG screenshot of
a logo that has since been replaced. The production system is paper, ink, and
one blue. See `DESIGN.md`.

**Typeface.** Onest, one family, replaces Bricolage Grotesque and Manrope.
Bricolage has no Cyrillic subset, so it cannot set Russian headings at all —
that alone decided it. Onest also carries U+02BB, the turned comma Uzbek needs,
which `docs/brand/LOGO_SPEC.md` had already verified for the wordmark.

**Locales.** `next-intl` with `uz` default, `ru`, `en`, prefix always present,
no locale cookie, no `localStorage`. The i18next trio that was installed had
zero imports, so there was nothing to migrate. The cookie is disabled
deliberately: it keeps every response cacheable and lets the privacy page state
truthfully that the site stores nothing in the browser.

**Removed dependencies.** `next-themes`, `three`, `motion`,
`@radix-ui/react-accordion`, `tw-animate-css`, and the i18next trio all had zero
imports. The site ships one light theme, CSS-only motion, and native `details`
where disclosure is needed.

See also [[indexing-gated-on-verified-origin]] and
[[scroll-driven-reveals-are-blank-off-screen]].

**Revisited, September 2026.** "One light theme" and "no `localStorage`" no
longer hold in full: a dark theme now switches on `data-theme`, and the
visitor's choice is the one value kept in the browser. The language rule is
unchanged — the URL is still the only language state. See
[[entry-scenes-smooth-scroll-and-dark-theme]].
