import { beforeEach, describe, expect, it, vi } from "vitest";

import { isVerificationToken, searchEngineVerification } from "@/lib/seo/verification";

const NAMES = [
  "GOOGLE_SITE_VERIFICATION",
  "YANDEX_VERIFICATION",
  "BING_SITE_VERIFICATION",
] as const;

describe("searchEngineVerification", () => {
  beforeEach(() => {
    for (const name of NAMES) vi.stubEnv(name, "");
  });

  it("claims no property while every token is unset", () => {
    expect(searchEngineVerification()).toBeUndefined();
  });

  it("emits only the engines that were configured", () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "abc123DEF456_ghi-jkl");

    expect(searchEngineVerification()).toEqual({ google: "abc123DEF456_ghi-jkl" });
  });

  it("carries Bing under its own meta name", () => {
    vi.stubEnv("BING_SITE_VERIFICATION", "A1B2C3D4E5F6A7B8");

    expect(searchEngineVerification()).toEqual({
      other: { "msvalidate.01": "A1B2C3D4E5F6A7B8" },
    });
  });

  it("gathers all three engines at once", () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "google-token-value");
    vi.stubEnv("YANDEX_VERIFICATION", "a1b2c3d4e5f6a7b8");
    vi.stubEnv("BING_SITE_VERIFICATION", "A1B2C3D4E5F6A7B8");

    expect(searchEngineVerification()).toEqual({
      google: "google-token-value",
      yandex: "a1b2c3d4e5f6a7b8",
      other: { "msvalidate.01": "A1B2C3D4E5F6A7B8" },
    });
  });

  it("trims surrounding whitespace", () => {
    vi.stubEnv("YANDEX_VERIFICATION", "  a1b2c3d4e5f6a7b8  ");

    expect(searchEngineVerification()).toEqual({ yandex: "a1b2c3d4e5f6a7b8" });
  });

  it("refuses a pasted meta tag rather than emitting a broken one", () => {
    vi.stubEnv(
      "GOOGLE_SITE_VERIFICATION",
      '<meta name="google-site-verification" content="abc123DEF456" />',
    );

    expect(searchEngineVerification()).toBeUndefined();
  });

  it("refuses a token too short to be real", () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "short");

    expect(searchEngineVerification()).toBeUndefined();
  });
});

describe("isVerificationToken", () => {
  it.each([
    "abc123DEF456_ghi-jkl",
    "a1b2c3d4e5f6a7b8",
    "A1B2C3D4E5F6A7B8",
    "token.with.dots",
    "dHJhaWxpbmdwYWQ=",
  ])("accepts %s", (value) => {
    expect(isVerificationToken(value)).toBe(true);
  });

  it.each([
    "short",
    "has spaces in it",
    '<meta content="x" />',
    "quote\"inside",
    "",
  ])("rejects %s", (value) => {
    expect(isVerificationToken(value)).toBe(false);
  });
});
