import { describe, expect, it } from "vitest";

import {
  checkUsername,
  initialsOf,
  LEVEL_STEPS,
  normaliseUsername,
  PARTNER_LOGOS,
  SAMPLE_OPPORTUNITIES,
  SAMPLE_PODIUM,
  TEAM_ROWS,
} from "@/lib/content/home";
import { FOUNDERS } from "@/lib/content/org";

describe("username check on the landing page", () => {
  it("follows the backend rule of 5 to 32 lowercase letters, digits or underscores", () => {
    expect(checkUsername("")).toBe("empty");
    expect(checkUsername("abc")).toBe("short");
    expect(checkUsername("abcde")).toBe("ok");
    expect(checkUsername("vol_2026")).toBe("ok");
    expect(checkUsername("a".repeat(32))).toBe("ok");
    expect(checkUsername("a".repeat(33))).toBe("invalid");
    expect(checkUsername("dot.name")).toBe("invalid");
    expect(checkUsername("Upper")).toBe("invalid");
  });

  it("lowercases and strips spaces and a leading @ as the visitor types", () => {
    expect(normaliseUsername("@Ali Valiyev")).toBe("alivaliyev");
  });
});

describe("sample podium", () => {
  it("keeps Abdulaziz first and the two founders on top", () => {
    const [first, second, third] = [...SAMPLE_PODIUM].sort((a, b) => a.place - b.place);
    const name = (id: string) => FOUNDERS.find((founder) => founder.id === id)?.name;
    expect(first.name).toBe(name("abdulaziz"));
    expect(second.name).toBe(name("arslon"));
    expect(third.name).toBe("Parizoda Abdurakhimova");
    expect(first.xp).toBeGreaterThanOrEqual(second.xp);
    expect(second.xp).toBeGreaterThanOrEqual(third.xp);
  });

  it("draws two-letter initials", () => {
    expect(initialsOf("Abdulaziz Yusupaliev")).toBe("AY");
    expect(initialsOf("Parizoda")).toBe("P");
  });
});

describe("levels", () => {
  it("match the backend's verified-hour thresholds", () => {
    expect(LEVEL_STEPS.map((step) => [step.id, step.hours])).toEqual([
      ["newcomer", 0],
      ["volunteer", 10],
      ["supervisor", 50],
      ["coordinator", 100],
      ["leader", 250],
    ]);
  });
});

describe("snapshot content", () => {
  it("shows volunteering XP as 10 per hour and competitions as a range", () => {
    for (const item of SAMPLE_OPPORTUNITIES) {
      if (item.kind === "volunteering") {
        expect(item.hours, item.slug).not.toBeNull();
        expect(item.xp.max, item.slug).toBe((item.hours ?? 0) * 10);
      } else {
        expect(item.hours, item.slug).toBeNull();
        expect(item.xp.min, item.slug).toBeLessThan(item.xp.max);
      }
    }
  });

  it("covers both kinds so every filter tab has cards", () => {
    const kinds = new Set(SAMPLE_OPPORTUNITIES.map((item) => item.kind));
    expect(kinds).toEqual(new Set(["volunteering", "competition"]));
  });

  it("serves every image from the site itself", () => {
    const sources = [
      ...SAMPLE_OPPORTUNITIES.map((item) => item.cover.src),
      ...PARTNER_LOGOS.map((logo) => logo.src),
      ...TEAM_ROWS.flat().map((photo) => photo.src),
    ];
    for (const source of sources) expect(source.startsWith("/"), source).toBe(true);
  });
});
