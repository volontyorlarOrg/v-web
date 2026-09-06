# `Intl.NumberFormat("uz")` renders a different string on the server and in the browser

The home page's traction figures hydrated with a mismatch, and the console
carried two errors that looked unrelated:

```
Hydration failed because the server rendered text didn't match the client.
+ 3,600
- 3 600
Encountered a script tag while rendering React component.
```

`CountUp` formatted with `new Intl.NumberFormat(locale)`. Node and Chrome carry
different CLDR data for Uzbek: Node groups thousands with a no-break space
(`3\u00a0600`), Chrome with a comma (`3,600`). Both agree on Russian (space) and
English (comma), so only `/uz` broke, and only once JavaScript ran — the served
HTML was correct, which is why nothing in the test suite or a screenshot caught
it.

The second error was a symptom of the first. A hydration mismatch makes React
throw away the server's tree and rebuild that subtree on the client, which
re-creates the page's `<script>` elements; React warns because a script created
during a client render never executes. Fixing the mismatch removed both errors.
Do not chase a script warning that appears alongside a hydration failure until
the hydration failure is gone.

The fix is `formatCount` in `src/lib/format.ts`: the site owns the separator per
locale instead of asking the runtime for it. See
[`../../docs/operations/EXTENDING.md`](../../docs/operations/EXTENDING.md).

The general shape of the trap: **anything a Client Component derives from the
platform's own locale, time zone or calendar data is a hydration risk**, because
the server and the browser are two different implementations of it, and they
version independently.
