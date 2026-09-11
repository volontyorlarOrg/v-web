import { describe, expect, it } from "vitest";

import { FOUNDER_PROFILE_IDS, FOUNDERS } from "@/lib/content/org";

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
