import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  appHref,
  appOrigin,
  hasVerifiedMarketingOrigin,
  marketingOrigin,
  marketingUrl,
} from "@/lib/seo/origin";

describe("marketing origin", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  it("is unverified and local when nothing is configured", () => {
    expect(hasVerifiedMarketingOrigin()).toBe(false);
    expect(marketingOrigin()).toBe("http://localhost:3000");
  });

  it("normalises a configured origin, dropping any path", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org/some/path");
    expect(hasVerifiedMarketingOrigin()).toBe(true);
    expect(marketingOrigin()).toBe("https://example.org");
    expect(marketingUrl("/sitemap.xml")).toBe("https://example.org/sitemap.xml");
  });

  it("rejects a value that is not an http(s) origin", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "example.org");
    expect(hasVerifiedMarketingOrigin()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "javascript:alert(1)");
    expect(hasVerifiedMarketingOrigin()).toBe(false);
  });
});

describe("product application origin", () => {
  it("is null until it is verified, and never guessed", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "");
    expect(appOrigin()).toBeNull();
    expect(appHref("/opportunities")).toBeNull();
  });

  it("builds absolute hrefs once configured", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_ORIGIN", "https://app.example.org");
    expect(appHref("/opportunities")).toBe("https://app.example.org/opportunities");
    expect(appHref()).toBe("https://app.example.org/");
  });
});
