---
name: Volontyorlar V3
description: A calm night-signal system that makes volunteering feel credible, visible, and worth returning to.
colors:
  night: "#071719"
  field: "#0D2529"
  panel: "#123438"
  panel-strong: "#174147"
  signal-line: "#285158"
  text: "#F4FBFB"
  muted: "#A8C0C2"
  volontyorlar-teal: "#45C1C4"
  teal-ink: "#082326"
  deadline-amber: "#F3A94A"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  card: "24px"
  feature: "28px"
  callout: "32px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-mobile: "96px"
  section-wide: "128px"
components:
  button-primary:
    backgroundColor: "{colors.volontyorlar-teal}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "#62D1D3"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "52px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "52px"
  button-inverse:
    backgroundColor: "{colors.teal-ink}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "0 24px"
    height: "52px"
  opportunity-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.feature}"
    padding: "28px"
  status-chip:
    backgroundColor: "{colors.volontyorlar-teal}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
---

# Design System: Volontyorlar V3

## Overview

**Creative North Star: "Night Signal Board"**

Volontyorlar feels like a calm public signal after dark: clear enough to guide a first-time volunteer, structured enough to make participation feel credible, and warm enough to invite young people in without becoming childish. The dark field creates focus; teal marks action, progress, and verified participation; restrained amber calls attention only to time-sensitive or illustrative context.

The system is purposeful and trustworthy rather than institutional. Asymmetrical editorial compositions, large plainspoken headlines, and compact evidence cards create momentum, while the constant-stroke volunteer-journey timeline makes the experience recognizably Volontyorlar. Planned or illustrative material is always labeled in the interface, so visual confidence never becomes a false live-product claim.

**Key Characteristics:**

- Dark, calm tonal fields with high-clarity type.
- Asymmetrical editorial layouts that become a direct vertical flow on mobile.
- Teal used as a signal for action, progress, confirmation, and identity.
- A constant-stroke volunteer-journey timeline as the signature graphic behavior.
- Rounded, bordered surfaces with flat or tonal depth and rare teal shadow.
- Explicit labels for concept, planned, illustrative, and launch-target content.

## Colors

The palette is a restrained night field in which teal behaves like a legible signal, amber behaves like a scarce notice, and pale text carries the message without glare.

### Primary

- **Volontyorlar Teal:** Use for primary actions, active milestones, positive confirmation, brand marks, links, and the journey signal.

### Secondary

- **Deadline Amber:** Reserve for deadlines, launch-target labels, and clearly illustrative notices; it is informative, not decorative.

### Neutral

- **Night:** The page canvas and deepest inset surfaces.
- **Field:** Broad section bands, secondary cards, and hover fills.
- **Panel:** Default raised tonal surface for content and reached states.
- **Panel Strong:** Confirmed or emphasized journey states.
- **Signal Line:** Borders, timeline tracks, dividers, and quiet structural separation.
- **Text:** Primary copy and high-value facts.
- **Muted:** Supporting copy, metadata, and inactive states.
- **Teal Ink:** High-contrast copy on solid teal actions and callouts.

### Named Rules

**The Signal Rarity Rule.** Teal identifies action, progress, confirmation, or identity; do not wash whole sections in it except for a single decisive callout.

**The Honest Amber Rule.** Amber is limited to deadlines and visibly labeled illustrative or target information; never use it as a generic accent.

## Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** Manrope (with sans-serif fallback)

**Character:** Bricolage Grotesque gives the page a youthful editorial voice with compact, memorable shapes. Manrope keeps navigation, evidence, captions, and explanatory copy calm and highly legible.

### Hierarchy

- **Display** (600, fluid hero scale, 0.94 line-height): Hero statements only; keep them plainspoken, short, and visually dominant.
- **Headline** (600, 2.25rem mobile and 3rem from the small breakpoint, 1.25 line-height): Major section ideas and conversion moments.
- **Title** (600, 1.5rem, 1.25 line-height): Opportunity titles, journey steps, and card-level ideas.
- **Body** (400, 1rem, 1.75 line-height): Explanations and product truth; readable measures generally stay below about 42rem.
- **Label** (800, 0.75rem, 0.14em letter-spacing, uppercase): Categories, target labels, record captions, and explicit status disclosures.

### Named Rules

**The Plainspoken Display Rule.** Display type carries one direct human idea at a time; never turn it into ornamental brand copy or a dense feature list.

## Layout

The system is mobile first. Content sits inside a centered 80rem maximum container with 20px side gutters on small screens and 32px gutters from the small breakpoint. Major sections use a 96px vertical rhythm on mobile and 128px on wider screens; compact evidence bands use deliberately tighter spacing.

Desktop compositions are editorial and asymmetrical: hero copy pairs with the journey, opportunity cards use a 1.35-to-0.85 feature grid, and the record uses a 0.82-to-1.18 narrative/evidence split. These become single-column flows below the large breakpoint, preserving reading order and giving every action full-width breathing room where needed. Use visible borders and tonal bands to mark transitions instead of decorative dividers.

**The One Story Per Fold Rule.** Each major band should communicate one idea—journey, launch target, opportunities, or record—before asking the reader to process the next.

## Elevation & Depth

The system is flat by default. Depth comes from moving between Night, Field, Panel, and Panel Strong, reinforced by a one-pixel Signal Line border. Teal-tinted shadows appear only beneath the most consequential evidence surfaces or as a small signal glow; they must remain soft, rare, and subordinate to content.

### Shadow Vocabulary

- **Signal Halo** (`0 0 18px rgba(69, 193, 196, 0.8)`): The moving point on the volunteer journey.
- **Journey Lift** (`0 28px 70px -44px rgba(69, 193, 196, 0.65)`): The first opportunity card in the journey sequence.
- **Record Lift** (`0 34px 90px -58px rgba(69, 193, 196, 0.8)`): The complete volunteer-record preview.

### Named Rules

**The Tonal-First Rule.** Establish hierarchy with surface color and borders before adding any shadow.

## Shapes

Cards and actions use gently rounded corners, with radius increasing with scale: compact chips and labels use 8px, buttons use 12px, journey and utility cards use 16px, feature cards use 24–28px, and the final callout uses 32px. Circular nodes belong to people, progress points, and the journey track. Borders are thin and quiet; thick outlines appear only as oversized, low-contrast decorative rings inside a clipped feature surface.

**The Rounded, Not Soft Rule.** Corners should feel approachable and engineered; avoid pill-shaped cards, bubbly containers, and arbitrary mixed radii.

## Components

### Buttons

Buttons feel direct, compact, and confident.

- **Shape:** Gently rounded rectangle (12px) with a 44px minimum height in navigation and 52px for primary page actions.
- **Primary:** Solid Volontyorlar Teal with Teal Ink, extra-bold Manrope, and 24px horizontal padding.
- **Hover / Focus:** Lighten the teal and lift by 2px on hover; return to baseline on active. Every keyboard focus uses a 3px teal outline with a 4px offset.
- **Secondary:** Transparent Night surface, Text foreground, and a Signal Line border that shifts to teal with a Field fill on hover.
- **Inverse:** Teal Ink on the teal callout, with Text foreground and a restrained upward hover shift.

### Chips

- **Style:** Compact 8px corners, extra-bold labels, and minimal 4px by 10px padding. Solid teal marks the primary category or a reached status; Field and Panel hold secondary metadata.
- **State:** Amber text is permitted only for a deadline or explicit illustrative/target label. Inactive status text uses Muted rather than reduced opacity.

### Cards / Containers

- **Corner Style:** 16px for compact and journey cards; 24–28px for feature and record cards.
- **Background:** Alternate Field, Panel, Panel Strong, and Night according to information priority.
- **Shadow Strategy:** Flat at rest except for the selected journey and record evidence surfaces described in Elevation & Depth.
- **Border:** One-pixel Signal Line, with a translucent teal border reserved for confirmed or reached states.
- **Internal Padding:** 20–24px for compact cards and 28–36px for feature cards, reducing toward the lower end on mobile.

### Navigation

Navigation is a quiet 80px bar with the horizontal brand mark, one muted text link on wider screens, and one compact teal action. Mobile hides the secondary text link but preserves the brand and journey action. The header uses a translucent Night fill, a subtle lower border, and background blur without turning into a floating glass card.

### Volunteer Journey Timeline

The signature journey is a constant one-pixel vertical Signal Line with circular icon nodes and offset cards for opportunity, planned application, and confirmed attendance. The signal dot travels along the line while cards reveal in a brief stagger; both behaviors stop under reduced-motion preferences. The track must stay continuous and the confirmed node is the only solid teal node.

### Volunteer Record

The record preview combines a compact identity row, three evenly divided facts, and a vertical level ladder. Reached levels use Panel with teal checks; future levels stay transparent with Muted copy. Tabular numerals keep hours, event counts, reliability, and thresholds aligned.

## Do's and Don'ts

### Do:

- **Do** use Night, Field, Panel, and Panel Strong to establish hierarchy before adding effects.
- **Do** keep teal focused on action, progress, confirmation, and brand identity.
- **Do** make the volunteer journey line constant-stroke, continuous, and readable at mobile width.
- **Do** use plainspoken editorial headlines and short, evidence-led supporting copy.
- **Do** label planned, illustrative, concept, and launch-target material where it appears.
- **Do** preserve keyboard focus and reduced-motion behavior in every new interactive pattern.

### Don't:

- **Don't** use gradients.
- **Don't** invent live opportunities, active authentication, partner counts, or other unverified product claims.
- **Don't** turn the landing page into a product dashboard or introduce form controls that the surface does not need.
- **Don't** use amber as a general decorative highlight or red as a substitute for deadline meaning.
- **Don't** add generic glassmorphism, heavy ambient shadows, neon glow fields, or noisy decorative texture.
- **Don't** make the youth-oriented tone childish with bubbly shapes, mascots, stickers, or novelty type.
