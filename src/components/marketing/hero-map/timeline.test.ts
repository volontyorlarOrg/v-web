import { describe, expect, it } from "vitest";

import {
  REVEAL_END,
  TURN_START,
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

  it("lifts every province before the board starts to turn", () => {
    for (const order of orders) {
      expect(provinceLift(order, PROVINCES, TURN_START)).toBe(1);
    }
    expect(mapPhase(TURN_START).turn).toBe(0);
  });

  it("finishes the reveal act with every province up", () => {
    expect(mapPhase(REVEAL_END).reveal).toBe(1);
    for (const order of orders) {
      expect(provinceLift(order, PROVINCES, REVEAL_END)).toBe(1);
    }
  });

  it("holds the board square to the reader for the whole reveal", () => {
    for (let progress = 0; progress <= REVEAL_END; progress += 0.02) {
      expect(mapPhase(progress).turnDegrees).toBe(0);
    }
  });

  it("lifts the provinces from west to east", () => {
    const midway = (REVEAL_END + 0.24) / 2;
    const lifts = orders.map((order) => provinceLift(order, PROVINCES, midway));
    for (let index = 1; index < lifts.length; index += 1) {
      expect(lifts[index]).toBeLessThanOrEqual(lifts[index - 1]);
    }
  });

  it("turns the board only in the closing act", () => {
    expect(mapPhase(TURN_START).turnDegrees).toBe(0);
    expect(mapPhase(0.85).turnDegrees).toBeGreaterThan(0);
    expect(mapPhase(1).turnDegrees).toBeGreaterThan(mapPhase(0.85).turnDegrees);
  });

  it("tips further with every act", () => {
    expect(mapPhase(0).tipDegrees).toBeGreaterThan(mapPhase(0.22).tipDegrees);
    expect(mapPhase(REVEAL_END).tipDegrees).toBeGreaterThan(mapPhase(0.22).tipDegrees);
    expect(mapPhase(1).tipDegrees).toBeGreaterThan(mapPhase(REVEAL_END).tipDegrees);
  });
});
