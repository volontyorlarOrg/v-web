# YVC Web Documentation

Use this file to route project questions to the smallest relevant source.

| Task | Read |
| --- | --- |
| Product purpose, scope, audience, or brand constraints | [`../PRODUCT.md`](../PRODUCT.md) |
| Current routes, rendering, dependencies, or implementation boundary | [`architecture/ARCHITECTURE.md`](architecture/ARCHITECTURE.md) |
| Domains, hosts, or deployment topology | [`architecture/DOMAINS.md`](architecture/DOMAINS.md) |
| Brand assets, logo variants, and usage | [`brand/BRAND_ASSETS.md`](brand/BRAND_ASSETS.md) |
| Data concepts and what is not implemented | [`data/DATA_MODEL.md`](data/DATA_MODEL.md) |
| Telegram plans and unknown integration contracts | [`integrations/TELEGRAM.md`](integrations/TELEGRAM.md) |
| UI tokens, V3 direction, responsiveness, or accessibility | [`ui/UI_SYSTEM.md`](ui/UI_SYSTEM.md) |
| Metadata, public routes, robots, or sitemap | [`web/SEO_AND_ROUTES.md`](web/SEO_AND_ROUTES.md) |
| Security headers, secrets, or trust boundaries | [`security/SECURITY.md`](security/SECURITY.md) |
| Setup, commands, environment, dependencies, CI, or deployment | [`operations/DEVELOPMENT_AND_DEPLOYMENT.md`](operations/DEVELOPMENT_AND_DEPLOYMENT.md) |
| Installed and intentionally omitted project skills | [`operations/AGENT_SKILLS.md`](operations/AGENT_SKILLS.md) |
| A non-obvious decision, discovery, or gotcha | [`../.agent-memory/README.md`](../.agent-memory/README.md) |

## Source-of-truth order

When sources disagree, investigate in this order:

1. executable code;
2. current configuration;
3. `AGENTS.md`;
4. current `/docs`;
5. persistent memory;
6. old comments, plans, and history.

The sibling `../product/` folder contains the original product brief and master
brand assets. It is reference material, not runtime application code.

## Documentation boundary

These pages separate three kinds of truth:

- **Implemented** — verified in current source or configuration.
- **Presented** — supplied by the product brief or logo reference, but not proof
  of an implementation.
- **Needs verification** — no evidence is available in the workspace.

Unknowns remain explicit skeletons. They are not filled with assumed contracts.
