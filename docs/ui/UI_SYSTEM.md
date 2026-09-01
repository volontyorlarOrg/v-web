# V3 UI System

## Design read

V3 is a mobile-first landing page for young volunteers arriving from Telegram.
Its visual language is a calm night-time signal board: familiar enough to feel
native to the journey, but clearly owned by Volontyorlar rather than imitating a
Telegram client.

The page's single job is to explain the planned loop — discover an opportunity,
apply from a reusable profile, show up, and keep the confirmed record — without
claiming that the integration is already live.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| Night ink | `#071719` | Canvas |
| Deep channel | `#0D2529` | Large secondary field |
| Raised panel | `#123438` | Cards and message surfaces |
| Volontyorlar teal | `#45C1C4` | Brand and primary action |
| Deadline amber | `#F3A94A` | Time-sensitive information only |
| Soft white | `#F4FBFB` | Primary text |
| Mist | `#A8C0C2` | Secondary text |

Red remains reserved for destructive or urgent states if they are introduced.

## Typography

- Bricolage Grotesque: display statements and section headings.
- Manrope: body copy, controls, messages, and compact metadata.
- Tabular numerals: hours, dates, reliability, and thresholds.
- Body measure: no more than roughly 70 characters.

## Signature interaction

The hero shows one vertical signal moving through three planned stages:
opportunity posted, application assembled, and attendance confirmed. The signal
draws once on arrival; reduced-motion users receive the complete static state.

## Components and behavior

- Navigation uses the horizontal vector logo and in-page links only.
- Opportunity examples are labeled illustrative and never presented as live.
- The record example is labeled illustrative and uses the exact level/reliability
  rules in the brief.
- Calls to action navigate inside the test page because no live product or
  Telegram authentication target is available.
- Focus, selection, scrollbars, hover, active, and reduced-motion behavior use
  the same token system.

## Responsive rules

- Mobile is the primary composition, including thumb-sized controls and no
  horizontal page overflow.
- The hero becomes a split composition only when both columns have enough room.
- Opportunity examples form a scroll-snap rail on narrow screens and a grid on
  wider screens.
- The bottom action remains reachable without covering content.
