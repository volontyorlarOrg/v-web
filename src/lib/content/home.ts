import { FOUNDERS } from "@/lib/content/org";

export const LIVE_COUNT_FALLBACK = 3940;

export const LIVE_COUNT_REFRESH_MS = 30_000;

export type JoinerTone = "blue" | "orange" | "slate" | "sky" | "amber" | "lime";

export const SAMPLE_JOINERS: ReadonlyArray<{ initials: string; tone: JoinerTone }> = [
  { initials: "MK", tone: "blue" },
  { initials: "JR", tone: "orange" },
  { initials: "DS", tone: "slate" },
  { initials: "AU", tone: "sky" },
  { initials: "NB", tone: "amber" },
  { initials: "SH", tone: "lime" },
  { initials: "OT", tone: "blue" },
  { initials: "ZR", tone: "orange" },
];

export type PartnerLogo = {
  id: "youth-affairs-agency" | "chilonzor-district" | "youth-volunteer-club" | "youth-run-club" | "youth-for-good";
  src: string;
  width: number;
  height: number;
  displayHeight: number;
};

export const PARTNER_LOGOS: readonly PartnerLogo[] = [
  { id: "youth-affairs-agency", src: "/partners/youth-affairs-agency.png", width: 344, height: 64, displayHeight: 44 },
  { id: "chilonzor-district", src: "/partners/chilonzor-district.png", width: 416, height: 249, displayHeight: 62 },
  { id: "youth-volunteer-club", src: "/opportunity-sources/youth-volunteer-club.svg", width: 263, height: 100, displayHeight: 52 },
  { id: "youth-run-club", src: "/opportunity-sources/youth-run-club.svg", width: 269, height: 100, displayHeight: 52 },
  { id: "youth-for-good", src: "/opportunity-sources/youth-for-good.svg", width: 275, height: 100, displayHeight: 52 },
];

export type OpportunityKind = "volunteering" | "competition";

export type SampleOpportunity = {
  slug: string;
  title: string;
  organizer: string;
  kind: OpportunityKind;
  hours: number | null;
  xp: { min: number; max: number };
  startsAt: string;
  endsAt: string;
  place: string;
  applications: number;
  cover: { src: string; width: number; height: number };
  tint: "blue" | "violet" | "sand";
};

export const SAMPLE_OPPORTUNITIES: readonly SampleOpportunity[] = [
  {
    slug: "1001-talant-xalqaro-san-at-ko-rik-tanlovi-adb37d19",
    title: "1001 Talant — Xalqaro sanʼat koʻrik tanlovi",
    organizer: "Youth Volunteer Club",
    kind: "volunteering",
    hours: 40,
    xp: { min: 400, max: 400 },
    startsAt: "2026-11-27T03:00:00.000Z",
    endsAt: "2026-11-30T13:00:00.000Z",
    place: "R. Glier nomidagi musiqa maktabi",
    applications: 68,
    cover: { src: "/opportunities/1001-talant.webp", width: 1599, height: 900 },
    tint: "blue",
  },
  {
    slug: "volontyorlik-olamiga-birinchi-qadam-ochiq-eshiklar-kuni-8540b650",
    title: "Volontyorlik olamiga birinchi qadam | Ochiq eshiklar kuni",
    organizer: "Youth Volunteer Club",
    kind: "competition",
    hours: null,
    xp: { min: 20, max: 50 },
    startsAt: "2026-11-21T06:30:00.000Z",
    endsAt: "2026-11-21T09:00:00.000Z",
    place: "Yoshlar ishlari agentligi Toshkent shahar boshqarmasi",
    applications: 162,
    cover: { src: "/opportunities/birinchi-qadam.webp", width: 1599, height: 900 },
    tint: "violet",
  },
  {
    slug: "hospitality-investment-forum-tashkent-2026-b9d9e0dd",
    title: "Hospitality Investment Forum Tashkent 2026",
    organizer: "Youth Volunteer Club",
    kind: "volunteering",
    hours: 17,
    xp: { min: 170, max: 170 },
    startsAt: "2026-11-17T03:30:00.000Z",
    endsAt: "2026-11-18T12:00:00.000Z",
    place: "Hilton mehmonxonasi, Toshkent",
    applications: 184,
    cover: { src: "/opportunities/hospitality-investment-forum.webp", width: 900, height: 900 },
    tint: "sand",
  },
  {
    slug: "yvc-volontyorlari-uchun-bepul-fanzone-chiptalari-2d5b9294",
    title: "Volontyorlar uchun bepul FANZONE chiptalari",
    organizer: "Youth Volunteer Club",
    kind: "competition",
    hours: null,
    xp: { min: 10, max: 50 },
    startsAt: "2026-11-15T14:00:00.000Z",
    endsAt: "2026-11-15T16:00:00.000Z",
    place: "Humo Arena, Toshkent",
    applications: 256,
    cover: { src: "/opportunities/fanzone-tickets.webp", width: 900, height: 900 },
    tint: "blue",
  },
  {
    slug: "no-mirror-media-or-organizational-volunteer-f1e84073",
    title: "NO MIRROR — Media or Organizational Volunteer",
    organizer: "Youth Volunteer Club",
    kind: "volunteering",
    hours: 4,
    xp: { min: 40, max: 40 },
    startsAt: "2026-11-08T09:00:00.000Z",
    endsAt: "2026-11-08T13:00:00.000Z",
    place: "Satashkent, Chilonzor",
    applications: 236,
    cover: { src: "/opportunities/no-mirror.webp", width: 774, height: 900 },
    tint: "violet",
  },
  {
    slug: "bmca-uz-heimtextil-uzbekistan-2026-ko-rgazmasiga-volontyorlarni-taklif-qiladi-64a7bdef",
    title: "Heimtextil Uzbekistan 2026 koʻrgazmasi",
    organizer: "Youth Volunteer Club",
    kind: "volunteering",
    hours: 24,
    xp: { min: 240, max: 240 },
    startsAt: "2026-10-12T08:00:00.000Z",
    endsAt: "2026-10-14T17:00:00.000Z",
    place: "Oʻzekspomarkaz",
    applications: 58,
    cover: { src: "/opportunities/heimtextil-uzbekistan.webp", width: 900, height: 900 },
    tint: "sand",
  },
];

export type LevelId = "newcomer" | "volunteer" | "supervisor" | "coordinator" | "leader";

export type LevelStep = {
  id: LevelId;
  hours: number;
  look: "plain" | "plain-blue" | "plain-band" | "blue" | "navy";
  tilt: number;
};

export const LEVEL_STEPS: readonly LevelStep[] = [
  { id: "newcomer", hours: 0, look: "plain", tilt: -2.2 },
  { id: "volunteer", hours: 10, look: "plain-blue", tilt: 1.6 },
  { id: "supervisor", hours: 50, look: "plain-band", tilt: -1.2 },
  { id: "coordinator", hours: 100, look: "blue", tilt: 2 },
  { id: "leader", hours: 250, look: "navy", tilt: -1.4 },
];

const founder = (id: (typeof FOUNDERS)[number]["id"]) =>
  FOUNDERS.find((person) => person.id === id)?.name ?? id;

export type PodiumPlace = { place: 1 | 2 | 3; name: string; xp: number };

export const SAMPLE_PODIUM: readonly PodiumPlace[] = [
  { place: 1, name: founder("abdulaziz"), xp: 220 },
  { place: 2, name: founder("arslon"), xp: 200 },
  { place: 3, name: "Parizoda Abdurakhimova", xp: 200 },
];

export type TeamPhoto = {
  id: "youth-volunteer-club" | "fintech-forum" | "youth-run-club" | "concert-crew" | "concert-tickets" | "school-team" | "charity-drive" | "flag-hall";
  src: string;
  width: number;
  height: number;
};

const photo = (id: TeamPhoto["id"], width: number, height: number): TeamPhoto => ({
  id,
  src: `/team/${id}.jpg`,
  width,
  height,
});

export const TEAM_ROWS: readonly (readonly TeamPhoto[])[] = [
  [
    photo("youth-volunteer-club", 1400, 1050),
    photo("fintech-forum", 1400, 933),
    photo("youth-run-club", 1280, 720),
    photo("concert-crew", 1050, 1400),
    photo("concert-tickets", 1400, 933),
  ],
  [
    photo("school-team", 1400, 1050),
    photo("charity-drive", 1400, 1050),
    photo("flag-hall", 1400, 788),
    photo("youth-volunteer-club", 1400, 1050),
    photo("concert-crew", 1050, 1400),
  ],
];

export const FAQ_IDS = [
  "who",
  "signup",
  "xp",
  "levels",
  "profile",
  "alerts",
  "organisations",
] as const;

export const USERNAME_PATTERN = /^[a-z0-9_]{5,32}$/;

export const USERNAME_MAX_LENGTH = 32;

export type UsernameCheck = "empty" | "short" | "invalid" | "ok";

export function normaliseUsername(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "").replace(/^@+/, "");
}

export function checkUsername(value: string): UsernameCheck {
  if (value.length === 0) return "empty";
  if (!/^[a-z0-9_]*$/.test(value)) return "invalid";
  if (value.length < 5) return "short";
  return USERNAME_PATTERN.test(value) ? "ok" : "invalid";
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
