---
name: YVC Marketing
description: A civic notice board — blue for the institution, orange for the person, plainspoken and light enough for a phone on mobile data.
colors:
  paper: "#FBFAF7"
  surface: "#FFFFFF"
  surface-sunk: "#F1EFE9"
  surface-soft: "#E7F1F8"
  ink: "#222B33"
  ink-muted: "#566270"
  border: "#E3E0D8"
  border-control: "#949084"
  primary: "#007FC2"
  primary-ink: "#005E92"
  primary-deep: "#004A73"
  primary-muted: "#BFDCEF"
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
    backgroundColor: "{colors.primary-ink}"
    textColor: "{colors.knockout}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
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
    textColor: "{colors.primary-ink}"
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

# Design System: YVC Marketing

## Overview

**Creative North Star: "Public notice board"**

The site reads like a well-set civic notice: warm paper, dark ink, hairline
rules doing the structural work, and two brand colours with a job each. Blue is
the institution — navigation, structure, the mark. Orange is the person, and it
appears only where a person did something. It is confident without shouting, and
credible enough for the schools, agencies, and partner organisations YVC depends
on, while staying young through scale, directness, and plain language rather
than through decoration.

This direction consolidates the three retired explorations: V1's poster
confidence in typographic scale and solid bands, V2's evidence discipline —
tabular figures, labelled facts, nothing unaccounted for — and V3's mobile-first
composition, honest labelling of what is not yet real, and restraint about
motion. It drops V1's yellow, V2's serif register, and V3's dark teal field,
none of which survive contact with the delivered UN Blue brand set.

**Key characteristics**

- Warm paper ground, dark ink type, two brand hues that never touch.
- A serif display face set at regular weight with tight negative tracking, over a
  humanist sans for everything a reader has to work through.
- Hairline rules and tone bands instead of shadows, gradients and card borders.
- Oversized tabular numerals in orange carrying the human evidence.
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

- **Accent `#E85D30`** — traction figures and the volunteer's step node.
  Graphics and figures at 24px and above only.
- **Accent Ink `#B34917`** — the label attached to an orange moment, and any
  future knockout label on a solid orange fill.

### Neutral

- **Paper** — the page ground.
- **Surface** — cards and raised content, and the only ground orange figures
  sit on.
- **Surface Sunk** — alternating section bands.
- **Surface Soft** — the one blue-tinted band.
- **Ink / Ink Muted** — primary and secondary copy.
- **Border / Border Control** — hairlines, and the heavier 3:1 boundary that
  interactive controls need.
- **Knockout** — white, on blue, orange, or ink.

### Named rules

**The Role Split.** Blue is the institution, orange is the person. Navigation,
structure, primary actions, and the mark are blue. A confirmed hour, a level
reached, a thank-you, a number that counts what people did — orange. Anything
that is not clearly one of those is blue. Rationing the orange is what keeps it
meaning something.

**The Graphics-and-Text Rule.** Each hue has two values. `#007FC2` and
`#E85D30` are graphics; `#005E92` and `#B34917` are text. If an element carries
words at body size, or a knockout label on a solid fill, it uses the `-ink`
value.

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

## Shapes

Actions and chips are full-radius pills. Everything else grows with scale: 10px
small controls, 14px inner surfaces, 20px larger panels, 28px on the closing
callout. Circles belong to the mark's dot and to the step nodes. Borders are thin
and quiet, and most groupings use a hairline rule instead of a border.

## Components

### Buttons

- **Shape:** full radius, 44px minimum height in navigation and 52px for page
  actions.
- **Primary:** solid Primary Ink with white label, darkening on hover.
- **Outline:** transparent with a Border Control edge that turns blue on hover.
- **Inverse:** white on the blue callout.
- **Focus:** a 3px Primary Ink outline at 3px offset, everywhere, from the base
  layer.

### Stat grid

Figures are orange on white cards, labels stay ink muted. These numbers count
what people did — a community joined, events staffed, applications sent — so
they are the one place on the home page where orange is unambiguously earned.
White is the ground because orange has real headroom there and only 3.02:1 on
the sunk band.

### Hairline grids

Groups whose length is fixed and fills the grid — the stat strip, the six things
YVC does, the three contact audiences — use a one-pixel gap over a border-toned
background, which reads as a printed table. Lists whose length varies use
separated bordered cards instead, because an empty cell in a gap-filled grid
looks like a fault.

### Step rail

Four numbered steps on a continuous hairline, vertical on mobile and horizontal
from the large breakpoint. The first three nodes are blue — the work YVC does.
The fourth is orange, because it is the step the volunteer performs. That single
node is the clearest statement of the role split anywhere on the site. The rail
is decorative; the ordered list carries the meaning, and the step titles say who
acts, so the colour reinforces rather than carries it.

### Status chip

A dashed-border, uppercase label for material that is planned rather than live,
such as the course. Meaning is in the words; the dashed edge only reinforces it.

### Navigation

A 64px bar on mobile and 80px from the large breakpoint: mark plus organisation
name, the language control at every width, and one action. Below the large
breakpoint the page links move into a disclosure panel that closes on Escape and
on selection.

## Surfaces and components

Cards do not have borders. A group of related things is separated by a hairline
rule above each item and a generous gap, not by a box: the boxed grid reads as a
table, and a table is the wrong register for six sentences about what an
organisation does. `StatGrid`, `NameBoard` and the home page's "what we do" list
all use the same rule-and-space treatment, which is why they feel like one page
rather than three components.

Actions are full-radius pills. They shift background on hover and take a small
scale-down on press; nothing lifts, because a shadowless page has nothing for a
lifted element to cast onto.

The one solid band is the closing call to action, and it is deliberate: it is the
last thing on the page and the only place that needs to stop a reader. Figures
that would once have sat on a blue block now sit on paper under a hairline, which
also frees them to be orange where they are a human number.

## Motion

Transitions on hover and focus, and nothing else. There are no scroll reveals:
a scroll-driven reveal leaves sections blank in any context that does not
scroll, including full-page screenshots and print, which is a poor trade for a
site whose pages get screenshotted and shared. The global reduced-motion rule
still neutralises transitions for users who ask for it.

The home page's region map is the one scroll-driven surface, and it is allowed
only because it does not take that trade. Nothing is revealed by scrolling: the
finished plan-view map is server-rendered and visible before any script runs, so
a document that never scrolls still captures a complete section. Scrolling
changes the map's viewing angle, it does not bring it into existence. Under
`prefers-reduced-motion` the map holds one frame at its final state.

Anything else that wants to animate on scroll has to clear the same bar: correct
and complete at rest, better in motion. If it is blank until scrolled, it does
not ship.

### Ambient backdrops

The page's middle breathes on a two-section rhythm: flat ground, then a toned
band carrying an ambient backdrop. Three bands have one — "what we do",
"opportunity sources", and the course — and the rhythm is the point: a backdrop
on every section is wallpaper, and a backdrop on one is an accident.

Two rules keep them honest.

**A backdrop depicts the club's own object or it does not exist.** Not ambient
shapes, not a gradient mesh: event cards rising and being checked, the channels
opportunities arrive through, the ruled page of a course being read. A reader who
looks straight at one should recognise what it is.

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
- **Do** put orange figures on white, never on a tinted band.
- **Do** label anything that is planned, in preparation, or not yet published.
- **Do** check display lines at 360px in Uzbek, Russian, and English.

### Don't

- **Don't** use gradients, glassmorphism, ambient shadows, or glow.
- **Don't** combine blue and orange in one element, or introduce a third hue.
- **Don't** reach for a red; the palette defines none.
- **Don't** put a literal hex value in a component.
- **Don't** claim live opportunities, active authentication, or partners that
  are not in `PRODUCT.md`.
- **Don't** render the mark below 16px or crop it for decoration.
