import { describe, expect, it } from "vitest";

import { parsePublicProfile } from "@/lib/public-profiles/public-profile.server";

const payload = {
  displayName: "Aziza Karimova",
  username: "aziza_uz",
  avatarUrl: "https://media.example.org/avatars/aziza.webp",
  bio: "I volunteer for community projects.",
  region: "tashkent-city",
  languages: ["uz", "en"],
  links: ["https://example.org/aziza"],
  level: "trusted",
  xp: 640,
  stats: { attendedEvents: 8, confirmedHours: 24.5 },
};

describe("public profile contract", () => {
  it("maps only the approved public fields", () => {
    const parsed = parsePublicProfile({
      ...payload,
      phone: "+998901234567",
      school: "Private school",
      history: [{ title: "Private event" }],
    });

    expect(parsed).toEqual(payload);
    expect(parsed).not.toHaveProperty("phone");
    expect(parsed).not.toHaveProperty("school");
    expect(parsed).not.toHaveProperty("history");
  });

  it("rejects invalid identity, statistics and non-HTTP avatar URLs", () => {
    for (const candidate of [
      { ...payload, username: "NO" },
      { ...payload, xp: -1 },
      { ...payload, avatarUrl: "javascript:alert(1)" },
      { ...payload, stats: { attendedEvents: 8, confirmedHours: NaN } },
    ]) {
      expect(parsePublicProfile(candidate)).toBeNull();
    }
  });
});
