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
};

describe("public profile contract", () => {
  it("maps the full public profile while dropping account-only data", () => {
    const parsed = parsePublicProfile({
      ...payload,
      email: "private@example.com",
      history: [{ title: "Private event" }],
    });

    expect(parsed).toEqual(payload);
    expect(parsed).not.toHaveProperty("email");
    expect(parsed).not.toHaveProperty("history");
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
    ]) {
      expect(parsePublicProfile(candidate)).toBeNull();
    }
  });
});
