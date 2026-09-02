import { describe, expect, it } from "vitest";

import {
  EMERGE_END,
  FINAL_TIP_DEGREES,
  REVEAL_END,
  REVEAL_START,
  SETTLE_END,
  SETTLE_START,
  mapPhase,
  provinceLift,
} from "@/components/marketing/hero-map/timeline";

const PROVINCES = 14;
const orders = Array.from({ length: PROVINCES }, (_, index) => index);

describe("hero map timeline", () => {
  it("opens with the country as a backdrop and ends as the subject", () => {
    expect(mapPhase(0).emerge).toBe(0);
    expect(mapPhase(1).emerge).toBe(1);
  });

  it("lifts every province before the board starts to settle", () => {
    for (const order of orders) {
      expect(provinceLift(order, PROVINCES, SETTLE_START)).toBe(1);
    }
    expect(mapPhase(SETTLE_START).settle).toBe(0);
  });

  it("finishes the reveal act with every province up", () => {
    expect(mapPhase(REVEAL_END).reveal).toBe(1);
    for (const order of orders) {
      expect(provinceLift(order, PROVINCES, REVEAL_END)).toBe(1);
    }
  });

  it("lifts the provinces from west to east", () => {
    const midway = (REVEAL_END + REVEAL_START) / 2;
    const lifts = orders.map((order) => provinceLift(order, PROVINCES, midway));
    for (let index = 1; index < lifts.length; index += 1) {
      expect(lifts[index]).toBeLessThanOrEqual(lifts[index - 1]);
    }
  });

  it("settles only in the closing act and is at rest before the panel releases", () => {
    expect(mapPhase(SETTLE_START).settle).toBe(0);
    expect(mapPhase((SETTLE_START + SETTLE_END) / 2).settle).toBeGreaterThan(0);
    expect(mapPhase(SETTLE_END).settle).toBe(1);
    expect(mapPhase(1).settle).toBe(1);
  });

  it("tips further with every act", () => {
    expect(mapPhase(0).tipDegrees).toBeGreaterThan(mapPhase(EMERGE_END).tipDegrees);
    expect(mapPhase(REVEAL_END).tipDegrees).toBeGreaterThan(mapPhase(EMERGE_END).tipDegrees);
    expect(mapPhase(1).tipDegrees).toBeGreaterThan(mapPhase(REVEAL_END).tipDegrees);
  });

  it("keeps north up: the tip is the only rotation, and it never goes edge-on", () => {
    expect(mapPhase(1)).toEqual({
      emerge: 1,
      reveal: 1,
      settle: 1,
      tipDegrees: FINAL_TIP_DEGREES,
    });
    for (let progress = 0; progress <= 1; progress += 0.01) {
      const { tipDegrees } = mapPhase(progress);
      expect(tipDegrees).toBeGreaterThanOrEqual(0);
      expect(tipDegrees).toBeLessThan(60);
    }
  });
});
