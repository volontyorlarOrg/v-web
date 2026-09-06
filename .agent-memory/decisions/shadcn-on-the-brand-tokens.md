# shadcn/ui on the brand tokens, application libraries still out

`feat/ui-libraries` replaced three hand-rolled controls with shadcn/ui
components on `radix-ui`: the mobile navigation is a `Sheet`, the language
switcher a `DropdownMenu` of locale links, the theme toggle a Radix `Switch`,
and `StatusChip` the `status` variant of `Badge`. `buttonClass` stays the
action contract, now beside a `Button` that renders it. Each of the three
controls had grown its own Escape, focus-return and outside-tap handling;
Radix owns that now, and the tests assert the same behaviour against the new
DOM (menu items instead of links, `aria-controls` once the panel exists).

The registry sources are edited on arrival: no oklch palette, no
`tw-animate-css` classes, no `destructive` role. `globals.css` aliases
shadcn's names (`background`, `foreground`, `card`, `popover`, `muted`,
`input`, `ring`, `primary-foreground`, `radius`) onto the brand tokens as
`var()` references, so both themes keep working without a second palette.
`accent` is deliberately not aliased — it is the orange brand token — and a
menu item's focus surface uses `muted` with `primary-ink` instead.

Two choices worth knowing:

- The mobile navigation sheet is **not modal** and renders **without a
  portal**, so it still sits under the header, the header stays reachable
  (the trigger keeps `aria-expanded`), and taps outside close it. A modal
  dialog would have hidden the header from assistive technology.
- Application libraries stay out of this repository. TanStack Query, React
  Hook Form, Zod, `nuqs`, Zustand and auth SDKs belong to the application,
  which owns the forms and backend reads a static marketing site does not
  have. A future contact form is the one thing that could justify React Hook
  Form and Zod here.
