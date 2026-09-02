import { lerp, type MapPhase } from "@/components/marketing/hero-map/timeline";

export type Viewport = { width: number; height: number };
export type Room = { hero: number; top: number; bottom: number; side: number; caption: number };
export type Frame = { x: number; y: number; width: number; height: number; align: number };
export type FitPoint = { x: number; y: number; z: number };
export type CameraFit = { distance: number; offsetX: number; offsetY: number };

export const BACKDROP_FALLBACK_TOP = 0.5;
const MIN_CLEARANCE = 0.05;
const MIN_EXTENT = 1e-4;

function box(view: Viewport, room: Room, y: number, height: number, align = 0): Frame {
  return {
    x: room.side,
    y,
    width: Math.max(1, view.width - room.side * 2),
    height: Math.max(1, height),
    align,
  };
}

export function backdropFrame(view: Viewport, room: Room): Frame {
  const top = room.hero > 0 ? room.hero : view.height * BACKDROP_FALLBACK_TOP;
  return box(view, room, top, view.height, 1);
}

export function stageFrame(view: Viewport, room: Room): Frame {
  return box(view, room, room.top, view.height - room.top - room.bottom);
}

export function settledFrame(view: Viewport, room: Room): Frame {
  const reserve = Math.max(room.bottom, room.caption);
  return box(view, room, room.top, view.height - room.top - reserve);
}

function lerpFrame(from: Frame, to: Frame, t: number): Frame {
  return {
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    width: lerp(from.width, to.width, t),
    height: lerp(from.height, to.height, t),
    align: lerp(from.align, to.align, t),
  };
}

export function frameFor(phase: MapPhase, view: Viewport, room: Room): Frame {
  const staged = lerpFrame(backdropFrame(view, room), stageFrame(view, room), phase.emerge);
  return lerpFrame(staged, settledFrame(view, room), phase.settle);
}

export function fitCamera(
  points: readonly FitPoint[],
  frame: Frame,
  view: Viewport,
  fovDegrees: number,
): CameraFit {
  if (points.length === 0) return { distance: 1, offsetX: 0, offsetY: 0 };

  const tangent = Math.tan((fovDegrees * Math.PI) / 360);
  const aspect = Math.max(view.width / view.height, MIN_EXTENT);
  const wide = tangent * aspect;
  const halfWidth = Math.max(frame.width / view.width, MIN_EXTENT);
  const halfHeight = Math.max(frame.height / view.height, MIN_EXTENT);
  const centreX = ((frame.x + frame.width / 2) / view.width) * 2 - 1;
  const centreY = 1 - ((frame.y + frame.height / 2) / view.height) * 2;
  const topEdge = 1 - (frame.y / view.height) * 2;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
    maxZ = Math.max(maxZ, point.z);
  }
  const hullX = (minX + maxX) / 2;
  const hullY = (minY + maxY) / 2;

  let distance = maxZ + MIN_CLEARANCE;
  for (const point of points) {
    const dx = point.x - hullX;
    const dy = point.y - hullY;
    distance = Math.max(
      distance,
      (dx / wide + (centreX + halfWidth) * point.z) / halfWidth,
      (-dx / wide + (halfWidth - centreX) * point.z) / halfWidth,
      (dy / tangent + (centreY + halfHeight) * point.z) / halfHeight,
      (-dy / tangent + (halfHeight - centreY) * point.z) / halfHeight,
    );
  }

  let offsetYAtTop = Infinity;
  for (const point of points) {
    offsetYAtTop = Math.min(offsetYAtTop, topEdge * (distance - point.z) * tangent - point.y);
  }

  return {
    distance,
    offsetX: centreX * distance * wide - hullX,
    offsetY: lerp(centreY * distance * tangent - hullY, offsetYAtTop, frame.align),
  };
}
