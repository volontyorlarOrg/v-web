import { describe, expect, it, vi } from "vitest";

import { channelUrl, configuredChannels, verifiedSocialUrls } from "@/lib/constants/channels";

describe("public channels", () => {
  it("hides every channel while no address is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "");
    vi.stubEnv("NEXT_PUBLIC_INSTAGRAM_URL", "");
    expect(configuredChannels()).toEqual([]);
    expect(verifiedSocialUrls()).toEqual([]);
    expect(channelUrl("telegram")).toBeNull();
  });

  it("only accepts https addresses", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "http://t.me/example");
    expect(channelUrl("telegram")).toBeNull();
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "not a url");
    expect(channelUrl("telegram")).toBeNull();
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    expect(channelUrl("telegram")).toBe("https://t.me/example");
  });

  it("reports configured channels for structured data", () => {
    vi.stubEnv("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/example");
    vi.stubEnv("NEXT_PUBLIC_INSTAGRAM_URL", "");
    expect(configuredChannels()).toEqual([
      { id: "telegram", url: "https://t.me/example" },
    ]);
    expect(verifiedSocialUrls()).toEqual(["https://t.me/example"]);
  });
});
