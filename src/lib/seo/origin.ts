const DEVELOPMENT_ORIGIN = "http://localhost:3000";

function readOrigin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function hasVerifiedMarketingOrigin(): boolean {
  return readOrigin(process.env.NEXT_PUBLIC_SITE_URL) !== null;
}

export function marketingOrigin(): string {
  return readOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? DEVELOPMENT_ORIGIN;
}

export function appOrigin(): string | null {
  return readOrigin(process.env.NEXT_PUBLIC_APP_ORIGIN);
}

export function appHref(path = "/"): string | null {
  const origin = appOrigin();
  if (!origin) return null;
  return new URL(path, `${origin}/`).toString();
}

export function marketingUrl(path: string): string {
  return new URL(path, `${marketingOrigin()}/`).toString();
}
