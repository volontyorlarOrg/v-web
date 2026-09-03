import { describe, expect, it } from "vitest";

import {
  getRoute,
  legalNavRoutes,
  localePath,
  mainNavRoutes,
  navHref,
  publicRoutes,
} from "@/lib/routing/routes";

describe("public route registry", () => {
  it("has unique keys and paths", () => {
    const keys = publicRoutes.map((route) => route.key);
    const paths = publicRoutes.map((route) => route.path);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("reserves the empty path for the home route only", () => {
    expect(getRoute("home").path).toBe("");
    for (const route of publicRoutes) {
      if (route.key === "home") continue;
      expect(route.path.startsWith("/")).toBe(true);
      expect(route.path.endsWith("/")).toBe(false);
    }
  });

  it("keeps legal pages out of the main navigation", () => {
    for (const route of legalNavRoutes) {
      expect(mainNavRoutes).not.toContain(route);
    }
  });

  it("exposes no exploration route", () => {
    const paths = publicRoutes.map((route) => route.path);
    expect(paths).not.toContain("/v1");
    expect(paths).not.toContain("/v2");
    expect(paths).not.toContain("/v3");
  });

  it("does not publish a course route", () => {
    expect(publicRoutes.map((route) => route.path)).not.toContain("/course");
  });

  it("throws on an unknown key", () => {
    // @ts-expect-error deliberately outside the union
    expect(() => getRoute("nope")).toThrow(/Unknown public route/);
  });
});

describe("locale-aware paths", () => {
  it("gives next-intl an unprefixed href", () => {
    expect(navHref("home")).toBe("/");
    expect(navHref("about")).toBe("/about");
  });

  it("prefixes every locale, home included", () => {
    expect(localePath("uz", "home")).toBe("/uz");
    expect(localePath("en", "about")).toBe("/en/about");
  });
});
