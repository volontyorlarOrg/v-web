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
  {
    id: "youth-volunteer-club",
    name: "Youth Volunteer Club",
    logo: "/opportunity-sources/youth-volunteer-club.svg",
    logoGrey: "/opportunity-sources/youth-volunteer-club-grey.svg",
    logoWidth: 262.88,
    logoHeight: 100,
  },
  {
    id: "yashil-qollar",
    name: "Yashil Qo‘llar",
    logo: "/opportunity-sources/yashil-qollar.svg",
    logoGrey: "/opportunity-sources/yashil-qollar-grey.svg",
    logoWidth: 200.21,
    logoHeight: 100,
  },
  {
    id: "youth-run-club",
    name: "Youth Run Club",
    logo: "/opportunity-sources/youth-run-club.svg",
    logoGrey: "/opportunity-sources/youth-run-club-grey.svg",
    logoWidth: 269.1,
    logoHeight: 100,
  },
  {
    id: "youth-for-good",
    name: "Youth for Good",
    logo: "/opportunity-sources/youth-for-good.svg",
    logoGrey: "/opportunity-sources/youth-for-good-grey.svg",
    logoWidth: 275.37,
    logoHeight: 100,
  },
  {
    id: "youth-grants",
    name: "Youth Grants",
    logo: "/opportunity-sources/youth-grants.svg",
    logoGrey: "/opportunity-sources/youth-grants-grey.svg",
    logoWidth: 220,
    logoHeight: 100,
  },
  {
    id: "articularuz",
    name: "ArticularUZ",
    logo: "/opportunity-sources/articularuz.svg",
    logoGrey: "/opportunity-sources/articularuz-grey.svg",
    logoWidth: 304.39,
    logoHeight: 100,
  },
] as const;

export const LEGAL_UPDATED_ON = "2026-09-02";
