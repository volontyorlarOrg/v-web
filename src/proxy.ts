import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { LOCALE_COOKIE_NAME } from "./lib/preferences";
import {
  preferredProfileLocale,
  rootPublicUsername,
} from "./lib/public-profiles/routing";

const localize = createMiddleware(routing);
const PROFILE_REWRITE_MARKER = "_volontyorlar_profile";

export default function proxy(request: NextRequest) {
  const internal = /^\/(?:uz|ru|en)\/profiles\/([a-z0-9_]{5,32})\/?$/.exec(
    request.nextUrl.pathname,
  );
  if (internal?.[1]) {
    if (request.nextUrl.searchParams.get(PROFILE_REWRITE_MARKER) === "1") {
      const response = localize(request);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
    return NextResponse.redirect(new URL(`/${internal[1]}`, request.url));
  }

  const username = rootPublicUsername(request.nextUrl.pathname);
  if (!username) return localize(request);
  if (request.nextUrl.pathname !== `/${username}`) {
    return NextResponse.redirect(new URL(`/${username}`, request.url));
  }

  const locale = preferredProfileLocale(
    request.cookies.get(LOCALE_COOKIE_NAME)?.value,
    request.headers.get("accept-language"),
  );
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}/profiles/${username}`;
  destination.searchParams.set(PROFILE_REWRITE_MARKER, "1");
  const response = NextResponse.rewrite(destination);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
