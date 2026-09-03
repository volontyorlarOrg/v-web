---
name: Volontyorlar Marketing
description: A civic whiteboard — blue for the institution, orange for the person, plainspoken, light enough for a phone on mobile data, and the same board after dark.
colors:
  paper: "#F5F8FB"
  surface: "#FFFFFF"
  surface-sunk: "#ECF1F5"
  surface-soft: "#E7F1F9"
  ink: "#222B33"
  ink-muted: "#566270"
  border: "#DBE3EA"
  border-control: "#85909A"
  primary: "#007FC2"
  primary-ink: "#005E92"
  primary-deep: "#004A73"
  primary-muted: "#BFDCEF"
  action: "#005E92"
  action-hover: "#004A73"
  band: "#005E92"
  band-copy: "#BFDCEF"
  accent: "#E85D30"
  accent-ink: "#B34917"
  knockout: "#FFFFFF"
typography:
  display:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 6.6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Source Serif 4, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 4.4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.024em"
  title:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.008em"
  body:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  2xl: "28px"
  full: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-wide: "32px"
  section-mobile: "96px"
  section-wide: "128px"
  container: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.knockout}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
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
    textColor: "{colors.action}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "24px"
  status-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.border-control}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
---

# Design System: Volontyorlar Marketing

## Overview

**Creative North Star: "Public whiteboard"**

The site reads like a well-set civic notice pinned to a whiteboard: cool
blue-white paper with a faint dot grid, dark ink, hairline rules doing the
structural work, and two brand colours with a job each. Blue is the institution
— navigation, structure, the mark. Orange is the person, and it appears only
where a person did something. It is confident without shouting, and credible
enough for the schools, agencies, and partner organisations Volontyorlar depends
on, while staying young through scale, directness, and plain language rather
than through decoration.

After dark the board turns near-black. The dark theme is the same page with the
lights off, not a second design: blue and white carry the actions, the grid
stays, and nothing gains a glow.

This direction consolidates the three retired explorations: V1's poster
confidence in typographic scale and solid bands, V2's evidence discipline —
tabular figures, labelled facts, nothing unaccounted for — and V3's mobile-first
composition, honest labelling of what is not yet real, and restraint about
motion. It drops V1's yellow, V2's serif register, and V3's dark teal field,
none of which survive contact with the delivered UN Blue brand set.

**Key characteristics**

- A cool whiteboard ground with a faint blue dot grid, dark ink type, two brand
  hues that never touch, and a near-black board for the dark theme.
- A serif display face set at regular weight with tight negative tracking, over a
  humanist sans for everything a reader has to work through.
- Hairline rules and tone bands instead of shadows, gradients and card borders.
- Entry scenes: headings rise out of a mask word by word, blocks follow, once,
  as a section comes into view.
- Oversized tabular numerals in knockout white on a blue evidence band.
- A rule-led label system that never uses the logo below its minimum size.
- Provisional material labelled in words, never by colour alone.

## Two faces

The display face is a serif — **Source Serif 4**, set at weight **400**, never
bold. Weight is not how a heading earns its presence here; size, tight tracking
and the space around it are. Setting it bold undoes the whole register and is the
single easiest way to make this page look like something else.

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

Two brand hues plus the neutrals needed to hold them. Values and their contrast
ratios are in `docs/brand/BRAND_ASSETS.md`; this section is about which one to
reach for.

### Blue — the platform

- **Primary `#007FC2`** — the mark, decorative arcs, step nodes. Graphics and
  type at 24px and above only.
- **Primary Ink `#005E92`** — links, small labels, solid action fills, and the
  focus ring. This is the token that carries text-sized blue.
- **Primary Deep `#004A73`** — hover state on solid actions. Derived here, not
  from the specification.
- **Primary Muted `#BFDCEF`** — secondary copy on a blue band.

### Orange — the volunteer

- **Accent `#E85D30`** — the volunteer's step node. Graphics at 24px and above
  only.
- **Accent Ink `#B34917`** — the label attached to an orange moment, and any
  future knockout label on a solid orange fill.

### Fills

- **Action / Action Hover** — the solid button and its hover. Light: the same
  values as Primary Ink and Primary Deep. Dark: a mid blue that still holds a
  white label at 4.5:1, because the blue that reads as text on near-black is far
  too light to carry one.
- **Band / Band Copy** — the solid band under the traction figures and the
  closing panel, and the secondary copy on it. Light: Primary Ink and Primary
  Muted. Dark: a navy a step above the page ground, with light-blue copy.

### Neutral

- **Paper** — the page ground: a cool blue-white in the light theme, near-black
  in the dark. The whiteboard grid is painted over it.
- **Surface** — raised content and controls that need separation from paper.
- **Surface Sunk** — alternating section bands.
- **Surface Soft** — the one blue-tinted band.
- **Ink / Ink Muted** — primary and secondary copy.
- **Border / Border Control** — hairlines, and the heavier 3:1 boundary that
  interactive controls need.
- **Knockout** — white, on blue, orange, or ink.

### Dark theme

One token set, two values. `src/app/globals.css` declares the light value of
every token in `@theme` and overrides the ones that change under
`:root[data-theme="dark"]`. The attribute is set before first paint by a boot
script that reads the stored choice, or the system preference when there is
none; the switch in the header writes it and stores it.

| Token | Dark value | Why |
| --- | --- | --- |
| paper | `#0A0E13` | Near-black with a cool cast; "dark black", not navy |
| surface / surface-sunk / surface-soft | `#131920` / `#0E1319` / `#0F1B28` | Raised, sunk, and blue-tinted, a step apart |
| ink / ink-muted | `#EDF1F5` / `#A6B1BD` | 17:1 and 9:1 on paper |
| border / border-control | `#1F2833` / `#5B6774` | Hairline, and 3.3:1 for controls |
| primary / primary-ink | `#3AA0E4` / `#6FBFF2` | Graphics blue and text blue, both legible on black |
| primary-deep / primary-muted | `#0B3D63` / `#9ECDEC` | Inverse-button hover pairing, 6.7:1 |
| action / action-hover | `#0E6FB2` / `#1178BF` | White labels at 5.3:1 and 4.7:1 |
| band / band-copy | `#0D1E31` / `#A9CFEA` | Navy band, 10:1 copy |
| accent-ink | `#F08A55` | 7.8:1 on paper; `accent` itself is unchanged |

`src/app/design-tokens.test.ts` runs the same contrast contract against both
blocks. The one rule it does not repeat in the dark is the negative one on the
graphics hues, which exists to keep the delivered brand values from being used
as text; on a black ground those values happen to pass, and that is fine.

### Named rules

**The Role Split.** Blue is the institution, orange is the person. Navigation,
structure, primary actions, and the mark are blue. A confirmed hour, a level
reached, a thank-you, a number that counts what people did — orange. Anything
that is not clearly one of those is blue. Rationing the orange is what keeps it
meaning something.

**The Graphics-and-Text Rule.** Each hue has two values. `#007FC2` and
`#E85D30` are graphics; `#005E92` and `#B34917` are text. If an element carries
words at body size it uses the `-ink` value. A knockout label sits on `action`
or `band`, never on `primary-ink` directly: in the light theme they are the same
colour, in the dark theme they are not, and a component that reaches for
`primary-ink` as a fill breaks the moment the lights go off.

**The Hues Never Touch.** Blue and orange are 1.25:1 apart. No two-colour mark,
no orange on blue, no blue on orange. This is why the regions band keeps white
figures on blue even though 500+ applications is exactly the kind of number
orange would otherwise claim.

**No Red.** The palette defines none. `#B3261E` was removed because it is
1.21:1 against Accent Ink. A destructive or deadline colour must be specified,
not improvised.

`src/app/design-tokens.test.ts` enforces every rule above, including the
negative assertions.

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

- **Display** (serif 400, fluid to 5rem, 1.02 line-height): one direct human idea
  per page, never a feature list.
- **Headline** (serif 400, fluid to 3.25rem): section ideas.
- **Title** (sans 600, 1.375rem): cards, steps, and legal sections.
- **Lead** (sans 400, fluid to 1.375rem): the sentence under a headline.
- **Body** (sans 400, 1rem, 1.65 line-height): explanation; measure stays under
  about 42rem.
- **Label** (sans 600, 0.75rem, 0.14em, uppercase): eyebrows and metadata,
  preceded by a 24px rule.

### Named rule

**The Plainspoken Display Rule.** Display type says something a sixteen-year-old
would say out loud. Russian and Uzbek run longer than English, so every display
line is checked at 360px in all three languages.

## Layout

Mobile first. Content sits in a 76rem container with 20px gutters, 32px from the
small breakpoint. Sections use 80px of vertical rhythm on mobile and 112px on
wider screens, and each one owns a single idea.

Section boundaries are tone changes — paper, sunk, soft, and one solid blue
callout — with a hairline border between them. Asymmetric two-column
compositions collapse to a single column below the large breakpoint in reading
order.

**The One Idea Per Band Rule.** A band explains one thing: what we do, how it
works, who we work with, where we are going, or what is being prepared.

## Elevation & depth

Flat. Hierarchy comes from surface tone and one-pixel borders. There is one
shadow in the system, under the open mobile navigation panel, because it floats
over content. No card, button, or band carries a shadow.

The ground itself is the whiteboard: `body` paints a 28px dot grid in blue at
16% (22% in the dark) and one soft blue wash at the top of the document. Paper
sections are transparent so the board shows through; sunk, soft and band
sections are solid tone changes over it. The header stays solid paper so it
reads as a bar. This is the one gradient in the system and it depicts the
board, not a mood.

## Shapes

Actions and chips are full-radius pills. Everything else grows with scale: 10px
small controls, 14px inner surfaces, 20px larger panels, 28px on the closing
callout. Circles belong to the mark's dot and to the step nodes. Borders are thin
and quiet, and most groupings use a hairline rule instead of a border.

## Components

### Buttons

- **Shape:** full radius, 44px minimum height in navigation and 52px for page
  actions.
- **Primary:** solid Action with white label, shifting to Action Hover.
- **Outline:** transparent with a Border Control edge that turns blue on hover.
- **Inverse:** white with an Action label, on the band; hovers to Primary Muted
  with Primary Deep text, which holds in both themes.
- **Focus:** a 3px Primary Ink outline at 3px offset, everywhere, from the base
  layer.

### Stat grid

Figures are knockout white on a full-width blue evidence band, with supporting
labels in Band Copy and a Primary hairline above each figure. The band makes the
organisation's verified traction read as one instrument on the home and about
pages. Orange is not used here because the brand hues cannot touch; it remains
reserved for the volunteer's own step in the process rail.

### Hairline grids

Fixed groups use aligned columns and individual hairlines rather than boxed
cards. Lists whose length varies use separated ruled rows, because an empty
cell in a gap-filled grid looks like a fault.

### Step rail

Four numbered steps on a continuous hairline, vertical on mobile and horizontal
from the large breakpoint. The first three nodes are blue — the work Volontyorlar does.
The fourth is orange, because it is the step the volunteer performs. That single
node is the clearest statement of the role split anywhere on the site. The rail
is decorative; the ordered list carries the meaning, and the step titles say who
acts, so the colour reinforces rather than carries it.

### Status chip

A dashed-border, uppercase label for material that is planned rather than live,
such as the separate application. Meaning is in the words; the dashed edge only
reinforces it.

### Navigation

A 64px bar on mobile and 80px from the large breakpoint: mark plus organisation
name, the tabs, a compact utility cluster, and one action. The tabs come from
`HEADER_NAV_ITEMS` in `src/lib/content/nav-tabs.ts`, a provisional set that points
at registered routes and home-page anchors until the real information
architecture lands; the active tab is marked with `aria-current`. The utility
cluster is two 40px pills: the language code, which opens a native-name list
without leaving the current route, and the theme switch, a labelled `switch`
that toggles `data-theme` and remembers the choice. Below the large breakpoint
the tabs move into their own panel that closes on Escape and on selection.

## Surfaces and components

Cards do not have borders. A group of related things is separated by a hairline
rule above each item and a generous gap, not by a box: the boxed grid reads as a
table, and a table is the wrong register for six sentences about what an
organisation does. `StatGrid` and `NameBoard` use the same rule-and-space
treatment. The home page's "what we do" list keeps those hairlines but joins
them to a central fieldwork route: one line connects the six responsibilities,
with paired items facing it from either side on wide screens.

Actions are full-radius pills. They shift background on hover and take a small
scale-down on press; nothing lifts, because a shadowless page has nothing for a
lifted element to cast onto.

The evidence strip and closing call to action use solid blue for different
purposes: the strip groups verified traction edge to edge, while the closing
action is a rounded panel inside a paper section. Their shared hue makes them
institutional; composition keeps them distinct.

## Motion

Every section has an entry scene, and it plays once. As a block reaches the
lower 88% of the viewport, its heading rises out of a mask word by word, its
eyebrow and lead follow, list items arrive one after another, and hairlines
draw in from the left. The two heroes do the same on load without waiting for
JavaScript. The curve is one ease (`--ease-scene`), the durations sit around a
second, and a word stagger is 45ms. Nothing scrubs with the scroll position
except the devices named below; an entry is time-based, like a curtain going
up, not a slider.

The footer signature is the one scene that waits for the reader to arrive: the
wordmark writes itself, the head pops and the two hands go up only once the
whole band is on screen, which for the last band on the page means the bottom.

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
frame at its final state.

Anything else that wants to animate on scroll has to clear the same bar: correct
and complete at rest, better in motion. If it is blank until scrolled, it does
not ship.

### Ambient backdrops

The page's middle breathes on a two-section rhythm: the "what we do" band carries
the fieldwork route through its content, while "opportunity sources" carries an
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
its documented 16px minimum, never cropped or recoloured in parts. Large
decorative shapes use the arc alone, which is a derived graphic device rather
than the logo. The organisation name is set as real HTML text next to the mark
instead of using the delivered SVG lockup, whose wordmark cannot load its
typeface. See `docs/brand/BRAND_ASSETS.md`.

## Do's and don'ts

### Do

- **Do** carry hierarchy with surface tone and hairlines before anything else.
- **Do** keep blue for structure and orange for what a person did.
- **Do** use the `-ink` value whenever a hue carries words at body size.
- **Do** set every number in tabular figures.
- **Do** reserve orange for a person's own action; evidence bands stay blue and
  use knockout figures.
- **Do** label anything that is planned, in preparation, or not yet published.
- **Do** check display lines at 360px in Uzbek, Russian, and English.
- **Do** check every surface in both themes; a token that only has a light value
  is a decision, not an oversight, and should read as one.

### Don't

- **Don't** use gradients, glassmorphism, ambient shadows, or glow; the
  whiteboard wash is the one gradient and it is the ground, not an effect.
- **Don't** fill a button or a band with `primary-ink`; use `action` or `band`.
- **Don't** hide anything that is not visible again without JavaScript.
- **Don't** combine blue and orange in one element, or introduce a third hue.
- **Don't** reach for a red; the palette defines none.
- **Don't** put a literal hex value in a component.
- **Don't** claim live opportunities, active authentication, or partners that
  are not in `PRODUCT.md`.
- **Don't** render the mark below 16px or crop it for decoration.
