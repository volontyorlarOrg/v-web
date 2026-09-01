/**
 * Verified YVC facts.
 *
 * Everything here comes from the maintainer handoff. Nothing may be added
 * without a source: no extra partnerships, statistics, testimonials, awards,
 * offices, addresses, or integrations.
 *
 * Names are proper nouns and are deliberately kept out of the message catalogs;
 * only the surrounding prose is translated.
 */

export const ORGANIZATION_NAME = "Youth Volunteer Club";
export const ORGANIZATION_SHORT_NAME = "YVC";

/** Founded 4 June 2025. */
export const FOUNDED_ON = "2025-06-04";

export const FOUNDERS = ["Arslon Rajabov", "Parizoda Abdurakhimova"] as const;

/** Traction figures. Rendered with a locale-aware number format and a "+". */
export const TRACTION = {
  telegramFollowers: 3600,
  instagramFollowers: 220,
  eventsSupplied: 50,
  regionalRoleApplications: 500,
} as const;

/** Uzbekistan has 14 regions; expansion targets all of them. */
export const TARGET_REGION_COUNT = 14;

/** Organisations YVC has a stated partnership with. */
export const PARTNERS = [{ id: "ozlidep", name: "O‘ZLIDEP Party" }] as const;

/** Institutions that support or recognise YVC. */
export const SUPPORTERS = [
  { id: "youth-affairs-agency", name: "Youth Affairs Agency" },
  { id: "volunteer-association", name: "Uzbekistan Volunteer Association" },
  { id: "childrens-library", name: "Republican Children’s Library" },
] as const;

/** Current sources of volunteer opportunities. */
export const OPPORTUNITY_SOURCES = [
  { id: "yashil-qollar", name: "Yashil Qo‘llar" },
  { id: "youth-run-club", name: "Youth Run Club" },
  { id: "youth-for-good", name: "Youth for Good" },
  { id: "youth-grants", name: "Youth Grants" },
  { id: "relay-fellowship", name: "Relay Fellowship" },
] as const;

/** Topics of the education initiative that is in preparation. */
export const COURSE_TOPIC_IDS = [
  "basics",
  "applying",
  "essay",
  "conduct",
  "participation",
] as const;

export type CourseTopicId = (typeof COURSE_TOPIC_IDS)[number];

/**
 * Date the public legal pages were last reviewed. Kept in code rather than in
 * the message catalogs so all three locales cannot drift apart.
 */
export const LEGAL_UPDATED_ON = "2026-09-02";
