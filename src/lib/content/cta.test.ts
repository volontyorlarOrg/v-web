import { beforeEach, describe, expect, it, vi } from "vitest";

import { joinDestination, loginDestination, opportunitiesDestination } from "@/lib/content/cta";

describe("call-to-action destinations", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "");
  });

  it("falls back to internal pages instead of inventing a host", () => {
    expect(joinDestination()).toEqual({ href: "/contact", external: false });
    expect(opportunitiesDestination()).toEqual({
      href: "/volunteering",
      external: false,
    });
  });

  it("offers no sign-in until the product application has an origin", () => {
    expect(loginDestination()).toBeNull();
  });

  it("points sign-in at the product application once its origin is known", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "https://app.example.org");
    expect(loginDestination()).toEqual({
      href: "https://app.example.org/login",
      external: true,
    });
  });

  it("prefers the community channel once it is verified", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    expect(joinDestination()).toEqual({
      href: "https://t.me/example",
      external: true,
    });
    expect(opportunitiesDestination().href).toBe("https://t.me/example");
  });

  it("sends opportunity traffic to the product app when it exists", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "https://app.example.org");
    expect(opportunitiesDestination()).toEqual({
      href: "https://app.example.org/",
      external: true,
    });
  });
});
