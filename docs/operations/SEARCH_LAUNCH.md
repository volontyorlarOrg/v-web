# Getting Volontyorlar Into Search Results

Everything a crawler needs is built and tested. What remains is configuration on
the host and registration with each console. Work top to bottom: nothing below
step 1 has any effect until step 1 is true.

For how each piece behaves in code, read
[`../web/SEO_AND_ROUTES.md`](../web/SEO_AND_ROUTES.md).

## 1. Turn indexing on

Indexing is opt-in and gated on one variable. While `NEXT_PUBLIC_SITE_URL` is
empty the site is deliberately invisible: every page sends `noindex, nofollow`,
`robots.txt` answers `Disallow: /`, and `sitemap.xml` lists nothing. No amount of
submitting will overcome that, and a console will report the sitemap as blocked.

In the Vercel project for this site, confirm the **Production** environment sets:

```text
NEXT_PUBLIC_SITE_URL=https://volontyorlar.uz
```

`NEXT_PUBLIC_*` values are inlined at build time, so a change needs a
redeploy, not a restart. Scope the variable to Production only; a preview
deployment that inherits it advertises a canonical URL it does not serve.

Verify after the deploy:

| URL | Expected |
| --- | --- |
| `https://volontyorlar.uz/robots.txt` | `Allow: /`, plus `Host:` and `Sitemap:` lines |
| `https://volontyorlar.uz/sitemap.xml` | 21 `<loc>` entries, each with four `hreflang` alternates |
| `view-source:https://volontyorlar.uz/uz` | `<meta name="robots" content="index, follow">` |

## 2. Settle the canonical host

Settled on 2026-09-09: the **apex** is canonical, and `www.volontyorlar.uz`
redirects to it in the Vercel domain settings, preserving the path.

That redirect currently answers `307`, which tells Google the move is temporary.
Vercel defaults to `307` and offers `308` in the same status-code selector; `308`
is the one that says the apex is permanent. Until it is changed, the canonical
tag on every `www` page carries the signal on its own.

## 3. Prove ownership

Done for Google on 2026-09-09: a Search Console **Domain** property for
`volontyorlar.uz`, verified by DNS `TXT` at aHOST. Yandex and Bing still need it.

Each console needs proof the domain is yours. Two methods work; prefer the first.

**DNS TXT record (recommended).** Add the record the console gives you at the
registrar for `volontyorlar.uz`. It needs no code change, survives a host
change, covers `app.volontyorlar.uz` too, and does not depend on a console
following the `/` → `/uz` redirect.

**HTML meta tag.** Set the matching variable in the Vercel project and redeploy.
Paste the bare token from the console's `content="…"`, never the whole tag:

| Console | Variable |
| --- | --- |
| Google Search Console | `GOOGLE_SITE_VERIFICATION` |
| Yandex Webmaster | `YANDEX_VERIFICATION` |
| Bing Webmaster Tools | `BING_SITE_VERIFICATION` |

`npm run verify:release` rejects a value that is not a bare token.

## 4. Register with each console

Uzbekistan is a two-engine market. Google and Yandex both matter; Bing is cheap
to add and feeds DuckDuckGo and several assistants.

| Console | Where | Submit |
| --- | --- | --- |
| Google Search Console | `search.google.com/search-console` | Done: Domain property added, `https://volontyorlar.uz/sitemap.xml` accepted 2026-09-09 |
| Yandex Webmaster | `webmaster.yandex.com` | Add the site, then add the same sitemap URL under **Indexing → Sitemap files** |
| Bing Webmaster Tools | `bing.com/webmasters` | Import the Google Search Console property, which carries the sitemap across |

A Domain property in Google covers every subdomain and both `http` and `https`,
which is why it is worth the DNS record over a URL-prefix property.

A sitemap submitted before step 1 was true reports `Couldn't fetch` with an empty
**Last read**, and clears itself once Google refetches; it does not need
resubmitting. Remove any sitemap row left over from a previous site on the
domain, so the report shows only URLs you actually publish.

After the sitemap is accepted, use **URL Inspection** on
`https://volontyorlar.uz/uz` and request indexing once. Do not request it
repeatedly; it does not accelerate anything.

## 5. Confirm what the crawler sees

| Check | Tool |
| --- | --- |
| Structured data parses, with no errors | Google Rich Results Test on the home page |
| The three language versions are seen as one page in three languages | Search Console → **International Targeting**, or the sitemap's `hreflang` entries |
| The social card renders | Any Open Graph preview tool on `/uz`, `/ru`, and `/en` |
| Core Web Vitals | PageSpeed Insights on the home page, mobile profile first |

## 6. Expect it to take time

Indexing is not instant and not owed. A new domain typically takes days to a few
weeks to appear for its own name, and longer for anything competitive. The
things that actually move it after this checklist are outside the repository:
links from the Telegram channel and Instagram profile, mentions by partner
organisations, and pages worth linking to.

## What is already done

No work is needed on any of these; they ship with the site.

- `robots.txt` and a 21-URL localized `sitemap.xml`, both origin-gated
- Canonical URL and `uz` / `ru` / `en` / `x-default` `hreflang` on every page
- Localized title and description per page
- Open Graph and `summary_large_image` Twitter cards with a 1200×630 image
- `Organization`, `WebSite`, and `BreadcrumbList` structured data
- Favicon, SVG icon, Apple touch icon, and a web app manifest
- A `noindex` 404
- Static generation of every page, so there is nothing for a crawler to wait on
