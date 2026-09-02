import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/routing";
import { NAV_TABS_MOCK, navTabHref, navTabPath } from "@/lib/content/nav-tabs";
import { publicRoutes } from "@/lib/routing/routes";

describe("mock navigation tabs", () => {
  it("only point at registered public routes", () => {
    const registered = new Set(publicRoutes.map((route) => route.key));
    for (const tab of NAV_TABS_MOCK) {
      expect(registered.has(tab.route), tab.id).toBe(true);
    }
  });

  it("have a label in every catalog", () => {
    for (const locale of locales) {
      const nav = JSON.parse(
        readFileSync(join(process.cwd(), `src/i18n/messages/${locale}.json`), "utf8"),
      ).nav as Record<string, string>;
      for (const tab of NAV_TABS_MOCK) {
        expect(nav[tab.id], `${locale}: nav.${tab.id}`).toBeTruthy();
      }
    }
  });

  it("keep a fragment out of the path used to mark the active tab", () => {
    const events = NAV_TABS_MOCK.find((tab) => tab.id === "events");
    expect(events).toBeDefined();
    expect(navTabHref(events!)).toBe("/#sources");
    expect(navTabPath(events!)).toBe("/");
  });
});
