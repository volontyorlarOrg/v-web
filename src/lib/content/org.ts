export const ORGANIZATION_NAME = "Volontyorlar";

export const FOUNDED_ON = "2026-08-24";

export type FounderRole = "ceo" | "cto";

export type FounderProfileId = "telegram" | "linkedin";

export type Founder = {
  id: string;
  name: string;
  role: FounderRole;
  profiles: Readonly<Record<FounderProfileId, string>>;
};

export const FOUNDERS = [
  {
    id: "arslon",
    name: "Arslon Rajabov",
    role: "ceo",
    profiles: {
      telegram: "https://t.me/ars1on",
      linkedin: "https://www.linkedin.com/in/rajabov/",
    },
  },
  {
    id: "abdulaziz",
    name: "Abdulaziz Yusupaliev",
    role: "cto",
    profiles: {
      telegram: "https://t.me/d_vaderrr",
      linkedin: "https://www.linkedin.com/in/abdulaziz-yusupaliev-521166377/",
    },
  },
] as const satisfies ReadonlyArray<Founder>;

export const FOUNDER_PROFILE_IDS = ["telegram", "linkedin"] as const satisfies ReadonlyArray<FounderProfileId>;

export const TRACTION = {
  telegramFollowers: 4000,
  instagramFollowers: 300,
  eventsSupplied: 50,
  regionalRoleApplications: 500,
} as const;

export const TARGET_REGION_COUNT = 14;

export const PARTNERS = [{ id: "ozlidep", name: "O‘ZLIDEP Party" }] as const;

export const SUPPORTERS = [
  { id: "youth-affairs-agency", name: "Youth Affairs Agency" },
  { id: "volunteer-association", name: "Uzbekistan Volunteer Association" },
  { id: "childrens-library", name: "Republican Children’s Library" },
] as const;

export const OPPORTUNITY_SOURCES = [
  { id: "yashil-qollar", name: "Yashil Qo‘llar" },
  { id: "youth-run-club", name: "Youth Run Club" },
  { id: "youth-for-good", name: "Youth for Good" },
  { id: "youth-grants", name: "Youth Grants" },
  { id: "relay-fellowship", name: "Relay Fellowship" },
] as const;

export const LEGAL_UPDATED_ON = "2026-09-02";
