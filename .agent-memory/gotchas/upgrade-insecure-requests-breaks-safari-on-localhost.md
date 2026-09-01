# `upgrade-insecure-requests` served over HTTP breaks Safari, not Chrome

The site's CSP carried `upgrade-insecure-requests` on every response, including
`next dev` on `http://localhost:3000`. In Safari the page rendered with no CSS
at all: default serif type, a visible blue "Skip to content", the brand mark at
natural size. Chrome rendered it perfectly.

Chromium exempts `localhost` from the upgrade because it treats it as a
potentially trustworthy origin. WebKit does not. So Safari rewrote every
subresource to `https://localhost:3000/...` and failed all of them with
"A TLS error caused the secure connection to fail" — the dev server speaks
plain HTTP on that port. The document itself was already loaded, so the page
returned 200 with correct markup and no styles or scripts.

Two things this costs an hour if you do not know it:

1. **It looks like a build problem.** Unstyled output after a tooling change
   reads as a broken stylesheet import or a clobbered `.next`. It is neither,
   and it reproduces on a completely clean checkout.
2. **It is invisible in Chrome.** Verifying in Chromium — or in Playwright's
   default browser — proves nothing about it. Reproduce with Playwright's
   `webkit`, which is the same engine as Safari:

   ```js
   page.on("requestfailed", (r) => console.log(r.url(), r.failure()?.errorText));
   ```

`src/lib/security/headers.ts` now gates that directive and HSTS behind
`secureTransport`, which is `NODE_ENV === "production"`. Any future header that
describes a TLS deployment belongs behind the same flag.

Related: [[building-while-the-dev-server-runs-unstyles-the-page]]
