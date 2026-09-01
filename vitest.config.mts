import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Unit and component tests. There is no Vite React plugin: Vitest's esbuild
 * transform reads `jsx: "react-jsx"` from tsconfig, and adding the plugin would
 * drag in a `@babel/core` major that conflicts with the shadcn CLI.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    unstubEnvs: true,
  },
});
