# Marketing Frontend Diagnosis

## Audit health score

| Dimension                | Score | Evidence |
| ------------------------ | ----: | -------- |
| Accessibility            | 4/4   | Landmarks, keyboard controls, focus styles, reduced motion, semantic headings |
| Performance              | 3/4   | Server-first pages and lazy hero WebGL; the long home page and 3D map remain the largest cost |
| Responsive design        | 4/4   | Mobile navigation, fluid sections, and no desktop horizontal overflow |
| Theming                  | 4/4   | Complete token-based light/dark implementation |
| Implementation integrity | 4/4   | Zero deterministic detector findings and a product-specific civic visual system |
| Total                    | 19/20 | Excellent, with deployment and real-device verification still required |

## Findings and resolution

- P2: the header exposed an Events anchor beside Volunteering even though
  Events was not a page. The anchor was removed; the header now contains four
  real page destinations plus the primary join action.
- P2: the home page is intentionally long and visually authored, but its 3D
  hero remains the primary performance risk. Keep the complete server SVG,
  reduced-motion path, pixel-ratio cap, and WebKit checks as release gates.
- P3: the home page carries several narrative sections. They serve different
  decisions—credibility, operating model, sources, and action—so no further
  copy was removed without new product evidence.

## Positive findings

The rendered hero is distinctive, the public route registry and sitemap agree,
facts remain centralized, locale catalogs have parity, and the detector found
no design-system drift. Marketing stays separate from authentication and
volunteer workflows.
