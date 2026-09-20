import { describe, expect, it } from "vitest";

import {
  preferredProfileLocale,
  rootPublicUsername,
} from "@/lib/public-profiles/routing";

describe("public profile root routing", () => {
  it("accepts platform usernames and normalizes their case", () => {
    expect(rootPublicUsername("/Aziza_UZ")).toBe("aziza_uz");
    expect(rootPublicUsername("/aziza_uz/")).toBe("aziza_uz");
  });

  it("leaves product routes and invalid names to normal locale routing", () => {
    expect(rootPublicUsername("/about")).toBeNull();
    expect(rootPublicUsername("/leaderboard")).toBeNull();
    expect(rootPublicUsername("/ab")).toBeNull();
    expect(rootPublicUsername("/aziza/profile")).toBeNull();
  });

  it("rejects malformed percent encoding without throwing", () => {
    expect(rootPublicUsername("/%E0%A4%A")).toBeNull();
  });

  it("prefers the shared cookie, then the strongest supported language", () => {
    expect(preferredProfileLocale("ru", "en-US,en;q=0.9")).toBe("ru");
    expect(preferredProfileLocale(undefined, "en-US,en;q=0.9,uz;q=0.8")).toBe(
      "en",
    );
    expect(preferredProfileLocale(undefined, "de-DE,de;q=0.9")).toBe("uz");
  });
});
