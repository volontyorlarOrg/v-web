import { beforeEach, describe, expect, it, vi } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { locales } from "@/i18n/routing";
import { publicRoutes } from "@/lib/routing/routes";

vi.mock("server-only", () => ({}));

describe("robots.txt", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  it("keeps an unverified deployment out of search results", () => {
    const result = robots();
    expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
    expect(result.sitemap).toBeUndefined();
  });

  it("opens up and advertises the sitemap once the origin is verified", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
    const result = robots();
    expect(result.rules).toEqual([{ userAgent: "*", allow: "/" }]);
    expect(result.sitemap).toBe("https://example.org/sitemap.xml");
    expect(result.host).toBe("https://example.org");
  });
});

describe("sitemap.xml", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  it("publishes nothing while the canonical host is unknown", async () => {
    expect(await sitemap()).toEqual([]);
  });

  it("lists every route in every locale with full hreflang alternates", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
    const entries = await sitemap();

    expect(entries).toHaveLength(publicRoutes.length * locales.length);

    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("https://example.org/uz");
    expect(urls).toContain("https://example.org/en/privacy");

    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      expect(Object.keys(languages).sort()).toEqual(
        [...locales, "x-default"].sort(),
      );
      expect(languages["x-default"]).toMatch(/^https:\/\/example\.org\/uz/);
    }
  });

  it("never exposes an exploration route", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org");
    for (const entry of await sitemap()) {
      expect(entry.url).not.toMatch(/\/v[123]$/);
    }
  });
});
