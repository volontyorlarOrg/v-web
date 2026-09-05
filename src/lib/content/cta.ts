import type { Locale } from "@/i18n/routing";
import { channelUrl } from "@/lib/constants/channels";
import { navHref, type RouteKey } from "@/lib/routing/routes";
import { appHref } from "@/lib/seo/origin";

export type Destination = {
  href: string;
  external: boolean;
  newTab: boolean;
};

function internal(route: RouteKey): Destination {
  return { href: navHref(route), external: false, newTab: false };
}

function app(path: string): Destination | null {
  const href = appHref(path);
  return href ? { href, external: true, newTab: false } : null;
}

export function joinDestination(): Destination {
  const telegram = channelUrl("telegram");
  return telegram ? { href: telegram, external: true, newTab: true } : internal("contact");
}

export function loginDestination(locale: Locale): Destination | null {
  return app(`/${locale}/login`);
}

export function opportunitiesDestination(locale: Locale): Destination | null {
  return app(`/${locale}`);
}
