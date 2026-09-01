import { MAP_EXTENT, type RegionGeometry } from "@/lib/map/region-geometry";

export const MAP_VIEW_BOX = {
  minX: -MAP_EXTENT.width / 2,
  minY: -MAP_EXTENT.height / 2,
  width: MAP_EXTENT.width,
  height: MAP_EXTENT.height,
} as const;

export const MAP_VIEW_BOX_ATTRIBUTE = `${MAP_VIEW_BOX.minX} ${MAP_VIEW_BOX.minY} ${MAP_VIEW_BOX.width} ${MAP_VIEW_BOX.height}`;

function ringToPath(ring: readonly number[]): string {
  let path = "";
  for (let index = 0; index < ring.length; index += 2) {
    path += `${index === 0 ? "M" : "L"}${ring[index]} ${-ring[index + 1]}`;
  }
  return `${path}Z`;
}

export function regionPath(region: RegionGeometry): string {
  return region.polygons
    .map((polygon) => [polygon.outer, ...polygon.holes].map(ringToPath).join(""))
    .join("");
}

export function anchorPoint(region: RegionGeometry): { x: number; y: number } {
  return { x: region.anchor[0], y: -region.anchor[1] };
}
