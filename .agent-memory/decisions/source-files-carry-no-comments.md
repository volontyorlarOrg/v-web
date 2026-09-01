# Source files carry no comments; explanations live in /docs

A maintainer instruction, applied across `src/`, `e2e/`, and the root configs:
292 comment lines were removed and their substance moved into `/docs`.

Where things went:

- Component and token rationale → `docs/ui/UI_SYSTEM.md` and `DESIGN.md`
- Rendering, client boundary, and framework configuration → `docs/architecture/ARCHITECTURE.md`
- Origin and channel behaviour → `docs/architecture/DOMAINS.md`
- Indexing, metadata, structured data → `docs/web/SEO_AND_ROUTES.md`
- Headers, CSP, analytics constraints → `docs/security/SECURITY.md`
- Everything a contributor needs before touching the code → `docs/operations/EXTENDING.md`

Compiler and linter directives — `@ts-expect-error`, `eslint-disable` — are not
comments and were kept; the stripper preserves any line containing one.

Two consequences worth remembering:

1. **Tests became the in-source documentation.** A rule that used to be a
   comment is now an assertion with a sentence for a name. The contrast test's
   negative assertions are the clearest example: "the two hues are too close to
   sit on each other" is enforced, not described.
2. **A name that needed a comment now needs a better name.** If something cannot
   be explained by its name and type, it goes in `/docs` and gets renamed, not
   annotated.
