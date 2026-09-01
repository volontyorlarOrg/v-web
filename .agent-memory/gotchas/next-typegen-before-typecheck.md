# `tsc --noEmit` fails on a clean checkout without `next typegen`

`PageProps<"...">`, `LayoutProps<"...">`, and the `next/root-params` types are
generated into `.next/types/`. On a fresh clone, or after deleting a route, a
bare `tsc --noEmit` reports either "Cannot find name 'PageProps'" or stale
errors pointing at files that no longer exist.

`npm run typecheck` therefore runs `next typegen && tsc --noEmit`. If typecheck
reports missing modules for routes that were just deleted, the generated types
are stale: `rm -rf .next tsconfig.tsbuildinfo` and run it again.

Related: `@vitejs/plugin-react` cannot be installed here. Its current major peers
`@babel/core@^8` while the `shadcn` CLI pins `@babel/core@^7`, and npm refuses
the tree. Vitest transforms TSX with esbuild using `jsx: "react-jsx"` from
`tsconfig.json`, so the plugin is not needed.
