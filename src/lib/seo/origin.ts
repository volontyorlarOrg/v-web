/**
 * Central origin helpers.
 *
 * No production hostname is proven by this repository, so nothing here invents
 * one. Every origin comes from configuration, and the site degrades honestly
 * when a value is missing: unverified marketing origin means the pages are not
 * offered to search engines, and a missing product-app origin means the app
 * links are simply not rendered.
 */

const DEVELOPMENT_ORIGIN = "http://localhost:3000";

function readOrigin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    // Normalise: origin only, no trailing slash, no path.
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * `true` only when a marketing origin has been configured. Robots and metadata
 * use this to decide whether the deployment may be indexed at all.
 */
export function hasVerifiedMarketingOrigin(): boolean {
  return readOrigin(process.env.NEXT_PUBLIC_SITE_URL) !== null;
}

/** Canonical marketing origin, falling back to the local development host. */
export function marketingOrigin(): string {
  return readOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? DEVELOPMENT_ORIGIN;
}

/** Origin of the separate authenticated YVC application, or `null` if unknown. */
export function appOrigin(): string | null {
  return readOrigin(process.env.NEXT_PUBLIC_APP_ORIGIN);
}

/**
 * Absolute URL into the product application, or `null` when the app origin has
 * not been verified yet. Callers must handle `null` rather than guess a host.
 */
export function appHref(path = "/"): string | null {
  const origin = appOrigin();
  if (!origin) return null;
  return new URL(path, `${origin}/`).toString();
}

/** Absolute URL on the marketing origin. */
export function marketingUrl(path: string): string {
  return new URL(path, `${marketingOrigin()}/`).toString();
}
