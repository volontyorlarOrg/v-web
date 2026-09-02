# Volontyorlar introduction video

A ~60 second introduction to Volontyorlar, rendered with [Remotion](https://remotion.dev).
It walks from the public marketing site through logging in, finding an
opportunity, applying, and having a place confirmed.

## Why this is a separate project

`AGENTS.md` forbids adding packages to the marketing site, and Remotion pulls in
a bundler, a headless browser and a renderer. So this directory has its **own**
`package.json`, `tsconfig.json` and `node_modules`, and shares no dependency
graph with the site. The site's `npm run lint`, `npm run typecheck` and
`npm run build` all ignore it (`tsconfig.json` excludes `video`, and
`eslint.config.mjs` adds `video/**` to its global ignores).

Nothing here is deployed. It renders a file.

## Licence

Remotion is free for individuals and for companies of three people or fewer.
A company of four or more needs a paid company licence:
<https://remotion.dev/license>. Confirm which side Volontyorlar falls on before
this video is used publicly.

## Commands

Install once:

```bash
npm install
```

Preview and scrub in the browser:

```bash
npm run studio
```

Render the video to `out/volontyorlar-intro.mp4`:

```bash
npm run render
```

Render a single frame to check a change quickly:

```bash
npx remotion still Intro out/frame.png --frame=900
```

## The storyboard

`Intro` is 1810 frames at 30fps (60.3s), 1920×1080. Scene order and lengths live
in one place, `src/Intro.tsx`, so retiming means editing one array.

| Scene | Frames | Length | What it shows |
| --- | --- | --- | --- |
| `Open` | 0–120 | 4.0s | Brand mark draws, wordmark, tagline |
| `Landing` | 120–520 | 13.3s | The marketing site in a browser: hero, the four steps, the numbers |
| `LogIn` | 520–760 | 8.0s | Phone number, six-digit code, signed in |
| `Discover` | 760–1060 | 10.0s | Opportunity feed, region filters, opening one |
| `Apply` | 1060–1390 | 11.0s | Opportunity detail, what the organiser asked for, applying |
| `Confirmed` | 1390–1600 | 7.0s | Place confirmed |
| `Outro` | 1600–1810 | 7.0s | Brand and call to action |

## What is real and what is illustrative

The video is built from the repository's own design system: every colour in
`src/theme.ts` is copied from `src/app/globals.css`, the fonts are Onest and
Source Serif 4 as in `src/app/[locale]/layout.tsx`, and the brand mark is the
same geometry as `src/components/brand/logo.tsx`.

**Real**, taken from `src/lib/content/org.ts` and `src/i18n/messages/en.json`:

- Every line of marketing copy in the `Landing` and `Outro` scenes
- The four "how it works" steps
- The numbers: 3,600 Telegram, 50 events supplied, 500 regional applications, 14 regions
- The organiser names, which are the opportunity sources in `org.ts`

**Illustrative**, because these features are not built yet:

- Every app screen after the landing page — the login, feed, detail and
  confirmation designs are proposals, not screenshots
- The individual events (`OPPORTUNITIES` in `src/copy.ts`) and their
  requirements. The organisers are real; the specific events are invented to
  show the shape of a listing
- The phone number and verification code

If a listing here is ever mistaken for a real event, change `src/copy.ts`.

## The site URL

`SITE_URL_LABEL` in `src/copy.ts` is deliberately empty, for the same reason
`NEXT_PUBLIC_SITE_URL` is: no marketing origin is verified yet, and the site
never invents one. While it is empty the browser chrome shows `Volontyorlar` and
the outro ends on "Join the community". Set it to the real domain once one
exists and both places pick it up.

## Colour discipline

The brand rule from `AGENTS.md` is enforced by hand here, and matters most in
two places. Blue carries the institution: navigation, the log-in flow, the
"checked with the organiser" marks, primary buttons. Orange carries the person:
the fourth step ("You volunteer"), the volunteers-still-needed line, the
"Applied" state, and the confirmation. The two are never combined — the
`Applied` state is an orange outline on paper, never orange on blue.

## Adding Uzbek or Russian

`src/copy.ts` is the only file holding strings. To produce `uz` or `ru`
versions, lift the strings from `src/i18n/messages/{uz,ru}.json`, pass the
catalogue in as a composition prop, and register one `Composition` per locale in
`src/Root.tsx`. The scene components take no English-specific layout decisions,
though the serif headlines will need a glance at their line breaks.
