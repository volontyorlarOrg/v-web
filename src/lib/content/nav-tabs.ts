import { navHref, type RouteKey } from "@/lib/routing/routes";

export type NavTab = {
  id: string;
  route: RouteKey;
  fragment?: string;
};

export const NAV_TABS_MOCK: readonly NavTab[] = [
  { id: "volunteering", route: "volunteering" },
  { id: "events", route: "home", fragment: "sources" },
  { id: "partners", route: "partners" },
  { id: "about", route: "about" },
  { id: "contact", route: "contact" },
];

export function navTabPath(tab: NavTab): string {
  return navHref(tab.route);
}

export function navTabHref(tab: NavTab): string {
  const path = navTabPath(tab);
  return tab.fragment ? `${path}#${tab.fragment}` : path;
}
