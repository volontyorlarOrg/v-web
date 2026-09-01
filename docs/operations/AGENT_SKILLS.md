# Project Agent Skills

## Installed from the Dwelve toolset

The reusable skills are mirrored in both `.agents/skills/` and
`.claude/skills/` so compatible project agents receive the same guidance.

| Skill | Why it is installed |
| --- | --- |
| `design-taste-frontend` | General landing-page and redesign direction grounded in the brief |
| `redesign-existing-projects` | Audit-first improvement of an existing frontend without breaking behavior |

The current Codex environment also provides the newer Impeccable and Frontend
Design plugin skills. Those are environment-managed and are not vendored into
the repository.

## Intentionally not copied

| Dwelve-local skill | Reason |
| --- | --- |
| `design-taste-frontend-v1` | Deprecated compatibility version |
| old local `impeccable` | Superseded by the available v4 plugin |
| `stitch-design-taste` | Google Stitch is not available in this workspace |
| `gpt-taste` | Requires a GSAP-heavy direction not selected for V3 |
| `minimalist-ui` | Aesthetic preset unrelated to the selected V3 direction |
| `industrial-brutalist-ui` | Aesthetic preset unrelated to the selected V3 direction |
| `high-end-visual-design` | Overlaps available Impeccable/Frontend Design guidance |
| `full-output-enforcement` | Generic response behavior, not a project capability |

Add a skipped skill only when a task selects its visual or tool dependency.
