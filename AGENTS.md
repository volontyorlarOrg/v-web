<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# YVC Web — Agent Guide

This repository is the public YVC website. Read this file before meaningful
work, then use [`docs/README.md`](docs/README.md) to load only the project
context needed for the task.

## Product identity

Youth Volunteering Community helps young people in Uzbekistan discover
volunteer opportunities and build a trustworthy record of attendance. The
product is mobile-first because most visitors arrive from Telegram links.
English is the launch language; Uzbek is the next planned locale.

The broader product brief includes opportunities, Telegram sign-in, reusable
profiles and essays, applications, volunteer records, and an admin panel. This
repository is currently scoped to the public website and its frontend
foundation. Do not infer that backend, authentication, or dashboard behavior
already exists here.

## Technology stack

- Next.js 16 App Router, React 19, and strict TypeScript
- Tailwind CSS 4
- i18next/react-i18next for localization
- Motion for interaction and section motion
- next-themes for class-based light/dark mode
- Radix/shadcn-compatible primitives, Lucide icons, and Three.js when justified
- npm with a committed lockfile; Node.js 22.13 or newer

Verify dependency versions in `package.json`. For Next.js behavior, consult the
installed documentation in `node_modules/next/dist/docs/` before relying on
older framework knowledge.

## Current repository map

```text
app/            -> App Router layouts, pages, and global styles
public/         -> public YVC brand assets
docs/           -> stable project and environment documentation
.agent-memory/  -> durable decisions, discoveries, and gotchas
.github/        -> dependency updates and CI/security checks
../product/     -> source product brief and master brand files (sibling folder)
```

The current `/`, `/v1`, `/v2`, and `/v3` routes are design explorations. Keep
them intact unless a task explicitly selects or replaces a direction.

## Critical rules

- Preserve the mobile-first path from Telegram into the public site.
- Do not invent backend contracts, Telegram credentials, domains, or deployment
  values. Document unknown external details as needing verification.
- Keep secrets out of source control. `NEXT_PUBLIC_*` values are browser-visible.
- New user-facing copy must account for English and the planned Uzbek locale.
- Reuse the shared dependency and token foundation before adding libraries or
  one-off visual systems.
- Use red only for urgent or destructive meaning such as deadlines; the product
  brief reserves navy for structure and teal for primary action.
- Preserve reduced-motion behavior, keyboard access, readable focus states, and
  responsive behavior.
- Update `/docs` when stable environment or architecture behavior changes.

## Default verification

Run what applies:

```bash
npm run lint
npx tsc --noEmit
git diff --check
```

Use `npm run build` only when the task calls for build/deployment validation.
For UI work, also inspect the affected routes in a real browser at mobile and
desktop widths and with reduced motion.
