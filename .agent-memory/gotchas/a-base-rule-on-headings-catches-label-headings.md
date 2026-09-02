# Styling `h1, h2` in the base layer also restyles headings that are labels

The display serif is applied from a base rule rather than a class, so a heading
is serif by default and no component has to remember:

```css
h1, h2, .display-face { font-family: var(--font-serif); font-weight: 400; }
```

That is right for every heading a reader is meant to *read*. It is wrong for the
headings that exist only to name a region of the page — the footer's `SITE` and
`LEGAL` column headings, and the metadata headings in `PageHero`. Those are
`h2` for the document outline and screen readers, but they are 12px uppercase
tracked labels by voice, and the rule turned them into tiny serif capitals.

They now opt back in explicitly with `font-sans`, which reads as a decision at
the point of use rather than as an oversight.

The general shape of the trap: **an element's tag says what it is in the
document, not what it looks like.** Any base rule keyed on a tag will catch
every use of that tag, including the ones chosen for semantics alone. Before
adding one, grep for the tag and look at what is already using it.

`src/app/typography.test.ts` guards the other half of this — that nothing sets
the display faces bold, which is the one change that would undo the register.

Related: [[three-js-scoped-to-the-hero-map]]
