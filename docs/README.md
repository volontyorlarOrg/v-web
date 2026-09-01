# YVC Web Documentation

Use this file to route project questions to the smallest relevant source.

| Task | Read |
| --- | --- |
| Product truth, verified facts, audience, or the marketing/app boundary | [`../PRODUCT.md`](../PRODUCT.md) |
| Production design system, tokens, typography, motion policy | [`../DESIGN.md`](../DESIGN.md) |
| Routes, rendering, module ownership, dependency boundary | [`architecture/ARCHITECTURE.md`](architecture/ARCHITECTURE.md) |
| Domains, origins, hosting topology | [`architecture/DOMAINS.md`](architecture/DOMAINS.md) |
| Brand assets, logo variants, and usage on the web | [`brand/BRAND_ASSETS.md`](brand/BRAND_ASSETS.md) |
| Logo geometry, colour values, clear space, minimum size | [`brand/LOGO_SPEC.md`](brand/LOGO_SPEC.md) |
| Applied UI system, localization behaviour, accessibility rules | [`ui/UI_SYSTEM.md`](ui/UI_SYSTEM.md) |
| Metadata, canonical URLs, hreflang, robots, sitemap, structured data | [`web/SEO_AND_ROUTES.md`](web/SEO_AND_ROUTES.md) |
| Security headers, CSP, secrets, trust boundaries | [`security/SECURITY.md`](security/SECURITY.md) |
| Setup, commands, environment, CI, deployment | [`operations/DEVELOPMENT_AND_DEPLOYMENT.md`](operations/DEVELOPMENT_AND_DEPLOYMENT.md) |
| Installed and intentionally omitted project skills | [`operations/AGENT_SKILLS.md`](operations/AGENT_SKILLS.md) |
| Vocabulary owned by the separate YVC application | [`data/DATA_MODEL.md`](data/DATA_MODEL.md) |
| Telegram plans and unknown integration contracts | [`integrations/TELEGRAM.md`](integrations/TELEGRAM.md) |
| A non-obvious decision, discovery, or gotcha | [`../.agent-memory/README.md`](../.agent-memory/README.md) |

## Reference material

[`YVC_MARKETING_AGENT_HANDOFF.md`](YVC_MARKETING_AGENT_HANDOFF.md) is the
maintainer brief that produced the current production site. It is a historical
input, not a live specification: where it and the code disagree, the code and
this folder win. Its durable content has been absorbed into `PRODUCT.md`,
`AGENTS.md`, and the pages below.

## Source-of-truth order

When sources disagree, investigate in this order:

1. executable code;
2. current configuration;
3. `AGENTS.md`;
4. current `/docs`;
5. persistent memory;
6. old comments, plans, and history.

## Documentation boundary

These pages separate three kinds of truth:

- **Implemented** — verified in current source or configuration.
- **Presented** — product direction, but not proof of an implementation.
- **Needs verification** — no evidence is available in the workspace.

Unknowns stay explicit. They are not filled with assumed contracts, hostnames,
or partner claims.
