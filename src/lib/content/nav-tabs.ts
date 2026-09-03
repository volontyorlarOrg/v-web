import { navHref, type RouteKey } from "@/lib/routing/routes";

export type HeaderNavItem = {
  id: string;
  route: RouteKey;
  fragment?: string;
};

export const HEADER_NAV_ITEMS: readonly HeaderNavItem[] = [
  { id: "volunteering", route: "volunteering" },
  { id: "events", route: "home", fragment: "sources" },
  { id: "partners", route: "partners" },
  { id: "about", route: "about" },
  { id: "contact", route: "contact" },
];

export function headerNavPath(item: HeaderNavItem): string {
  return navHref(item.route);
}

export function headerNavHref(item: HeaderNavItem): string {
  const path = headerNavPath(item);
  return item.fragment ? `${path}#${item.fragment}` : path;
}
