import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/routing";
import { TARGET_REGION_COUNT } from "@/lib/content/org";
import { MAP_EXTENT, REGIONS, localisedRegions } from "@/lib/map/regions";

describe("region map data", () => {
  it("covers exactly the fourteen regions the club is building towards", () => {
    expect(REGIONS).toHaveLength(TARGET_REGION_COUNT);
    expect(new Set(REGIONS.map((region) => region.id)).size).toBe(TARGET_REGION_COUNT);
    expect(new Set(REGIONS.map((region) => region.iso)).size).toBe(TARGET_REGION_COUNT);
  });

  it("names every region in every locale", () => {
    for (const region of REGIONS) {
      for (const locale of locales) {
        expect(region.names[locale]?.trim(), `${region.id}: ${locale}`).toBeTruthy();
      }
    }
  });

  it("writes Uzbek region names with the turned comma, not a straight apostrophe", () => {
    for (const region of REGIONS) {
      expect(region.names.uz, `${region.id}`).not.toMatch(/[a-z]'[a-z]/i);
    }
  });

  it("writes Russian region names in Cyrillic", () => {
    for (const region of REGIONS) {
      expect(region.names.ru, `${region.id}`).toMatch(/[Ѐ-ӿ]/);
    }
  });

  it("keeps every coordinate inside the declared map extent", () => {
    const halfWidth = MAP_EXTENT.width / 2;
    const halfHeight = MAP_EXTENT.height / 2;

    for (const region of REGIONS) {
      const [anchorX, anchorY] = region.anchor;
      expect(Math.abs(anchorX), `${region.id} anchor x`).toBeLessThanOrEqual(halfWidth);
      expect(Math.abs(anchorY), `${region.id} anchor y`).toBeLessThanOrEqual(halfHeight);

      for (const polygon of region.polygons) {
        for (const ring of [polygon.outer, ...polygon.holes]) {
          expect(ring.length % 2, `${region.id} ring length`).toBe(0);
          expect(ring.length / 2).toBeGreaterThanOrEqual(4);

          for (let index = 0; index < ring.length; index += 2) {
            expect(Math.abs(ring[index]), `${region.id} x`).toBeLessThanOrEqual(halfWidth);
            expect(Math.abs(ring[index + 1]), `${region.id} y`).toBeLessThanOrEqual(halfHeight);
          }
        }
      }
    }
  });

  it("stays small enough to ship in the page bundle", () => {
    const points = REGIONS.reduce(
      (total, region) =>
        total +
        region.polygons.reduce(
          (sum, polygon) =>
            sum + polygon.outer.length / 2 + polygon.holes.reduce((h, hole) => h + hole.length / 2, 0),
          0,
        ),
      0,
    );
    expect(points).toBeLessThan(1200);
  });

  it("resolves one label per region for a locale", () => {
    const uz = localisedRegions("uz");
    expect(uz).toHaveLength(TARGET_REGION_COUNT);
    expect(uz.find((region) => region.id === "fergana")?.name).toBe("Fargʻona");
    expect(localisedRegions("ru").find((region) => region.id === "fergana")?.name).toBe("Фергана");
  });
});
