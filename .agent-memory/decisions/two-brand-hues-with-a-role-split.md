# Blue is the institution, orange is the person

The logo specification was updated to define a second brand colour. The site had
been built on a "single hue" rule, which the new spec contradicts, so the token
system, design system, and contrast test were reworked rather than patched.

- Blue `#007FC2` / `#005E92` — navigation, structure, primary actions, the mark.
- Orange `#E85D30` / `#B34917` — confirmations, achievement, and any number that
  counts what people did.

Each hue has a graphics value and a text value because neither reaches 4.5:1 on
white. Every claim in the spec was recomputed and matches exactly.

**The hues must never touch: 1.25:1.** In greyscale, one-colour print, or for a
viewer with colour vision deficiency they merge. `src/app/design-tokens.test.ts`
asserts every blue/orange pairing stays below 3:1, so the rule cannot be broken
quietly. It already bites once: the regions band keeps white figures on blue,
even though "500+ applications" is exactly the human number orange would claim.

Orange is applied in two places only — the traction figures and the fourth step
of the journey, the one the volunteer performs. Rationing it is the point.

**Removed `--color-destructive: #B3261E`.** It is 1.21:1 against orange deep,
so at a glance it is the same colour. There is now no red in the palette; a
destructive or deadline colour has to be specified against `#B34917`, not
improvised in a component.

Orange has real headroom only on white: 3.48:1 there, 3.33:1 on paper, and
3.02:1 on the sunk and soft bands. Orange figures go on white cards, and the
test asserts all four surfaces so a band-tone change fails loudly.

See also [[production-design-and-locale-architecture]].
