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

export type PublicPastEvent = {
  id: string;
  title: string;
  organization: string;
  eventDate: string;
  hours: number;
  xpAwarded: number;
  countsTowardProgress: boolean;
};

export type PublicProfile = {
  displayName: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  region: PublicProfileRegion | null;
  city: string;
  school: string;
  gradeYear: string;
  languages: string[];
  phone: string;
  telegram: string;
  instagram: string;
  linkedin: string;
  links: string[];
  joinedAt: string;
  level: PublicProfileLevel;
  xp: number;
  stats: { attendedEvents: number; confirmedHours: number };
  pastEvents: PublicPastEvent[];
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
  const linkedin =
    value.linkedin === "" ? "" : optionalLinkedinUrl(value.linkedin);
  const links = Array.isArray(value.links)
    ? value.links.flatMap((item) => {
        const url = optionalHttpUrl(item);
        return url ? [url] : [];
      })
    : null;
  const pastEvents = parsePastEvents(value.pastEvents);
  if (
    typeof value.displayName !== "string" ||
    typeof value.username !== "string" ||
    !PUBLIC_USERNAME_PATTERN.test(value.username) ||
    (value.avatarUrl !== null && avatarUrl === null) ||
    typeof value.bio !== "string" ||
    (region !== null && !includes(PUBLIC_PROFILE_REGIONS, region)) ||
    typeof value.city !== "string" ||
    typeof value.school !== "string" ||
    typeof value.gradeYear !== "string" ||
    !Array.isArray(value.languages) ||
    !value.languages.every((item) => typeof item === "string") ||
    typeof value.phone !== "string" ||
    typeof value.telegram !== "string" ||
    typeof value.instagram !== "string" ||
    typeof value.linkedin !== "string" ||
    linkedin === null ||
    links === null ||
    pastEvents === null ||
    typeof value.joinedAt !== "string" ||
    Number.isNaN(Date.parse(value.joinedAt)) ||
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
    city: value.city,
    school: value.school,
    gradeYear: value.gradeYear,
    languages: [...value.languages] as string[],
    phone: value.phone,
    telegram: value.telegram,
    instagram: value.instagram,
    linkedin,
    links,
    joinedAt: value.joinedAt,
    level: value.level as PublicProfileLevel,
    xp: value.xp,
    stats: {
      attendedEvents: value.stats.attendedEvents,
      confirmedHours: value.stats.confirmedHours,
    },
    pastEvents,
  };
}

function parsePastEvents(value: unknown): PublicPastEvent[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  const events: PublicPastEvent[] = [];
  for (const item of value) {
    if (
      !isRecord(item) ||
      typeof item.id !== "string" ||
      typeof item.title !== "string" ||
      typeof item.organization !== "string" ||
      typeof item.eventDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.eventDate) ||
      !nonnegativeNumber(item.hours) ||
      !Number.isInteger(item.xpAwarded) ||
      !nonnegativeNumber(item.xpAwarded) ||
      typeof item.countsTowardProgress !== "boolean"
    )
      return null;
    events.push({
      id: item.id,
      title: item.title,
      organization: item.organization,
      eventDate: item.eventDate,
      hours: item.hours,
      xpAwarded: item.xpAwarded,
      countsTowardProgress: item.countsTowardProgress,
    });
  }
  return events;
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

function optionalLinkedinUrl(value: unknown): string | null {
  const href = optionalHttpUrl(value);
  if (!href) return null;
  const url = new URL(href);
  const host = url.hostname.replace(/^www\./i, "").toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);
  return url.protocol === "https:" &&
    host === "linkedin.com" &&
    parts.length === 2 &&
    parts[0] === "in" &&
    /^[A-Za-z0-9_-]+$/.test(parts[1] ?? "")
    ? `https://www.linkedin.com/in/${parts[1]}`
    : null;
}
