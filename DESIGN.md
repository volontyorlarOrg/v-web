---
name: Volontyorlar Marketing
description: An ivory notice set in ink — warm off-white paper, near-black type and fills, one muted blue in the accent's role, soft bordered cards, plainspoken, and the same page with the lights off.
colors:
  paper: "#FAF9F5"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  surface-sunk: "#F0EEE6"
  surface-soft: "#E9EEF2"
  ink: "#141413"
  ink-muted: "#5E5D59"
  ink-inverse: "#FAF9F5"
  border: "#E6E4DA"
  border-control: "#87867F"
  knockout: "#FAF9F5"
  brand: "#007FC2"
  primary: "#3B82B8"
  primary-ink: "#23608C"
  primary-deep: "#194A70"
  primary-muted: "#C5D8E8"
  action: "#141413"
  action-hover: "#30302E"
  band: "#141413"
  band-copy: "#B0AEA5"
  accent: "#2A6A9C"
  accent-ink: "#23608C"
  accent-soft: "#DDE8F1"
typography:
  display:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  body:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  full: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-wide: "32px"
  section-mobile: "96px"
  section-wide: "160px"
  container: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.knockout}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.border-control}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-inverse:
    backgroundColor: "{colors.knockout}"
    textColor: "{colors.band}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    padding: "24px"
  status-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.border-control}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
---

# Design System: Volontyorlar Marketing

## Overview

**Creative North Star: "An ivory notice"**

The site reads like a well-set notice on warm ivory paper: near-black ink for
the type and for the few solid things on the page — the primary button, the
traction band, the closing callout, the footer — white cards with a warm
hairline sitting on the ivory, and one blue doing every job an accent does. It
is confident without shouting, and credible enough for the schools, agencies,
and partner organisations Volontyorlar depends on, while staying young through
scale, directness, and plain language rather than through decoration.

The register is the one claude.com and claude.ai use — ivory ground, ink
fills, big regular-weight serif headings, pill buttons, soft bordered cards,
one accent hue — with blue standing where they put their terracotta. The blue
is derived from the brand's UN Blue and then calmed down: less saturated, a
touch deeper, so it sits on ivory instead of vibrating against it. The mark
itself keeps its documented brand value.

After dark the paper turns near-black. The dark theme is the same page with the
lights off, not a second design: warm-grey surfaces a step above the ground,
ivory type, the blue lifted for contrast, and the primary button inverted to
ivory so it still reads as the solid thing on the page. Nothing gains a glow.

This direction retires the whiteboard: the dot grid and the radial wash are
gone, the ground is flat, the second hue is gone, and the rule against bordered
cards is reversed where a card helps a reader hold one thing at a time.

**Key characteristics**

- A flat ivory ground, white cards with a warm hairline, dark ink type, one
  muted blue, and a near-black page for the dark theme.
- A serif display face set at regular weight with calm, generous leading, over
  a humanist sans for everything a reader has to work through.
- Ink fills for the things that carry weight: the primary button, the traction
  band, the closing callout, the footer. Ivory type sits on them, with a blue
  hairline as the one mark.
- Entry scenes: headings rise out of a mask word by word, blocks follow, once,
  as a section comes into view.
- Oversized tabular numerals in ivory on an ink evidence band.
- Muted uppercase eyebrows led by a short blue rule.
- Provisional material labelled in words, never by colour alone.

## Two faces

The display face is a serif — **Source Serif 4**, set at weight **400**, never
bold. Weight is not how a heading earns its presence here; size, calm leading
and the space around it are. Setting it bold undoes the whole register and is
the single easiest way to make this page look like something else.

`h1` and `h2` take the serif from the base layer, so a heading is serif by
default and nothing has to remember. Everything else — leads, body, labels,
navigation, buttons, step titles, card titles — stays in Onest. A serif used
below about 1.25rem in this pairing reads as a mistake rather than a choice.

The serif carries Cyrillic and the Uzbek turned comma `ʻ` (U+02BB), which is not
optional: a display face that cannot set `Fargʻona` or `Волонтёрство` is
unusable here whatever it looks like in English.

Numbers keep `font-variant-numeric: tabular-nums`, and the large ones are set in
the serif too, which is what makes a figure read as evidence rather than as UI.

## Colors

Ivory, ink, and one blue, plus the neutrals needed to hold them. Values and
their contrast ratios are in `docs/brand/BRAND_ASSETS.md`; this section is
about which one to reach for.

### Ivory and ink

- **Paper `#FAF9F5`** — the page ground. Warm, slightly off-white, flat.
- **Surface `#FFFFFF`** — cards and panels on the paper. **Surface Raised** is
  the same white in the light theme and a step lighter than Surface in the
  dark; menus and popovers use it.
- **Surface Sunk `#F0EEE6`** — alternating section bands, hover fills.
- **Surface Soft `#E9EEF2`** — the one cool-tinted band.
- **Ink `#141413` / Ink Muted `#5E5D59`** — primary and secondary copy, and
  the fill of anything that carries weight.
- **Ink Inverse `#FAF9F5`** — the label on an ink fill. It is Paper's value in
  the light theme and Ink's in the dark, which is what lets the primary button
  invert with the theme.
- **Knockout `#FAF9F5`** — ivory-white type on the band and on the blue fill,
  and the ivory button on the band. It does not change with the theme.
- **Border `#E6E4DA` / Border Control `#87867F`** — the warm hairline around
  cards and between rows, and the heavier 3:1 boundary that interactive
  controls need.

### The blue

One hue, five values, each with a job.

- **Brand `#007FC2`** — the mark, and nothing else. This is the delivered UN
  Blue and it is pinned in both themes; the mark is the one thing on the page
  that does not take the calmer register.
- **Primary `#3B82B8`** — the graphics blue: rails, step nodes, the eyebrow
  rule, the hero map's plate, the hairline on an ink band. Clears 3:1 on every
  surface and stays under 4.5:1 on paper, so it is never body text.
- **Primary Ink `#23608C`** — the text blue: links, the active tab, the
  region chip's label, small numbers, the focus ring. `accent-ink` carries the
  same value; the two names describe the same colour from two directions.
- **Primary Deep `#194A70`** — the hover state under a blue fill, and the label
  on the inverse button's hover.
- **Primary Muted `#C5D8E8`** — the light blue: the inverse button's hover and
  the hero map's tile sides.

### The accent

- **Accent `#2A6A9C`** — the blue *fill*. It is the one "join" or "apply"
  action on a screen: the hero's call to action, the header's join button, the
  application link on `/volunteering`. A knockout label sits on it at 5.5:1.
- **Accent Soft `#DDE8F1`** — the blue tint behind a selected or highlighted
  thing: the active navigation tab, the active language, the rotating region
  chip in the hero.
- **Accent Ink** — the text-safe blue, the same value as Primary Ink.

### Fills

- **Action / Action Hover** — the primary button and its hover. Light: Ink and
  a step lighter. Dark: Paper's ivory and a step darker, because a near-black
  button on a near-black page is not a button. Its label is always
  `ink-inverse`.
- **Band / Band Copy** — the ink band under the traction figures, the closing
  callout, the footer, and the secondary copy on them. Light: Ink and a warm
  grey. Dark: a warm grey a step above the page ground, with the same copy
  colour.

### Dark theme

One token set, two values. `src/app/globals.css` declares the light value of
every token in `@theme` and overrides the ones that change under
`:root[data-theme="dark"]`. The attribute is set before first paint by a boot
script that reads the stored choice, or the system preference when there is
none; the switch in the header writes it and stores it.

| Token | Dark value | Why |
| --- | --- | --- |
| paper | `#141413` | Near-black with a warm cast; the lights off, not navy |
| surface / surface-raised / surface-sunk / surface-soft | `#1F1E1D` / `#262624` / `#1A1918` / `#1B2129` | Card, menu, sunk band and the cool band, each a step apart |
| ink / ink-muted | `#FAF9F5` / `#B0AEA5` | Ivory type, 17.5:1 and 8.3:1 on paper |
| ink-inverse | `#141413` | The label on the ivory button |
| border / border-control | `#2C2C2A` / `#6F6E68` | Warm hairline, and 3.6:1 for controls |
| primary / primary-ink | `#6FA3D2` / `#8FC1E8` | The blue lifted so graphics and text both read on black |
| primary-deep / primary-muted | `#153A5A` / `#A9C7E0` | Inverse-button hover pairing, 6.7:1 |
| action / action-hover | `#FAF9F5` / `#E8E6DC` | The primary button inverts to ivory |
| band | `#1F1E1D` | A step above the ground; the blue hairline marks its edge |
| accent / accent-ink / accent-soft | `#2F6EA0` / `#8FC1E8` / `#1C2C3C` | Fill with a knockout label at 5.2:1, text blue, and the tint |

Brand, knockout, and band-copy keep one value in both themes.
`src/app/design-tokens.test.ts` runs the same contrast contract against both
blocks.

### Named rules

**One Hue.** Blue is the only colour that is not ivory, ink, or a grey between
them. It does everything an accent does — the mark beside a label, a link, a
rail, a node, the one filled action on a screen — and nothing else does any of
it. The test asserts that every blue token, in both themes, has a hue between
195° and 225°, and that every neutral is warm. A second hue is a decision, not
a class name.

**Ink Carries Weight.** The solid things on the page are ink: the primary
button, the traction band, the closing callout, the footer. A blue fill is
rationed to the one join or apply action a screen has. If two things on a
screen want to be filled blue, one of them is wrong.

**The Graphics-and-Text Rule.** The blue has a graphics value and a text
value. `primary` and `brand` clear 3:1 and stay under 4.5:1 on paper, so they
are for the mark, rails, and marks 24px and above; words at body size use
`primary-ink`. A label on a fill uses `ink-inverse` on `action` and `knockout`
on `accent` or `band`, never `ink` or `paper` directly: in the dark theme the
button inverts and the band does not, and a component that reaches for the
wrong one breaks the moment the lights go off.

**The Mark Keeps Its Blue.** `brand` is `#007FC2` in both themes and is used
only by the mark. Every other blue on the page is the calmer derived family.

**No Red.** The palette defines none. A destructive or deadline colour must be
specified against the blue and the ink, not improvised.

`src/app/design-tokens.test.ts` enforces every rule above.

## Typography

**Two families,** both self-hosted through `next/font` with Latin, Latin
Extended, and Cyrillic subsets: **Source Serif 4** for display, **Onest** for
everything else. See [Two faces](#two-faces) for why, and for the rule that the
serif is never set bold.

**Character:** both faces carry Russian Cyrillic and U+02BB, the turned comma
Uzbek needs in *oʻ* and *gʻ*. Onest is the face the delivered logo specification
verified; the serif was checked against the same two requirements before it was
adopted, because a display face that cannot set `Fargʻona` is unusable here.

### Hierarchy

- **Display** (serif 400, fluid to 4.75rem, 1.08 line-height, −0.02em): one
  direct human idea per page, never a feature list.
- **Headline** (serif 400, fluid to 3.25rem, 1.16 line-height): section ideas.
- **Title** (sans 600, 1.375rem): cards, steps, and legal sections.
- **Lead** (sans 400, fluid to 1.375rem): the sentence under a headline.
- **Body** (sans 400, 1rem, 1.65 line-height): explanation; measure stays under
  about 42rem.
- **Label** (sans 600, 0.75rem, 0.12em, uppercase, `ink-muted`): eyebrows and
  metadata, preceded by a 24px blue rule.

The leading is looser and the tracking lighter than they were on the
whiteboard. A display line at 1.02 with −0.028em read as urgent; at 1.08 with
−0.02em it reads as calm, which is the register.

### Named rule

**The Plainspoken Display Rule.** Display type says something a sixteen-year-old
would say out loud. Russian and Uzbek run longer than English, so every display
line is checked at 360px in all three languages.

## Layout

Mobile first. Content sits in a 76rem container with 20px gutters, 32px from the
small breakpoint. Sections use 96px of vertical rhythm on mobile, 128px from
the small breakpoint and 160px on wide screens, and each one owns a single idea.

Section boundaries are tone changes — paper, sunk, soft, and the ink band —
with a hairline border between them. Asymmetric two-column compositions
collapse to a single column below the large breakpoint in reading order.

**The One Idea Per Band Rule.** A band explains one thing: what we do, how it
works, who we work with, where we are going, or what is being prepared.

## Elevation & depth

Flat. Hierarchy comes from surface tone and one-pixel warm borders. A card is a
white surface with a hairline sitting on the ivory; it does not cast a shadow.
There is one shadow in the system, a whisper under floating menus and the open
mobile navigation panel, because they float over content.

The ground is flat paper. There is no grid, no wash, and no gradient anywhere
in the system; `body` paints `paper` and nothing else, and the token test
asserts that. Paper sections are transparent so the ground shows through;
sunk, soft and band sections are solid tone changes over it. The header stays
solid paper so it reads as a bar.

## Shapes

Actions and chips are full-radius pills. Everything else is generously
rounded: 8px small controls, 12px inputs, 16px inner surfaces, 24px cards and
panels, 32px on the closing callout. Circles belong to the mark's dot and to
the step nodes. Borders are thin and quiet.

## Components

### Buttons

- **Shape:** full radius, 44px minimum height in navigation and 52px for page
  actions.
- **Primary:** solid Action with an Ink Inverse label, shifting to Action
  Hover. Ink in the light theme, ivory in the dark.
- **Accent:** solid Accent with a knockout label, hovering to Primary Deep.
  One per screen: the join or apply action.
- **Outline:** transparent with a Border Control edge; on hover it fills with
  ink and takes the Ink Inverse label.
- **Ghost:** Primary Ink text with an Accent Soft hover; a link that needs a
  target.
- **Inverse:** knockout with a Band label, on the band; hovers to Primary Muted
  with Primary Deep text, which holds in both themes.
- **Focus:** a 3px Primary Ink outline at 3px offset, everywhere, from the base
  layer.

### Cards

A white surface, a one-pixel `border` hairline, 24px radius, 24px padding.
Cards are for fixed groups a reader holds one at a time: the six
responsibilities in `WorkField`, the partner and source names in `NameBoard`,
the two founders, the three audiences on `/contact`. Content inside a card is
type and rules, never a nested box. Lists whose length varies — the steps, the
story, a contact channel list — stay as hairline-ruled rows, because an empty
cell in a card grid looks like a fault.

### Stat band

Figures are ivory on a full-width ink band with a Primary hairline above each
figure and along the band's top edge, and supporting labels in Band Copy. The
band makes the organisation's verified traction read as one instrument on the
home and about pages.

### Step rail

Four numbered steps on a continuous hairline, vertical on mobile and horizontal
from the large breakpoint. The first three nodes are blue — the work
Volontyorlar does. The fourth is ink, because it is the step the volunteer
performs: the same ink that signs everything else on the page, not the
institution's blue. The rail is decorative; the ordered list carries the
meaning, and the step titles say who acts, so the colour reinforces rather than
carries it.

### Status chip

A dashed-border, uppercase pill for material that is planned rather than live,
such as the separate application. Meaning is in the words; the dashed edge only
reinforces it.

### Navigation

A 64px bar on mobile and 80px from the large breakpoint: mark plus organisation
name, the tabs, a compact utility cluster, and one action. The tabs come from
`HEADER_NAV_ITEMS` in `src/lib/content/nav-tabs.ts`, a provisional set that points
at registered routes and home-page anchors until the real information
architecture lands; the active tab is a pill in Accent Soft with Primary Ink
text, marked with `aria-current`. The utility cluster is two 40px pills: the
language code, which opens a native-name list without leaving the current
route, and the theme switch, a labelled `switch` that toggles `data-theme` and
remembers the choice. The join action is the Accent button. Below the large
breakpoint the tabs move into their own panel that closes on Escape and on
selection.

### Footer

The footer is the last ink band on the page: a Primary hairline along its top,
the inverse lockup, Band Copy for the description and the links, ivory for the
column headings, and the Telegram action as the inverse button. In the dark
theme it is a warm grey a step above the ground.

## Surfaces and components

Cards return where they help. A fixed group of related things — the
responsibilities, the partner names, the founders, the audiences — is a grid of
white bordered cards on the ivory, with type and a rule inside each and nothing
nested. The home page's "what we do" grid keeps its central fieldwork route:
one line connects the six cards, with paired cards facing it from either side
on wide screens and a short connector from each card's edge to the route.

Lists whose length varies use separated ruled rows: the steps, the story on
`/about`, the contact channels, the responsibilities on `/volunteering`.

Actions are full-radius pills. They shift background on hover and take a small
scale-down on press; nothing lifts, because a shadowless page has nothing for a
lifted element to cast onto.

The evidence strip, the closing call to action and the footer use ink for
different purposes: the strip groups verified traction edge to edge, the
closing action is a rounded panel inside a paper section, and the footer closes
the page. Their shared ink makes them the page's weight; composition keeps them
distinct, and a Primary hairline marks each one.

## Motion

Every section has an entry scene, and it plays once. As a block reaches the
lower 88% of the viewport, its heading rises out of a mask word by word, its
eyebrow and lead follow, list items arrive one after another, and hairlines
draw in from the left. The two heroes do the same on load without waiting for
JavaScript. The curve is one ease (`--ease-scene`), the durations sit around a
second, and a word stagger is 45ms. Nothing scrubs with the scroll position
except the devices named below; an entry is time-based, like a curtain going
up, not a slider.

Scrolling itself is smoothed by `lenis`, so the scenes and the map play against
an eased scroll rather than a stepped one. Touch keeps native momentum.

The scenes clear the bar the site has always set: correct and complete at rest.
The hidden state exists only under `html[data-motion]`, which the boot script
sets when the visitor has not asked for reduced motion, and only until the
scene is marked entered. Without JavaScript, under reduced motion, and in print
every word, block and rule is simply there. The trade the old scroll reveals
made — blank sections in a full-page capture — is now confined to captures
taken with motion on and no scrolling, which is the same trade the reference
sites make.

The home page's region map is the one scroll-driven surface, and it is allowed
only because it does not take that trade. Nothing is revealed by scrolling: the
finished plan-view map is server-rendered and visible before any script runs, so
a document that never scrolls still captures a complete section. Scrolling
opens a rule-led shutter into the map and changes its viewing angle; it does not
bring the map into existence. Under `prefers-reduced-motion` the map holds one
frame at its final state. Its palette is read from the tokens — Primary for
the plate, Surface Raised for the tiles, Primary Muted for their sides,
Primary Ink for the markers — so it retunes with the theme.

Anything else that wants to animate on scroll has to clear the same bar: correct
and complete at rest, better in motion. If it is blank until scrolled, it does
not ship.

### Ambient backdrops

The page's middle breathes on a two-section rhythm: the "what we do" band carries
the fieldwork route through its cards, while "opportunity sources" carries an
ambient channels backdrop. Repeating either device on every section would turn
it into wallpaper.

Two rules keep them honest.

**A backdrop depicts the organisation's own object or it does not exist.** Not
ambient shapes, not a gradient mesh: the channels opportunities arrive through.
A reader who looks straight at one should recognise what it is.

**They loop, they do not arrive.** Every backdrop is an infinite CSS animation
with a negative delay, so it is already mid-motion on the first frame and a
document that never scrolls still captures it. Nothing about them is a reveal.
They are `aria-hidden`, sit at `-z-10`, and carry no information that is not also
in the text above them.

Ceiling: 16% ink at the strongest, and the moving part is never the loudest
thing in the band.

## Brand usage

The mark is used at 32px in the header and 48px on the 404 page, always above
its documented 16px minimum, never cropped or recoloured in parts, and always
in `brand` — the delivered `#007FC2` — or knockout on the footer band. Large
decorative shapes use the arc alone, which is a derived graphic device rather
than the logo, and take the derived blue. The organisation name is set as real
HTML text next to the mark instead of using the delivered SVG lockup, whose
wordmark cannot load its typeface. See `docs/brand/BRAND_ASSETS.md`.

## Do's and don'ts

### Do

- **Do** carry hierarchy with surface tone, warm hairlines and cards before
  anything else.
- **Do** keep ink for weight and blue for the accent's jobs: marks, links,
  rails, the one filled action.
- **Do** use `primary-ink` whenever the blue carries words at body size.
- **Do** set every number in tabular figures.
- **Do** put a label on a fill with the fill's own token pair: `ink-inverse`
  on `action`, `knockout` on `accent` and `band`.
- **Do** label anything that is planned, in preparation, or not yet published.
- **Do** check display lines at 360px in Uzbek, Russian, and English.
- **Do** check every surface in both themes; a token that only has a light value
  is a decision, not an oversight, and should read as one.

### Don't

- **Don't** use gradients, glassmorphism, ambient shadows, or glow; the ground
  is flat paper and the one shadow is under a floating menu.
- **Don't** fill two things on one screen with the accent blue.
- **Don't** hide anything that is not visible again without JavaScript.
- **Don't** introduce a second hue, or reach for a red; the palette defines
  neither.
- **Don't** put a literal hex value in a component.
- **Don't** use `brand` for anything but the mark, or `primary` for words.
- **Don't** claim live opportunities, active authentication, or partners that
  are not in `PRODUCT.md`.
- **Don't** render the mark below 16px or crop it for decoration.
