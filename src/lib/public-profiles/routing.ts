import type { Locale } from "@/i18n/routing";

export const PUBLIC_USERNAME_PATTERN = /^[a-z0-9_]{5,32}$/;

export const RESERVED_PUBLIC_SEGMENTS = new Set([
  "_next",
  "_vercel",
  "about",
  "admin",
  "applications",
  "contact",
  "dashboard",
  "leaderboard",
  "login",
  "opportunities",
  "partners",
  "privacy",
  "profile",
  "profiles",
  "record",
  "saved",
  "settings",
  "signup",
  "staff",
  "terms",
  "volunteering",
  "welcome",
]);

export function rootPublicUsername(pathname: string): string | null {
  const match = /^\/([^/]+)\/?$/.exec(pathname);
  if (!match?.[1]) return null;
  let username: string;
  try {
    username = decodeURIComponent(match[1]).toLowerCase();
  } catch {
    return null;
  }
  if (!PUBLIC_USERNAME_PATTERN.test(username)) return null;
  return RESERVED_PUBLIC_SEGMENTS.has(username) ? null : username;
}

export function preferredProfileLocale(
  cookie: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (cookie === "uz" || cookie === "ru" || cookie === "en") return cookie;
  const preferences = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag = "", quality = "q=1"] = part.trim().split(";");
      return {
        locale: tag.toLowerCase().split("-")[0],
        quality: Number(quality.replace(/^q=/, "")) || 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);
  const match = preferences.find((item) =>
    ["uz", "ru", "en"].includes(item.locale ?? ""),
  )?.locale;
  return match === "ru" || match === "en" ? match : "uz";
}
