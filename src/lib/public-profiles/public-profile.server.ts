import { cache } from "react";

import { PUBLIC_USERNAME_PATTERN } from "@/lib/public-profiles/routing";

export const PUBLIC_PROFILE_LEVELS = [
  "newcomer",
  "active",
  "trusted",
  "core",
] as const;

export const PUBLIC_PROFILE_REGIONS = [
  "andijan",
  "bukhara",
  "fergana",
  "jizzakh",
  "kashkadarya",
  "khorezm",
  "namangan",
  "navoiy",
  "samarkand",
  "sirdaryo",
  "surkhandarya",
  "tashkent-region",
  "tashkent-city",
  "karakalpakstan",
] as const;

type PublicProfileLevel = (typeof PUBLIC_PROFILE_LEVELS)[number];
type PublicProfileRegion = (typeof PUBLIC_PROFILE_REGIONS)[number];

export type PublicProfile = {
  displayName: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  region: PublicProfileRegion | null;
  languages: string[];
  links: string[];
  level: PublicProfileLevel;
  xp: number;
  stats: { attendedEvents: number; confirmedHours: number };
};

export class PublicProfileLoadError extends Error {}

export const getPublicProfile = cache(async function getPublicProfile(
  username: string,
): Promise<PublicProfile | null> {
  const baseUrl = apiOrigin();
  if (!baseUrl) throw new PublicProfileLoadError("notConfigured");
  let response: Response;
  try {
    response = await fetch(
      new URL(
        `/public/profiles/${encodeURIComponent(username)}`,
        `${baseUrl}/`,
      ),
      { cache: "no-store", signal: AbortSignal.timeout(10_000) },
    );
  } catch (cause) {
    throw new PublicProfileLoadError("unavailable", { cause });
  }
  if (response.status === 404) return null;
  if (!response.ok) throw new PublicProfileLoadError("unavailable");
  const profile = parsePublicProfile(await response.json());
  if (!profile) throw new PublicProfileLoadError("invalidResponse");
  return profile;
});

function apiOrigin() {
  const value = process.env.VOLONTYORLAR_API_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.origin : null;
  } catch {
    return null;
  }
}

export function parsePublicProfile(value: unknown): PublicProfile | null {
  if (!isRecord(value) || !isRecord(value.stats)) return null;
  const region = value.region;
  const avatarUrl = optionalHttpUrl(value.avatarUrl);
  const links = Array.isArray(value.links)
    ? value.links.flatMap((item) => {
        const url = optionalHttpUrl(item);
        return url ? [url] : [];
      })
    : null;
  if (
    typeof value.displayName !== "string" ||
    typeof value.username !== "string" ||
    !PUBLIC_USERNAME_PATTERN.test(value.username) ||
    (value.avatarUrl !== null && avatarUrl === null) ||
    typeof value.bio !== "string" ||
    (region !== null && !includes(PUBLIC_PROFILE_REGIONS, region)) ||
    !Array.isArray(value.languages) ||
    !value.languages.every((item) => typeof item === "string") ||
    links === null ||
    !includes(PUBLIC_PROFILE_LEVELS, value.level) ||
    !nonnegativeNumber(value.xp) ||
    !nonnegativeNumber(value.stats.attendedEvents) ||
    !nonnegativeNumber(value.stats.confirmedHours)
  ) {
    return null;
  }
  return {
    displayName: value.displayName,
    username: value.username,
    avatarUrl,
    bio: value.bio,
    region: region as PublicProfileRegion | null,
    languages: [...value.languages] as string[],
    links,
    level: value.level as PublicProfileLevel,
    xp: value.xp,
    stats: {
      attendedEvents: value.stats.attendedEvents,
      confirmedHours: value.stats.confirmedHours,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includes<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function nonnegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function optionalHttpUrl(value: unknown): string | null {
  if (value === null) return null;
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}
