# SEO and Public Routes

## The route registry

`src/lib/routing/routes.ts` is the single list of public routes. Navigation, the
footer, the sitemap, and canonical URLs all read from it, so a page that is not
registered is invisible to all four. Adding a page means adding an entry.

| Key | Path below the locale | Main nav | Footer legal | Priority |
| --- | --- | --- | --- | --- |
| `home` | *(empty)* | — | — | 1.0 |
| `about` | `/about` | yes | — | 0.7 |
| `volunteering` | `/volunteering` | yes | — | 0.9 |
| `partners` | `/partners` | yes | — | 0.7 |
| `contact` | `/contact` | yes | — | 0.6 |
| `privacy` | `/privacy` | — | yes | 0.3 |
| `terms` | `/terms` | — | yes | 0.3 |

Each route exists in `uz`, `ru`, and `en`: 21 indexable URLs. `/` redirects to a
locale. The `/v1`, `/v2`, and `/v3` exploration routes and the style switcher
were removed, and an end-to-end test asserts that none of them resolves and that
no rendered link points at one.

## Metadata

`src/lib/seo/metadata.ts` builds every page's metadata from the route key and a
message namespace, so no page assembles its own object. It produces:

- a localized title and description, with the home page taking an absolute title
  and every other page the `%s · Volontyorlar` template;
- a canonical URL on the configured origin;
- `hreflang` alternates for `uz`, `ru`, and `en`, plus `x-default` pointing at
  the Uzbek URL;
- Open Graph type, site name, URL, locale, and alternate locales;
- a `summary_large_image` Twitter card;
- an indexing directive.

Icons come from the `app/` file conventions (`icon.svg`, `apple-icon.png`, and
`favicon.ico`), which is why no `metadata.icons` entry is set. The shared
1200×630 social image lives at `public/opengraph-image.png`; the metadata builder
sets its absolute URL for both Open Graph and Twitter. Keeping it out of the
root app segment avoids asking a file-convention metadata route to inherit
`metadataBase` through the dynamic locale layout.

`src/lib/seo/urls.ts` is the only absolute locale-URL builder. It consumes the
framework-agnostic route registry and the verified marketing origin, and it
adds `x-default` to each alternate set. Navigation never imports this module.

## Indexing policy

Indexing is opt-in and keyed on `NEXT_PUBLIC_SITE_URL`:

| Marketing origin | Page robots meta | `robots.txt` | `sitemap.xml` |
| --- | --- | --- | --- |
| Unset | `noindex, nofollow` | `Disallow: /` | empty |
| Set | `index, follow` | `Allow: /` plus sitemap and host | 21 localized entries |

Each sitemap entry carries the full `hreflang` set, so the three language
versions are reported as alternates of one another.

## Structured data

| Type | Where | Basis |
| --- | --- | --- |
| `Organization` | Home | Name, founding date, founders, country, logo, and any configured channel as `sameAs` |
| `WebSite` | Home | Name, description, locale, publisher reference |
| `BreadcrumbList` | Every page below home | Home plus the current page |

The shared `PageBreadcrumbJsonLd` component supplies the standard localized
home-to-current-page trail. The underlying builder stays pure and accepts
longer trails if the information architecture later gains nested pages.

Nothing emits an aggregate rating, review, address, telephone, or an entity for
a programme that is not publicly available.

## Needs verification

- Production origin and canonical host
- Whether `www` or the apex is canonical, and the redirect that enforces it
- Public channel addresses, which would populate `sameAs`
