import { describe, expect, it } from "vitest";

import { parsePublicProfile } from "@/lib/public-profiles/public-profile.server";
import { publicActivityTimeline } from "@/lib/public-profiles/activity";

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

describe("public profile rewards", () => {
  const reward = {
    id: "reward",
    key: "profile",
    xpAwarded: 50,
    claimedAt: "2026-10-10T21:30:00.000Z",
  };

  it("sorts rewards against local event dates and ignores unknown keys", () => {
    const profile = parsePublicProfile({
      ...payload,
      rewards: [{ ...reward, claimedAt: "2026-09-19T21:30:00.000Z" }],
    });
    expect(
      publicActivityTimeline(profile!.activity, [
        ...profile!.rewards,
        { ...reward, id: "unknown", key: "retired" },
      ]).map((entry) => entry.source),
    ).toEqual(["checkpoint", "manual"]);
  });

  it("accepts paid rewards and defaults an older response to no rewards", () => {
    expect(
      parsePublicProfile({ ...payload, rewards: [reward] })?.rewards,
    ).toEqual([reward]);
    expect(parsePublicProfile(payload)?.rewards).toEqual([]);
  });

  it.each([
    { ...reward, claimedAt: null },
    { ...reward, claimedAt: "yesterday" },
    { ...reward, xpAwarded: 0 },
    { ...reward, xpAwarded: -50 },
    { ...reward, id: "" },
  ])("refuses malformed reward data %j", (bad) => {
    expect(parsePublicProfile({ ...payload, rewards: [bad] })).toBeNull();
  });
});

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
      verification: { verified: false },
      rewards: [],
      deductions: [],
      hometownRegion: null,
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

  it("accepts verification and discards legacy organization marks", () => {
    const verification = { verified: true, organization: { id: "org", name: "Example", logoUrl: "https://example.com/logo.png" } };
    expect(parsePublicProfile({ ...payload, verification })?.verification).toEqual({ verified: true });
    expect(parsePublicProfile({ ...payload, verification: { ...verification, organization: { ...verification.organization, logoUrl: "javascript:alert(1)" } } })?.verification).not.toHaveProperty("organization");
  });

  it("reads every step of the hours ladder and still the older levels", () => {
    for (const level of [
      "newcomer",
      "volunteer",
      "supervisor",
      "coordinator",
      "leader",
      "active",
      "trusted",
      "core",
    ]) {
      expect(parsePublicProfile({ ...payload, level })?.level, level).toBe(
        level,
      );
    }
    expect(parsePublicProfile({ ...payload, level: "legend" })).toBeNull();
  });

  it("rejects invalid identity, statistics and non-HTTP avatar URLs", () => {
    for (const candidate of [
      { ...payload, username: "NO" },
      { ...payload, xp: 1.5 },
      { ...payload, xp: "640" },
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

  it("keeps a net XP total below zero instead of refusing the profile", () => {
    expect(parsePublicProfile({ ...payload, xp: -1 })?.xp).toBe(-1);
    expect(parsePublicProfile({ ...payload, xp: -30 })?.xp).toBe(-30);
    expect(parsePublicProfile({ ...payload, xp: 0 })?.xp).toBe(0);
  });

  it("reads administrator deductions and refuses one that is not a loss", () => {
    const deduction = {
      id: "deduction-1",
      xp: -20,
      createdAt: "2026-11-20T08:15:00.000Z",
    };
    expect(
      parsePublicProfile({ ...payload, deductions: [deduction] })?.deductions,
    ).toEqual([deduction]);
    expect(
      parsePublicProfile({
        ...payload,
        deductions: [{ ...deduction, reason: "Private note" }],
      })?.deductions[0],
    ).not.toHaveProperty("reason");
    for (const bad of [
      { ...deduction, xp: 0 },
      { ...deduction, xp: 20 },
      { ...deduction, xp: -2.5 },
      { ...deduction, id: "" },
      { ...deduction, createdAt: "2026-11-20" },
    ]) {
      expect(parsePublicProfile({ ...payload, deductions: [bad] })).toBeNull();
    }
    expect(parsePublicProfile({ ...payload, deductions: "none" })).toBeNull();
  });

  it("places deductions in the activity timeline by when they happened", () => {
    const profile = parsePublicProfile({
      ...payload,
      deductions: [
        { id: "late", xp: -20, createdAt: "2026-10-01T06:00:00.000Z" },
        { id: "early", xp: -5, createdAt: "2026-09-01T06:00:00.000Z" },
      ],
    });
    expect(
      publicActivityTimeline(
        profile!.activity,
        profile!.rewards,
        profile!.deductions,
      ).map((entry) => `${entry.source}:${entry.id}`),
    ).toEqual(["deduction:late", "manual:event-1", "deduction:early"]);
  });

  it("reads the hometown apart from the current region, and tolerates a backend that does not send it yet", () => {
    expect(parsePublicProfile(payload)?.hometownRegion).toBeNull();
    expect(
      parsePublicProfile({ ...payload, hometownRegion: "samarkand" }),
    ).toMatchObject({ region: "tashkent-city", hometownRegion: "samarkand" });
    expect(
      parsePublicProfile({ ...payload, hometownRegion: "atlantis" }),
    ).toBeNull();
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
