import { channelUrl } from "@/lib/constants/channels";
import { navHref, type RouteKey } from "@/lib/routing/routes";
import { appHref } from "@/lib/seo/origin";

export type Destination = {
  /** Internal hrefs are locale-agnostic and belong to `@/i18n/navigation`. */
  href: string;
  /** External destinations render as a plain anchor with `rel` protection. */
  external: boolean;
};

function internal(route: RouteKey): Destination {
  return { href: navHref(route), external: false };
}

/**
 * The main "join us" action.
 *
 * It points at the Telegram community when that URL has been configured, which
 * is the only community destination this repository can verify. Otherwise it
 * falls back to the contact page instead of inventing a link.
 */
export function joinDestination(): Destination {
  const telegram = channelUrl("telegram");
  return telegram ? { href: telegram, external: true } : internal("contact");
}

/**
 * The action that leads to live opportunities.
 *
 * Browsing, filtering, and applying belong to the separate YVC application, so
 * this resolves to the product app when its origin is configured, then to the
 * Telegram community, and finally to the page that explains volunteering.
 */
export function opportunitiesDestination(): Destination {
  const app = appHref("/");
  if (app) return { href: app, external: true };

  const telegram = channelUrl("telegram");
  if (telegram) return { href: telegram, external: true };

  return internal("volunteering");
}
