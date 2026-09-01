# NextIntlClientProvider serialises the whole catalog by default

Rendering `<NextIntlClientProvider>` from a Server Component with no `messages`
prop forwards the entire request catalog into the HTML of every page. On this
site that was ~16KB of extra markup per document — the privacy and terms copy
was embedded in the home page — for components that need none of it.

The root layout passes only the namespace a Client Component can reach:

```tsx
const messages = await getMessages();
<NextIntlClientProvider messages={{ nav: messages.nav }}>
```

Raw HTML for the home page went from 95KB to 79KB, gzipped from 16.0KB to
11.4KB. Check for a leak by grepping a rendered page for a string that only
exists on another page.

Both client components (`LocaleSwitcher`, `MobileNav`) take their labels as
props from the server, so widening this subset should be a deliberate decision,
not a reflex.
