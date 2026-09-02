import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    ".claude/**",
    ".codex/**",
    ".impeccable/**",
    ".vscode/**",
    "*.tsbuildinfo",
    // Standalone Remotion project with its own tsconfig and dependency graph.
    "video/**",
  ]),
]);

export default eslintConfig;
