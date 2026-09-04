import { beforeEach, describe, expect, it, vi } from "vitest";

import { joinDestination, loginDestination, opportunitiesDestination } from "@/lib/content/cta";

describe("call-to-action destinations", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "");
  });

  it("falls back to internal pages instead of inventing a host", () => {
    expect(joinDestination()).toEqual({ href: "/contact", external: false, newTab: false });
    expect(opportunitiesDestination("en")).toBeNull();
  });

  it("offers no sign-in until the product application has an origin", () => {
    expect(loginDestination("en")).toBeNull();
  });

  it("sends sign-in to the product application in the visitor's locale, in the same tab", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "https://app.example.org");
    expect(loginDestination("ru")).toEqual({
      href: "https://app.example.org/ru/login",
      external: true,
      newTab: false,
    });
  });

  it("uses the community channel only for joining, and opens it in a new tab", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    expect(joinDestination()).toEqual({
      href: "https://t.me/example",
      external: true,
      newTab: true,
    });
    expect(opportunitiesDestination("en")).toBeNull();
  });

  it("sends opportunity traffic to the product app in the visitor's locale when it exists", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "https://app.example.org");
    expect(opportunitiesDestination("uz")).toEqual({
      href: "https://app.example.org/uz",
      external: true,
      newTab: false,
    });
  });
});
