# Scroll-driven CSS reveals leave sections blank in screenshots

A CSS-only section reveal was built with `animation-timeline: view()` behind an
`@supports` guard — no JavaScript, no observer, correct for real scrolling
visitors, and it was verified to reach `opacity: 1` when scrolled into view.

It was still removed. Any context that renders the document without scrolling
gets the pre-animation state, which is `opacity: 0`:

- Chromium full-page screenshots (`page.screenshot({fullPage: true})`);
- print and PDF pipelines;
- screenshot-based preview and SEO tools.

On a marketing site whose pages get screenshotted and shared with partners and
schools, "half the sections are blank in the screenshot" is a worse outcome than
"the page does not animate". If a reveal is ever wanted again, it must not
animate `opacity`, and it needs a `@media print` escape.

The symptom is easy to misread as a build or CSS failure, because the page looks
correct in a browser and broken in every capture.
