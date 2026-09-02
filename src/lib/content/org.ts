export const ORGANIZATION_NAME = "Volontyor";
export const ORGANIZATION_SHORT_NAME = "Volontyor";

export const FOUNDED_ON = "2025-06-04";

export const FOUNDERS = [
  { id: "arslon", name: "Arslon Rajabov" },
  { id: "parizoda", name: "Parizoda Abdurakhimova" },
] as const;

export const TRACTION = {
  telegramFollowers: 3600,
  instagramFollowers: 220,
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

export const COURSE_TOPIC_IDS = [
  "basics",
  "applying",
  "essay",
  "conduct",
  "participation",
] as const;

export type CourseTopicId = (typeof COURSE_TOPIC_IDS)[number];

export const LEGAL_UPDATED_ON = "2026-09-02";
