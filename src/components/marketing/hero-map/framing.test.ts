import { describe, expect, it } from "vitest";

import {
  backdropFrame,
  fitCamera,
  frameFor,
  settledFrame,
  stageFrame,
  type CameraFit,
  type FitPoint,
  type Frame,
  type Room,
  type Viewport,
} from "@/components/marketing/hero-map/framing";
import {
  REVEAL_END,
  REVEAL_START,
  SETTLE_END,
  mapPhase,
} from "@/components/marketing/hero-map/timeline";

const FOV = 34;
const desktop: Viewport = { width: 1440, height: 820 };
const phone: Viewport = { width: 390, height: 780 };
const views = [desktop, phone];
const room: Room = { hero: 560, top: 40, bottom: 32, side: 44, caption: 300 };

const slab: FitPoint[] = (
  [
    [-1, -0.65],
    [1, -0.65],
    [1, 0.65],
    [-1, 0.65],
  ] as const
).flatMap(([x, y]) => [
  { x, y, z: 0 },
  { x, y, z: 0.4 },
]);

function project(point: FitPoint, fit: CameraFit, view: Viewport) {
  const tangent = Math.tan((FOV * Math.PI) / 360);
  const aspect = view.width / view.height;
  const depth = fit.distance - point.z;
  const ndcX = (point.x + fit.offsetX) / (depth * tangent * aspect);
  const ndcY = (point.y + fit.offsetY) / (depth * tangent);
  return { x: (ndcX * 0.5 + 0.5) * view.width, y: (-ndcY * 0.5 + 0.5) * view.height };
}

function edgeDistance(point: { x: number; y: number }, frame: Frame) {
  return Math.min(
    Math.abs(point.x - frame.x),
    Math.abs(frame.x + frame.width - point.x),
    Math.abs(point.y - frame.y),
    Math.abs(frame.y + frame.height - point.y),
  );
}

describe("hero map frames", () => {
  it("hangs the backdrop from just under the hero copy and runs it past the bottom edge", () => {
    for (const view of views) {
      const frame = backdropFrame(view, room);
      expect(frame.y).toBe(room.hero);
      expect(frame.align).toBe(1);
      expect(frame.y + frame.height).toBeGreaterThan(view.height);
    }
  });

  it("falls back to the lower half of the panel before the hero copy has been measured", () => {
    for (const view of views) {
      const frame = backdropFrame(view, { ...room, hero: 0 });
      expect(frame.y).toBe(view.height / 2);
    }
  });

  it("gives the reveal the whole panel inside the room kept for pins", () => {
    for (const view of views) {
      const frame = stageFrame(view, room);
      expect(frame.x).toBe(room.side);
      expect(frame.x + frame.width).toBe(view.width - room.side);
      expect(frame.y).toBe(room.top);
      expect(frame.y + frame.height).toBe(view.height - room.bottom);
    }
  });

  it("keeps the settled map clear of the caption beneath it", () => {
    for (const view of views) {
      const settled = settledFrame(view, room);
      expect(settled.y + settled.height).toBeLessThanOrEqual(view.height - room.caption);
      expect(settled.height).toBeLessThan(stageFrame(view, room).height);
    }
  });

  it("falls back to the ordinary bottom room when there is no caption to clear", () => {
    const flow = { ...room, caption: 0 };
    for (const view of views) {
      expect(settledFrame(view, flow)).toEqual(stageFrame(view, flow));
    }
  });

  it("holds the map centred horizontally through every act", () => {
    for (const view of views) {
      for (let progress = 0; progress <= 1; progress += 0.05) {
        const frame = frameFor(mapPhase(progress), view, room);
        expect(frame.x + frame.width / 2).toBeCloseTo(view.width / 2, 6);
      }
    }
  });

  it("passes through the backdrop, stage and settled frames in that order", () => {
    for (const view of views) {
      expect(frameFor(mapPhase(0), view, room)).toEqual(backdropFrame(view, room));
      const midReveal = (REVEAL_START + REVEAL_END) / 2;
      expect(frameFor(mapPhase(midReveal), view, room)).toEqual(stageFrame(view, room));
      expect(frameFor(mapPhase(SETTLE_END), view, room)).toEqual(settledFrame(view, room));
      expect(frameFor(mapPhase(1), view, room)).toEqual(settledFrame(view, room));
    }
  });

  it("only ever moves the map upward once it is the subject", () => {
    for (const view of views) {
      let previousBottom = Infinity;
      for (let progress = REVEAL_END; progress <= 1; progress += 0.02) {
        const frame = frameFor(mapPhase(progress), view, room);
        expect(frame.y + frame.height).toBeLessThanOrEqual(previousBottom + 1e-9);
        previousBottom = frame.y + frame.height;
      }
    }
  });

  it("never collapses a frame on a viewport smaller than the room", () => {
    const tiny: Viewport = { width: 200, height: 150 };
    for (const frame of [
      backdropFrame(tiny, room),
      stageFrame(tiny, room),
      settledFrame(tiny, room),
    ]) {
      expect(frame.width).toBeGreaterThanOrEqual(1);
      expect(frame.height).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("fitting the camera to a frame", () => {
  const frames = views.flatMap((view) => [
    { view, frame: stageFrame(view, room) },
    { view, frame: settledFrame(view, room) },
    { view, frame: backdropFrame(view, room) },
    {
      view,
      frame: { x: 0, y: view.height / 2, width: view.width, height: view.height / 2, align: 0 },
    },
  ]);

  it("lands the silhouette inside the frame and touching it", () => {
    for (const { view, frame } of frames) {
      const fit = fitCamera(slab, frame, view, FOV);
      const projected = slab.map((point) => project(point, fit, view));
      for (const point of projected) {
        expect(point.x).toBeGreaterThanOrEqual(frame.x - 1e-6);
        expect(point.x).toBeLessThanOrEqual(frame.x + frame.width + 1e-6);
        expect(point.y).toBeGreaterThanOrEqual(frame.y - 1e-6);
        expect(point.y).toBeLessThanOrEqual(frame.y + frame.height + 1e-6);
      }
      const touching = Math.min(...projected.map((point) => edgeDistance(point, frame)));
      expect(touching).toBeLessThan(1e-6);
    }
  });

  it("keeps the camera in front of the tallest point", () => {
    for (const { view, frame } of frames) {
      expect(fitCamera(slab, frame, view, FOV).distance).toBeGreaterThan(0.4);
    }
  });

  it("hangs a top-aligned silhouette from the frame's top edge", () => {
    for (const view of views) {
      const frame = backdropFrame(view, room);
      const fit = fitCamera(slab, frame, view, FOV);
      const tops = slab.map((point) => project(point, fit, view).y);
      expect(Math.min(...tops)).toBeCloseTo(frame.y, 6);
      expect(Math.max(...tops)).toBeGreaterThan(frame.y);
    }
  });

  it("moves the map, not the camera, to reach an off-centre frame", () => {
    const low: Frame = {
      x: 0,
      y: desktop.height / 2,
      width: desktop.width,
      height: desktop.height / 2,
      align: 0,
    };
    const centred = fitCamera(slab, { ...low, y: desktop.height / 4 }, desktop, FOV);
    const lowered = fitCamera(slab, low, desktop, FOV);
    expect(lowered.offsetY).toBeLessThan(centred.offsetY);
    expect(lowered.offsetX).toBe(centred.offsetX);
  });

  it("survives an empty silhouette", () => {
    expect(fitCamera([], stageFrame(desktop, room), desktop, FOV)).toEqual({
      distance: 1,
      offsetX: 0,
      offsetY: 0,
    });
  });
});
