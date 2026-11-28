import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { fetchVolunteerTotal, readVolunteerTotal, volunteerTotalOrFallback } from "@/lib/home/stats.server";
import { LIVE_COUNT_FALLBACK } from "@/lib/content/home";

describe("public stats", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("reads only a finite, non-negative total", () => {
    expect(readVolunteerTotal({ volunteerTotal: 3940 })).toBe(3940);
    expect(readVolunteerTotal({ volunteerTotal: -1 })).toBeNull();
    expect(readVolunteerTotal({ volunteerTotal: "3940" })).toBeNull();
    expect(readVolunteerTotal(null)).toBeNull();
  });

  it("asks nothing when no backend is configured", async () => {
    vi.stubEnv("VOLONTYORLAR_API_URL", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    expect(await fetchVolunteerTotal()).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reads the total from the backend's public stats route", async () => {
    vi.stubEnv("VOLONTYORLAR_API_URL", "https://api.example.org/v1");
    const fetchSpy = vi.fn().mockResolvedValue(new Response(JSON.stringify({ volunteerTotal: 4012 })));
    vi.stubGlobal("fetch", fetchSpy);
    expect(await fetchVolunteerTotal()).toBe(4012);
    expect(fetchSpy.mock.calls[0][0]).toBe("https://api.example.org/public/stats");
  });

  it("falls back to the last known total when the backend fails", async () => {
    vi.stubEnv("VOLONTYORLAR_API_URL", "https://api.example.org");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    expect(await volunteerTotalOrFallback()).toBe(LIVE_COUNT_FALLBACK);
  });
});
