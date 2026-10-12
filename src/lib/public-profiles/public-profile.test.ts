import { describe, expect, it } from "vitest";

import { parsePublicProfile } from "@/lib/public-profiles/public-profile.server";

const payload = {
  displayName: "Aziza Karimova",
  username: "aziza_uz",
  avatarUrl: "https://media.example.org/avatars/aziza.webp",
  bio: "I volunteer for community projects.",
  region: "tashkent-city",
  city: "Tashkent",
  school: "School 110",
  gradeYear: "11",
  languages: ["uz", "en"],
  phone: "+998901234567",
  telegram: "aziza_volunteer",
  instagram: "aziza.volunteers",
  linkedin: "https://www.linkedin.com/in/aziza-karimova",
  links: ["https://example.org/aziza"],
  joinedAt: "2025-09-01T09:30:00.000Z",
  level: "trusted",
  xp: 640,
  stats: { attendedEvents: 8, confirmedHours: 24.5 },
  pastEvents: [
    {
      id: "event-1",
      title: "Community cleanup",
      organization: "Community Foundation",
      eventDate: "2026-09-20",
      hours: 4.5,
      xpAwarded: 80,
      countsTowardProgress: true,
    },
  ],
};

const attended = {
  id: "attendance-1",
  source: "attendance",
  kind: "competition",
  title: "Youth ideas contest",
  organization: "Ideas Lab",
  eventDate: "2026-09-10",
  hours: null,
  placement: "winner",
  xpAwarded: 50,
  countsTowardProgress: true,
};

describe("public profile contract", () => {
  it("maps the full public profile while dropping account-only data", () => {
    const parsed = parsePublicProfile({
      ...payload,
      email: "private@example.com",
      history: [{ title: "Private event" }],
      pastEvents: [{ ...payload.pastEvents[0], createdById: "private-admin" }],
    });

    expect(parsed).toEqual({
      ...payload,
      activity: [
        {
          ...payload.pastEvents[0],
          source: "manual",
          kind: "volunteering",
          placement: null,
        },
      ],
    });
    expect(parsed).not.toHaveProperty("email");
    expect(parsed).not.toHaveProperty("history");
    expect(parsed?.pastEvents[0]).not.toHaveProperty("createdById");
  });

  it("rejects invalid identity, statistics and non-HTTP avatar URLs", () => {
    for (const candidate of [
      { ...payload, username: "NO" },
      { ...payload, xp: -1 },
      { ...payload, avatarUrl: "javascript:alert(1)" },
      { ...payload, linkedin: "https://example.com/in/aziza" },
      { ...payload, linkedin: "https://linkedin.com/company/aziza" },
      { ...payload, joinedAt: "not-a-date" },
      { ...payload, stats: { attendedEvents: 8, confirmedHours: NaN } },
      { ...payload, pastEvents: [{ ...payload.pastEvents[0], hours: -1 }] },
      { ...payload, joinedAt: 20250901 },
      { ...payload, activity: [{ ...attended, source: "private" }] },
      { ...payload, activity: [{ ...attended, placement: "champion" }] },
      { ...payload, activity: [{ ...attended, eventDate: "10.09.2026" }] },
      { ...payload, activity: "none" },
    ]) {
      expect(parsePublicProfile(candidate)).toBeNull();
    }
  });

  it("accepts a profile whose owner keeps optional parts off the page", () => {
    const parsed = parsePublicProfile({
      ...payload,
      region: null,
      phone: "",
      languages: [],
      links: [],
      joinedAt: null,
      pastEvents: [],
      activity: [],
    });

    expect(parsed).toMatchObject({
      displayName: "Aziza Karimova",
      bio: "I volunteer for community projects.",
      joinedAt: null,
      phone: "",
      activity: [],
    });
  });

  it("reads attended events and past events as one activity list", () => {
    const parsed = parsePublicProfile({
      ...payload,
      activity: [
        { ...attended, attendanceNote: "private" },
        {
          ...payload.pastEvents[0],
          source: "manual",
          kind: "volunteering",
          placement: null,
        },
      ],
    });

    expect(parsed?.activity).toEqual([
      attended,
      {
        ...payload.pastEvents[0],
        source: "manual",
        kind: "volunteering",
        placement: null,
      },
    ]);
  });
});
