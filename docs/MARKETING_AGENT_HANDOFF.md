# Volontyor Marketing Website — Final Agent Handoff

## Mission

You are responsible for turning the existing Volontyor public website repository into the production-grade **Volontyor marketing website**.

### Target repository
- `volontyorlarOrg/v-web`
- GitHub: `https://github.com/volontyorlarOrg/v-web`

### Reference repositories
Read these as architectural references only. Do **not** copy Dwelve product names, domains, business rules, environment values, or unnecessary dependencies.

1. Dwelve marketing site:
   - `DwelveOrg/dwelve`
   - Use it mainly for:
     - marketing/app repository separation
     - localized route organization
     - metadata/SEO structure
     - documentation routing
     - design-token discipline
     - agent documentation/memory patterns
     - centralized links to the product app

2. Dwelve authenticated application:
   - `DwelveOrg/app`
   - Use it only to understand the boundary between a public marketing site and an authenticated product.
   - Do not transplant dashboard/API/auth dependencies into the marketing repository.

---

# 1. Product truth

The canonical product name is:

**Volontyor**

Do not call it “Youth Volunteering Community” unless the maintainers explicitly change the product name later.

Volontyor was founded on **June 4, 2025** by **Arslon Rajabov** and **Parizoda Abdurakhimova** to help high school students discover and apply to meaningful volunteering opportunities.

Volontyor has expanded from simply reposting opportunities into actively:
- finding volunteer opportunities;
- contacting organizers;
- sourcing events;
- building partnerships;
- supplying volunteers;
- building regional operations.

Current known traction:
- 3,600+ Telegram followers;
- 220+ Instagram followers;
- volunteer work supplied for 50+ events;
- partnership with O'ZLIDEP Party;
- supported/recognized by the Youth Affairs Agency;
- supported/recognized by the Uzbekistan Volunteer Association;
- supported/recognized by the Republican Children's Library;
- expansion toward all 14 regions of Uzbekistan;
- 500+ applications for regional project manager/coordinator roles.

Current opportunity sources/partners include:
- Yashil Qo'llar;
- Youth Run Club;
- Youth for Good;
- Youth Grants;
- Relay Fellowship.

Near-term education initiative:
- volunteering basics;
- how to apply;
- how to write a volunteering essay;
- dos and don'ts;
- understanding what volunteering is and how to participate effectively.

Do not invent extra partnerships, statistics, testimonials, awards, offices, or integrations.

---

# 2. Repository boundary

This repository is the **public marketing website**.

It should own:
- Volontyor brand and public positioning;
- landing pages;
- public organization/about information;
- partner/social-proof presentation;
- explanations of how Volontyor works;
- educational/course marketing pages;
- public contact information when verified;
- SEO;
- metadata;
- structured data;
- public legal pages;
- links into the separate product application;
- links to verified social channels.

It should **not** own:
- volunteer authentication;
- sessions;
- volunteer dashboards;
- saved profiles;
- application drafts;
- volunteer ratings;
- partner review dashboards;
- admin CRUD workflows;
- private backend API calls;
- user-specific state;
- application history;
- attendance records.

Those belong in the separate Volontyor application repository.

Do not turn the marketing website into a second copy of the application.

---

# 3. First task: audit before editing

Before making meaningful changes:

1. Read:
   - `AGENTS.md`
   - `PRODUCT.md`
   - `README.md`
   - `DESIGN.md`
   - `docs/README.md`
   - all documents directly relevant to architecture, UI, SEO, domains, security, and development.
2. Inspect:
   - `package.json`;
   - `src/app`;
   - `src/lib`;
   - `components.json`;
   - `next.config.*`;
   - `.env.example`;
   - current logo/assets;
   - current design exploration routes `/`, `/v1`, `/v2`, `/v3`;
   - current agent-memory notes.
3. Inspect equivalent files in `DwelveOrg/dwelve`.
4. Inspect the application boundary in `DwelveOrg/app`.
5. Write a short implementation plan.
6. Only then modify code.

Repository code and current configuration outrank old prose if they disagree, but do not silently erase a documented invariant. Investigate the conflict and update the owning documentation.

---

# 4. Fix existing documentation drift

The current Volontyor documentation contains product assumptions that are now stale.

At minimum, audit and update:
- `PRODUCT.md`;
- `AGENTS.md`;
- `docs/README.md`;
- `docs/architecture/ARCHITECTURE.md`;
- `docs/architecture/DOMAINS.md`;
- `docs/ui/UI_SYSTEM.md`;
- `docs/web/SEO_AND_ROUTES.md`;
- `docs/operations/DEVELOPMENT_AND_DEPLOYMENT.md`;
- any related agent-memory notes.

Correct these concepts:
- official product name is Volontyor;
- the site is no longer merely a set of design explorations;
- the system is intentionally split into marketing site + product application;
- Uzbek, Russian, and English are product languages;
- product-app features must not be documented as implemented on the marketing site;
- domains remain unknown until verified;
- app/backend contracts remain unknown until verified.

Maintain the distinction between:
- **Implemented**
- **Presented / product direction**
- **Needs verification**

Do not convert unknowns into guesses.

---

# 5. Recommended frontend stack

Keep the marketing site intentionally small.

## Core
- Next.js 16 App Router
- React 19
- strict TypeScript
- Node.js 22+
- Tailwind CSS 4

## UI
- existing shadcn-compatible component foundation
- Lucide React
- class-variance-authority
- clsx
- tailwind-merge

Do not add Material UI, Chakra, Ant Design, Bootstrap, or another competing component system.

## Localization

Prefer **`next-intl`** for the production marketing architecture.

The existing repo has `i18next`, `react-i18next`, and browser language detection, but localized routes/catalogs have not become an established production architecture. This is the right point to simplify rather than preserve unused infrastructure.

Migration rule:
- first inspect current usage;
- if i18next is only foundation/residue, replace it with `next-intl`;
- if meaningful production behavior has appeared since this handoff was written, do not blindly rewrite it; document the tradeoff first.

Target locales:
- `uz`
- `ru`
- `en`

Recommended URL model:
- `/uz/...`
- `/ru/...`
- `/en/...`

Use one locale per URL. Do not let browser/localStorage language state make the same canonical URL render different languages.

Default:
- use Uzbek as the default audience locale unless maintainers have since made a different explicit product decision;
- `/` should redirect to the chosen default locale rather than contain a separate duplicate home page.

## Motion
Use `motion` only when interaction materially benefits from it:
- restrained section reveals;
- navigation states;
- meaningful product-story transitions.

Respect `prefers-reduced-motion`.

Do not animate every element simply because the dependency exists.

## Themes
Keep `next-themes` only if the selected production design genuinely ships light/dark themes.

If the final Volontyor marketing design is deliberately one-theme, remove theme infrastructure rather than maintaining unused complexity.

## Three.js
Treat Three.js as optional and expensive.

Keep it only if:
- a final selected hero genuinely requires it;
- it reinforces Volontyor's product story;
- mobile performance remains good;
- reduced motion and non-WebGL fallback behavior exist.

Otherwise remove `three` and `@types/three`.

The marketing site should not make a teenager's phone perform a graphics benchmark just to learn where to volunteer.

---

# 6. Dependencies that do NOT belong here by default

Do not install application dependencies unless a concrete marketing feature requires them.

Do not add by default:
- TanStack Query;
- TanStack Table;
- React Hook Form;
- Zod;
- Zustand;
- nuqs;
- openapi-fetch;
- next-safe-action;
- jose;
- DnD libraries;
- chart libraries;
- PDF libraries;
- application auth SDKs.

A simple contact/waitlist form may justify a small validation/form stack later, but that decision must be based on an implemented requirement, not anticipated complexity.

Audit `package.json` and remove dependencies that have no reachable production use after the exploration cleanup.

---

# 7. Target route architecture

The current `/`, `/v1`, `/v2`, `/v3` routes are design explorations.

The agent must inspect all three directions and consolidate the strongest ideas into **one production design system**.

Do not expose style-exploration routes in the final public information architecture.

Recommended structure:

```text
src/
  app/
    [locale]/
      layout.tsx
      (marketing)/
        layout.tsx
        page.tsx
        about/
          page.tsx
        partners/
          page.tsx
        volunteering/
          page.tsx
        course/
          page.tsx
        contact/
          page.tsx
        privacy/
          page.tsx
        terms/
          page.tsx
    robots.ts
    sitemap.ts
    global-not-found.tsx

  components/
    ui/
    marketing/
    brand/

  i18n/
    routing.ts
    request.ts
    messages/
      uz.json
      ru.json
      en.json

  lib/
    seo/
    routing/
    hosts/
    constants/
```

This is a target, not a command to create empty folders. Create only folders with real ownership.

### Page scope

Home page should communicate:
1. what Volontyor is;
2. why it exists;
3. opportunity discovery;
4. how the volunteer journey works;
5. proof/traction;
6. partners/support;
7. expansion across Uzbekistan;
8. education/course direction;
9. CTA into the actual product or current verified channel.

The marketing site may explain opportunities, but live opportunity browsing/filtering/applications should live in the product application.

Do not duplicate a full opportunity marketplace in this repo.

---

# 8. Server/client rendering rules

Default to Server Components.

Add `"use client"` only when required by:
- event handlers;
- client state;
- browser APIs;
- interactive Radix primitives;
- Motion;
- theme controls.

Push client boundaries as low as practical.

Marketing text, page composition, metadata, legal pages, partner information, and static sections should generally be server-rendered/static.

Prefer static generation for public marketing routes.

Avoid fetching on the client for information already available at build/server render time.

---

# 9. Localization rules

Every user-facing content change must be reflected in:
- Uzbek;
- Russian;
- English.

Requirements:
- Uzbek Latin script;
- proper Russian Cyrillic;
- no English fallback silently appearing inside translated pages;
- language switcher preserves the equivalent route;
- language choice must be represented in the URL;
- no language preference stored in localStorage if it would contradict the URL.

Use centralized locale/routing helpers rather than manual string replacement.

Test realistic translated widths. Russian often expands. Buttons must not disintegrate because a translation contains more than four characters.

---

# 10. SEO and public-route system

Build a deliberate SEO layer instead of scattering metadata objects.

Implement:
- central canonical-origin helper;
- central public route registry;
- localized canonical URLs;
- `hreflang` alternates for `uz`, `ru`, `en`;
- `x-default` where appropriate;
- localized page metadata;
- Open Graph metadata;
- Twitter metadata where appropriate;
- `robots.ts`;
- `sitemap.ts`;
- structured data/JSON-LD where factually justified;
- clean not-found behavior.

Possible structured data:
- Organization;
- WebSite;
- BreadcrumbList;
- Course only when the course page contains real published course information.

Do not fabricate:
- aggregate ratings;
- review stars;
- addresses;
- founding claims beyond supplied facts;
- partner relationships beyond supplied facts.

### Domain rule

No production domain is currently proven by the repository.

Do not copy Dwelve domains or deployment IDs.

If a canonical marketing origin and product-app origin are now available from environment/configuration, centralize them.

Suggested helpers:
- `marketingOrigin()`;
- `appOrigin()`;
- `appHref(path)`.

Do not hard-code the product app host into many components.

If the app origin is still unavailable, document it as **Needs verification** and keep CTAs on already verified existing destinations rather than inventing a domain.

---

# 11. Design system

Do not discard the existing Volontyor design explorations without reading them.

Audit V1/V2/V3 and extract:
- strongest typography;
- strongest spacing;
- strongest mobile navigation;
- strongest opportunity storytelling;
- strongest brand usage;
- strongest visual hierarchy.

Then establish one production token system.

Use semantic tokens such as:
- background;
- foreground;
- muted;
- surface;
- border;
- primary;
- primary-foreground;
- accent;
- destructive;
- warning/success only if needed.

Do not spread literal hex colors across components.

Preserve Volontyor brand assets.

Do not introduce fake SaaS gradients and generic purple-glass cards unless the brand actually calls for them.

### Mobile-first requirement

Volontyor visitors are likely to arrive from Telegram and social links.

Design from mobile upward:
- thumb-friendly controls;
- fast first render;
- no horizontal overflow;
- readable opportunity/story cards;
- small image payloads;
- sensible sticky CTA behavior;
- no essential hover-only interactions.

---

# 12. Product-app links

All links from marketing into the product app must go through a central helper.

Examples:
- browse opportunities;
- sign in;
- create volunteer profile;
- open application/dashboard.

Do not hand-write app origins throughout JSX.

Until the product application target is verified:
- do not invent it;
- preserve verified current destinations;
- document the missing app origin.

---

# 13. Performance requirements

Targets:
- mobile-first;
- avoid unnecessary hydration;
- use `next/image` appropriately;
- lazy-load expensive below-fold visuals;
- avoid shipping Three.js unless justified;
- prefer server/static content;
- avoid client-only localization for the entire page;
- minimize third-party scripts;
- avoid loading analytics before they are actually configured.

Run Lighthouse or equivalent browser checks when practical.

A visually impressive landing page that takes several seconds to become usable on mobile data is not impressive.

---

# 14. Accessibility

Minimum:
- semantic headings;
- one logical H1;
- keyboard-accessible navigation;
- visible focus states;
- accessible menus/dialogs/accordions;
- sufficient contrast;
- proper alt text;
- decorative images ignored by assistive tech;
- reduced-motion handling;
- no color-only status communication;
- touch targets sized for mobile use;
- language attribute matches the active locale.

Add/retain a contrast check if the project already has one or if implementation introduces token complexity.

---

# 15. Analytics and observability

Do not install analytics merely to satisfy a checklist.

If the maintainers have selected Vercel:
- `@vercel/analytics`;
- `@vercel/speed-insights`;

are reasonable.

For production errors:
- `@sentry/nextjs` is reasonable once a real Sentry project/configuration exists.

Never send:
- application essays;
- volunteer profile PII;
- phone numbers;
- Telegram identities;
- form contents

to analytics.

Marketing event examples:
- primary CTA clicked;
- opportunities CTA clicked;
- course interest CTA clicked;
- partner/contact CTA clicked;
- language switched.

Keep analytics event names centralized.

---

# 16. Testing and quality gates

The reference Dwelve marketing repository currently has no first-party automated test suite. Do not copy that gap.

For this marketing repo, add tests only where they provide value, but establish at least:
- Vitest for helpers/route/SEO utilities if non-trivial;
- React Testing Library for important interactive components;
- Playwright for production critical paths.

Suggested Playwright smoke coverage:
- each locale home page loads;
- locale switching preserves route;
- navigation works;
- primary CTA uses the correct host/destination;
- no exploration route leaks into production navigation;
- privacy/terms load;
- unknown routes show correct 404;
- mobile menu works by keyboard and touch.

Required checks before handoff:

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

If tests are configured:

```bash
npm run test
npm run test:e2e
```

Never report success without actually running the applicable checks.

---

# 17. Security

- Never expose secrets through `NEXT_PUBLIC_*`.
- Do not add API keys to source.
- Marketing app does not own user sessions.
- Add sensible security headers where compatible with deployed assets.
- Review CSP if third-party scripts are introduced.
- Do not copy Dwelve CSP hosts blindly.
- Sanitize/validate any future form submission server-side.
- Never log private volunteer information from the product app.

---

# 18. Agent documentation architecture

Keep:
- `AGENTS.md` as the compact execution guide;
- `docs/README.md` as the documentation router;
- `/docs` as stable project truth;
- `.agent-memory/` for expensive/non-obvious decisions and discoveries.

Do not put:
- temporary plans;
- command transcripts;
- status updates;
- speculative product ideas

into stable docs.

Recommended docs:

```text
docs/
  README.md

  architecture/
    ARCHITECTURE.md
    DOMAINS.md

  ui/
    UI_SYSTEM.md

  web/
    SEO_AND_ROUTES.md

  security/
    SECURITY.md

  operations/
    DEVELOPMENT_AND_DEPLOYMENT.md
    AGENT_SKILLS.md
```

Add more only when the repository earns the complexity.

---

# 19. Implementation sequence

Follow this order.

## Phase 1 — Audit and product truth
- inspect all current code/docs;
- inspect Dwelve marketing/app reference architecture;
- correct Volontyor name/product scope/documentation;
- identify exploration-only code;
- identify unused dependencies.

## Phase 2 — Production architecture
- choose/finalize locale strategy;
- establish `[locale]` routing;
- establish server-first layouts;
- establish design tokens;
- establish centralized route/SEO helpers;
- establish future app-host helper without inventing values.

## Phase 3 — Consolidate design
- compare V1/V2/V3;
- select strongest final direction;
- move reusable pieces into production components;
- remove/noindex exploration routes after the final design is established;
- remove style-switcher code from production if no longer needed.

## Phase 4 — Production content
- implement current Volontyor story and traction;
- implement about/partners/volunteering/course/contact/legal pages only where content is real;
- translate to all supported locales;
- preserve factual uncertainty instead of fabricating copy.

## Phase 5 — SEO/performance/accessibility
- metadata;
- sitemap/robots;
- canonical/hreflang;
- structured data;
- image optimization;
- accessibility review;
- reduced-motion review;
- mobile review.

## Phase 6 — Dependency cleanup and tests
- remove unused exploration/app residue;
- add only justified tooling;
- add critical tests;
- run all checks;
- update docs/memory.

---

# 20. Explicitly forbidden behavior

Do not:
- copy Dwelve branding or domains;
- install the full Dwelve app dependency list;
- build volunteer dashboard behavior in the marketing repo;
- invent a backend;
- invent Telegram auth;
- invent production hostnames;
- invent partners/statistics/testimonials;
- keep `/v1`, `/v2`, `/v3` publicly indexed after production direction is selected;
- add raw hard-coded colors everywhere;
- use localStorage to decide canonical page language;
- put auth/session tokens in browser storage;
- add large libraries for decorative effects without measurable value;
- rewrite working code only because a different pattern is fashionable.

---

# 21. Final handoff report

When complete, report:

1. What you changed.
2. What you deliberately did not change.
3. Files added/removed/updated.
4. Design direction selected and why.
5. Dependencies added.
6. Dependencies removed.
7. Localization implementation.
8. SEO implementation.
9. Production routes.
10. Remaining **Needs verification** items.
11. Commands/tests run and their results.
12. Any product decision that still requires a maintainer.

Do not declare unresolved unknowns “done.”
