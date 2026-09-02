# `npm run build` while `next dev` is running serves the page unstyled

`npm run dev` is `next dev --turbopack`; `npm run build` is `next build --webpack`.
They are different bundlers writing to the same `.next/` directory. Running the
build while a dev server is live overwrites the manifests that server is reading
from, and the page it then serves references asset chunks that no longer exist.

The symptom is not an error. The document still returns 200, the markup is
correct, and the browser shows the page with no CSS at all: default serif type,
a blue underlined "Skip to content", and the brand mark at its natural size.
It reads like a broken stylesheet import rather than a tooling collision.

`npm run test:e2e` has the same effect — its `webServer` command runs the build
before starting on port 3210.

Two consequences:

1. Stop the dev server before building, or accept that it needs a restart after.
   Turbopack usually recovers on its next rebuild, but the browser will keep
   showing the broken render until it is hard-reloaded, because it cached it.
2. If the page comes back unstyled, check `.next/BUILD_ID` against `.next/dev`:
   a production timestamp newer than the dev directory is the collision, not a
   CSS bug. `rm -rf .next` and restart clears it.

Related: [[next-typegen-before-typecheck]]
