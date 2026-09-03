import type { Locale } from "@/i18n/routing";

export type RouteKey =
  | "home"
  | "about"
  | "partners"
  | "volunteering"
  | "contact"
  | "privacy"
  | "terms";

type PublicRoutePriority = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

type PublicRouteChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type PublicRoute = {
  key: RouteKey;
  path: string;
  inMainNav: boolean;
  inLegalNav: boolean;
  priority: PublicRoutePriority;
  changeFrequency: PublicRouteChangeFrequency;
};

export const publicRoutes: readonly PublicRoute[] = [
  { key: "home", path: "", inMainNav: false, inLegalNav: false, priority: 1, changeFrequency: "monthly" },
  { key: "volunteering", path: "/volunteering", inMainNav: true, inLegalNav: false, priority: 0.9, changeFrequency: "monthly" },
  { key: "partners", path: "/partners", inMainNav: true, inLegalNav: false, priority: 0.7, changeFrequency: "monthly" },
  { key: "about", path: "/about", inMainNav: true, inLegalNav: false, priority: 0.7, changeFrequency: "monthly" },
  { key: "contact", path: "/contact", inMainNav: true, inLegalNav: false, priority: 0.6, changeFrequency: "yearly" },
  { key: "privacy", path: "/privacy", inMainNav: false, inLegalNav: true, priority: 0.3, changeFrequency: "yearly" },
  { key: "terms", path: "/terms", inMainNav: false, inLegalNav: true, priority: 0.3, changeFrequency: "yearly" },
] as const;

export const mainNavRoutes = publicRoutes.filter((route) => route.inMainNav);
export const legalNavRoutes = publicRoutes.filter((route) => route.inLegalNav);

export function getRoute(key: RouteKey): PublicRoute {
  const route = publicRoutes.find((candidate) => candidate.key === key);
  if (!route) throw new Error(`Unknown public route: ${key}`);
  return route;
}

export function navHref(key: RouteKey): string {
  return getRoute(key).path || "/";
}

export function localePath(locale: Locale, key: RouteKey): string {
  return `/${locale}${getRoute(key).path}`;
}
