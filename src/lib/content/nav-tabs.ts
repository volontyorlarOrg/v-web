import { navHref, type RouteKey } from "@/lib/routing/routes";

export type HeaderNavItem = {
  id: string;
  route: RouteKey;
  fragment?: string;
};

export const HEADER_NAV_ITEMS: readonly HeaderNavItem[] = [
  { id: "opportunities", route: "opportunities" },
  { id: "organisations", route: "organisations" },
  { id: "about", route: "about" },
  { id: "blog", route: "blog" },
  { id: "contact", route: "contact" },
];

export function headerNavPath(item: HeaderNavItem): string {
  return navHref(item.route);
}

export function headerNavHref(item: HeaderNavItem): string {
  const path = headerNavPath(item);
  return item.fragment ? `${path}#${item.fragment}` : path;
}
