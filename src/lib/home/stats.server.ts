import "server-only";

import { LIVE_COUNT_FALLBACK } from "@/lib/content/home";

export const STATS_REVALIDATE_SECONDS = 60;

function apiOrigin(): string | null {
  const value = process.env.VOLONTYORLAR_API_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : null;
  } catch {
    return null;
  }
}

export function readVolunteerTotal(body: unknown): number | null {
  if (!body || typeof body !== "object") return null;
  const value = (body as { volunteerTotal?: unknown }).volunteerTotal;
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.trunc(value) : null;
}

export async function fetchVolunteerTotal(): Promise<number | null> {
  const origin = apiOrigin();
  if (!origin) return null;
  try {
    const response = await fetch(`${origin}/public/stats`, {
      next: { revalidate: STATS_REVALIDATE_SECONDS, tags: ["home-stats"] },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    return readVolunteerTotal(await response.json());
  } catch {
    return null;
  }
}

export async function volunteerTotalOrFallback(): Promise<number> {
  return (await fetchVolunteerTotal()) ?? LIVE_COUNT_FALLBACK;
}
