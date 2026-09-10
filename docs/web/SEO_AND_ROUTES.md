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

Icons come from the `app/` file conventions (`favicon.ico`, `icon.png`,
`icon.svg`, and `apple-icon.png`), which is why no `metadata.icons` entry is set.
Next.js emits one `<link>` per file and derives `type` and `sizes` from the file
itself.

`icon.png` is 192×192 and exists for search results specifically. Google's
supported favicon formats are BMP, GIF, ICO, PNG, JPEG, PPM and TIFF — **not
SVG** — and it recommends larger than 48×48. That left `favicon.ico` as the only
candidate, and Next.js reads the first frame of an `.ico` to fill the attribute,
so it is declared `sizes="16x16"` even though the file packs 16 through 256. The
PNG removes the ambiguity. A smoke test fails if the only remaining icon is an
SVG, or if no raster icon reaches 48px. The shared
1200×630 social image lives at `public/opengraph-image.png`; the metadata builder
sets its absolute URL for both Open Graph and Twitter. Keeping it out of the
root app segment avoids asking a file-convention metadata route to inherit
`metadataBase` through the dynamic locale layout.

When a search-engine token is configured, the localized layout also emits the
matching ownership meta tag. See *Ownership verification* below.

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

## Ownership verification

`src/lib/seo/verification.ts` turns three server-only variables into the meta
tags a webmaster console looks for when it asks you to prove the property is
yours:

| Variable | Meta tag | Console |
| --- | --- | --- |
| `GOOGLE_SITE_VERIFICATION` | `google-site-verification` | Google Search Console |
| `YANDEX_VERIFICATION` | `yandex-verification` | Yandex Webmaster |
| `BING_SITE_VERIFICATION` | `msvalidate.01` | Bing Webmaster Tools |

They carry no `NEXT_PUBLIC_` prefix because nothing in the browser bundle reads
them; they reach the browser as HTML on their own. Each is blank by default, and
the whole `verification` object is omitted when all three are, so an
unconfigured deployment claims no property.

A value must be a bare token of 8 to 128 characters from `A-Z a-z 0-9 _ . = -`.
Anything else — most often the entire `<meta …>` element pasted from the
console — is refused, so a mistake degrades to no tag instead of an escaped,
permanently failing one. `npm run verify:release` reports the same rejection
before a deploy rather than after.

Verifying by DNS `TXT` record instead needs none of these variables, and is the
better choice here: `/` redirects to a locale, so the HTML-tag method depends on
the console following that redirect. A DNS record also survives a host change
and covers every subdomain at once.

## Web app manifest

`src/app/manifest.ts` is served at `/manifest.webmanifest` and linked from every
page. It exists for the phone visitor arriving from Telegram who saves the site
to a home screen: without it the shortcut has no name and no icon.

`start_url` is `/`, not a locale, so the proxy still negotiates the visitor's
language when the shortcut launches. `background_color` and `theme_color` are
the light theme's own `--color-paper` and `--color-action`; a manifest is JSON
and cannot read a token, so `src/app/manifest.test.ts` parses `globals.css` and
compares the two values, and the copy cannot drift.

Every icon is declared `purpose: "any"`. The blue tile has rounded corners and
therefore transparent ones, and a platform mask applied to a `maskable` icon
would cut into them.

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

## Taking the site live in search

The order matters, and every step after the first depends on the origin being
configured. [`../operations/SEARCH_LAUNCH.md`](../operations/SEARCH_LAUNCH.md)
carries the full checklist, including what to submit to each console.

## Needs verification

- Whether `www` or the apex is canonical, and the redirect that enforces it
- Public channel addresses, which would populate `sameAs`
- Whether `lastmod` should stay at build time. Every deploy currently restamps
  all 21 URLs, which is honest about the deployment but not about the content;
  Google ignores a `lastmod` it finds unreliable, so the field is inert either
  way until a real per-page change date exists
