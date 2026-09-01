import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed Middleware to Proxy; the contract is unchanged, so
 * next-intl's middleware factory is used here.
 *
 * Its only job is locale routing: send a prefix-less URL to the best matching
 * locale using `Accept-Language`, falling back to Uzbek. No locale cookie is
 * written (see `i18n/routing.ts`), so the URL stays the single source of
 * language state and every page remains cacheable.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything that looks like a file so
  // static assets never pay for a proxy hop.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
