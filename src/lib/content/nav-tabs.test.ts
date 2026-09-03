import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/routing";
import { HEADER_NAV_ITEMS, headerNavHref, headerNavPath } from "@/lib/content/nav-tabs";
import { publicRoutes } from "@/lib/routing/routes";

describe("header navigation items", () => {
  it("only point at registered public routes", () => {
    const registered = new Set(publicRoutes.map((route) => route.key));
    for (const item of HEADER_NAV_ITEMS) {
      expect(registered.has(item.route), item.id).toBe(true);
    }
  });

  it("have a label in every catalog", () => {
    for (const locale of locales) {
      const nav = JSON.parse(
        readFileSync(join(process.cwd(), `src/i18n/messages/${locale}.json`), "utf8"),
      ).nav as Record<string, string>;
      for (const item of HEADER_NAV_ITEMS) {
        expect(nav[item.id], `${locale}: nav.${item.id}`).toBeTruthy();
      }
    }
  });

  it("keep a fragment out of the path used to mark the active tab", () => {
    const events = HEADER_NAV_ITEMS.find((item) => item.id === "events");
    expect(events).toBeDefined();
    expect(headerNavHref(events!)).toBe("/#sources");
    expect(headerNavPath(events!)).toBe("/");
  });
});
