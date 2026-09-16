import { describe, expect, it } from "vitest";

import {
  FOUNDER_PROFILE_IDS,
  FOUNDERS,
  OPPORTUNITY_SOURCES,
} from "@/lib/content/org";

describe("opportunity sources", () => {
  it("keeps the public list in order with paired prepared logos", () => {
    expect(
      OPPORTUNITY_SOURCES.map(({ id, name, logo, logoGrey }) => ({
        id,
        name,
        logo,
        logoGrey,
      })),
    ).toEqual([
      {
        id: "youth-volunteer-club",
        name: "Youth Volunteer Club",
        logo: "/opportunity-sources/youth-volunteer-club.svg",
        logoGrey: "/opportunity-sources/youth-volunteer-club-grey.svg",
      },
      {
        id: "yashil-qollar",
        name: "Yashil Qo‘llar",
        logo: "/opportunity-sources/yashil-qollar.svg",
        logoGrey: "/opportunity-sources/yashil-qollar-grey.svg",
      },
      {
        id: "youth-run-club",
        name: "Youth Run Club",
        logo: "/opportunity-sources/youth-run-club.svg",
        logoGrey: "/opportunity-sources/youth-run-club-grey.svg",
      },
      {
        id: "youth-for-good",
        name: "Youth for Good",
        logo: "/opportunity-sources/youth-for-good.svg",
        logoGrey: "/opportunity-sources/youth-for-good-grey.svg",
      },
      {
        id: "youth-grants",
        name: "Youth Grants",
        logo: "/opportunity-sources/youth-grants.svg",
        logoGrey: "/opportunity-sources/youth-grants-grey.svg",
      },
      {
        id: "articularuz",
        name: "ArticularUZ",
        logo: "/opportunity-sources/articularuz.svg",
        logoGrey: "/opportunity-sources/articularuz-grey.svg",
      },
    ]);
  });
});

describe("founder profiles", () => {
  it("gives every founder each profile the board renders", () => {
    for (const founder of FOUNDERS) {
      expect(Object.keys(founder.profiles).sort(), founder.id).toEqual(
        [...FOUNDER_PROFILE_IDS].sort(),
      );
    }
  });

  it("points every profile at the platform it claims, over https", () => {
    const host: Record<(typeof FOUNDER_PROFILE_IDS)[number], string> = {
      telegram: "t.me",
      linkedin: "www.linkedin.com",
    };

    for (const founder of FOUNDERS) {
      for (const id of FOUNDER_PROFILE_IDS) {
        const url = new URL(founder.profiles[id]);
        expect(url.protocol, `${founder.id}: ${id}`).toBe("https:");
        expect(url.host, `${founder.id}: ${id}`).toBe(host[id]);
        expect(url.pathname.length, `${founder.id}: ${id}`).toBeGreaterThan(1);
      }
    }
  });
});
