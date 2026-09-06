# Ivory paper, ink fills, one blue

The whiteboard direction — cool blue-white paper with a dot grid, blue for the
institution and orange for the person — was replaced by the register claude.com
and claude.ai use, with blue in the role their terracotta plays. This
supersedes `two-brand-hues-with-a-role-split.md`.

- **Paper `#FAF9F5`, ink `#141413`.** Warm off-white ground, flat, no grid and
  no wash. Near-black type, and near-black fills for the things that carry
  weight: the primary button, the traction band, the closing callout, the
  footer. Ivory type on them. The dark theme is `#141413` ground with warm-grey
  surfaces a step above it.
- **One hue.** Blue `#3B82B8` (graphics) / `#23608C` (text) / `#2A6A9C` (the
  one filled join or apply action) / `#DDE8F1` (the tint behind a selected
  thing), derived from the brand blue and desaturated so it sits on ivory.
  Orange left the palette entirely. The token test now asserts every blue token
  has a hue between 195° and 225° in both themes and every neutral is warm,
  replacing the old blue/orange pairing negatives.
- **The mark keeps `#007FC2`** through a `brand` token used by nothing else.
  Recolouring the mark into the derived blue would have quietly changed the
  logo.
- **Token names survived.** `action`, `band`, `accent`, `primary-*` and the rest
  keep their names so every component stayed themed; three names were added:
  `surface-raised` (menus), `ink-inverse` (the label on `action`) and
  `accent-soft` (the tint). `accent-ink` equals `primary-ink` in both themes —
  two names for one text blue.
- **The primary button inverts with the theme.** `action` is ink in the light
  theme and ivory in the dark, so its label is `ink-inverse` (Paper's value
  in the light, Ink's in the dark), never `knockout`. The band does not
  invert, so labels on it stay `knockout`. Every place that used `bg-action`
  with a white label was audited: the notification badge and the switch moved
  to `accent`, `::selection` to `accent`, the timeline node to `ink`.
- **Cards came back.** Fixed groups — the six responsibilities, partner names,
  founders, contact audiences, the app's panels — are white bordered cards
  with a 24px radius. Variable-length lists stay ruled rows.
- **The step rail's fourth node is ink,** not orange: the volunteer's step in
  the same ink that signs the page, against the institution's three blue nodes.

The app repository carries the same token set; its "the person's figures" —
stat tiles, the level rail, the accepted chip — moved from orange text to the
text blue and the blue fill, so a filled pill now means "achieved" and a tinted
one means "in progress".
