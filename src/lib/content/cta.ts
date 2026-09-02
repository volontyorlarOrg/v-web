import { channelUrl } from "@/lib/constants/channels";
import { navHref, type RouteKey } from "@/lib/routing/routes";
import { appHref } from "@/lib/seo/origin";

export type Destination = {
  href: string;
  external: boolean;
};

function internal(route: RouteKey): Destination {
  return { href: navHref(route), external: false };
}

export function joinDestination(): Destination {
  const telegram = channelUrl("telegram");
  return telegram ? { href: telegram, external: true } : internal("contact");
}

export function loginDestination(): Destination | null {
  const app = appHref("/login");
  return app ? { href: app, external: true } : null;
}

export function opportunitiesDestination(): Destination {
  const app = appHref("/");
  if (app) return { href: app, external: true };

  const telegram = channelUrl("telegram");
  if (telegram) return { href: telegram, external: true };

  return internal("volunteering");
}
