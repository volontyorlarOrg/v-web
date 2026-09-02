import {
  AmbientLight,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  Shape,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

import { MAP_EXTENT, REGION_GEOMETRY, type RegionPolygon } from "@/lib/map/region-geometry";

const PLATE_THICKNESS = 0.028;
const TILE_THICKNESS = 0.042;
const TILE_LIFT = 0.17;
const TILE_GAP = 0.009;
const LEADER_BASE = 0.12;
const LEADER_STEP = 0.082;
const LEADER_TIERS = 5;
const CLUSTER_RADIUS = 0.3;
const LEADER_RADIUS = 0.0032;
const MARKER_RADIUS = 0.016;

const MAX_TIP_DEGREES = 62;
const MAX_TURN_DEGREES = 10;
const CAMERA_FOV = 34;
const FRAME_PADDING = 1.08;

const BACKDROP_ZOOM = 0.92;
const BACKDROP_SHIFT_X = 0;
const BACKDROP_SHIFT_Y = -0.9;
const BACKDROP_OPACITY = 0.95;
const BACKDROP_TIP_DEGREES = 46;
const TIP_RISE = 0.13;

const EMERGE_END = 0.32;
const TIP_START = 0.24;
const TIP_END = 0.88;
const LIFT_START = 0.36;
const LIFT_END = 0.96;
const LIFT_DURATION = 0.24;

const UNRESOLVED_TOKEN_COLOUR = 0x8a8a8a;

export type Palette = {
  plateTop: Color;
  plateSide: Color;
  tileTop: Color;
  tileSide: Color;
  leader: Color;
  marker: Color;
  key: Color;
  ambient: Color;
};

export function readPalette(element: HTMLElement): Palette {
  const styles = getComputedStyle(element);
  const token = (name: string): Color => {
    const colour = new Color(UNRESOLVED_TOKEN_COLOUR);
    const value = styles.getPropertyValue(name).trim();
    if (!value) return colour;
    try {
      colour.setStyle(value);
    } catch {
      colour.setHex(UNRESOLVED_TOKEN_COLOUR);
    }
    return colour;
  };

  return {
    plateTop: token("--color-surface-sunk"),
    plateSide: token("--color-border"),
    tileTop: token("--color-surface-soft"),
    tileSide: token("--color-primary-muted"),
    leader: token("--color-primary"),
    marker: token("--color-primary-ink"),
    key: token("--color-knockout"),
    ambient: token("--color-surface-soft"),
  };
}

function toShape(polygon: RegionPolygon, originX = 0, originY = 0): Shape {
  const shape = new Shape();
  const { outer } = polygon;
  shape.moveTo(outer[0] - originX, outer[1] - originY);
  for (let index = 2; index < outer.length; index += 2) {
    shape.lineTo(outer[index] - originX, outer[index + 1] - originY);
  }
  shape.closePath();

  for (const hole of polygon.holes) {
    const path = new Shape();
    path.moveTo(hole[0] - originX, hole[1] - originY);
    for (let index = 2; index < hole.length; index += 2) {
      path.lineTo(hole[index] - originX, hole[index + 1] - originY);
    }
    path.closePath();
    shape.holes.push(path);
  }

  return shape;
}

function regionRadius(index: number): number {
  const region = REGION_GEOMETRY[index];
  const [anchorX, anchorY] = region.anchor;
  let furthest = 0;
  for (const polygon of region.polygons) {
    const ring = polygon.outer;
    for (let point = 0; point < ring.length; point += 2) {
      furthest = Math.max(furthest, Math.hypot(ring[point] - anchorX, ring[point + 1] - anchorY));
    }
  }
  return furthest;
}

function buildHull(): Array<readonly [number, number]> {
  const points: Array<readonly [number, number]> = [];
  for (const region of REGION_GEOMETRY) {
    for (const polygon of region.polygons) {
      const ring = polygon.outer;
      for (let index = 0; index < ring.length; index += 2) {
        points.push([ring[index], ring[index + 1]] as const);
      }
    }
  }
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const cross = (
    o: readonly [number, number],
    a: readonly [number, number],
    b: readonly [number, number],
  ) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

  const chain = (ordered: Array<readonly [number, number]>) => {
    const stack: Array<readonly [number, number]> = [];
    for (const point of ordered) {
      while (
        stack.length >= 2 &&
        cross(stack[stack.length - 2], stack[stack.length - 1], point) <= 0
      ) {
        stack.pop();
      }
      stack.push(point);
    }
    stack.pop();
    return stack;
  };

  return [...chain(points), ...chain([...points].reverse())];
}

const COUNTRY_HULL = buildHull();

function buildLeaderTiers(): number[] {
  const tiers: number[] = [];
  REGION_GEOMETRY.forEach((region, index) => {
    const [x, y] = region.anchor;
    const taken = new Set<number>();
    for (let other = 0; other < index; other += 1) {
      const [otherX, otherY] = REGION_GEOMETRY[other].anchor;
      if (Math.hypot(x - otherX, y - otherY) < CLUSTER_RADIUS) taken.add(tiers[other]);
    }
    let tier = 0;
    while (tier < LEADER_TIERS - 1 && taken.has(tier)) tier += 1;
    tiers[index] = tier;
  });
  return tiers;
}

const LEADER_TIER = buildLeaderTiers();
const leaderHeight = (index: number) => LEADER_BASE + LEADER_TIER[index] * LEADER_STEP;
const TALLEST_LEADER = Math.max(...REGION_GEOMETRY.map((_, index) => leaderHeight(index)));

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const span = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));

export type ProjectedMarker = {
  id: string;
  x: number;
  y: number;
  depth: number;
  reveal: number;
};

export type Phase = {
  /** 0 while the map is the hero's backdrop, 1 once it is the subject. */
  emerge: number;
  /** 0 in plan view, 1 fully tipped. */
  tip: number;
};

export type MapScene = {
  render: (progress: number) => Phase;
  resize: (width: number, height: number, pixelRatio: number) => void;
  projectMarkers: (width: number, height: number) => ProjectedMarker[];
  dispose: () => void;
};

export function createMapScene(canvas: HTMLCanvasElement, palette: Palette): MapScene {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearAlpha(0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);

  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(value: T): T => {
    disposables.push(value);
    return value;
  };

  scene.add(new HemisphereLight(palette.key, palette.ambient, 2));
  scene.add(new AmbientLight(palette.ambient, 0.6));
  const key = new DirectionalLight(palette.key, 1.45);
  key.position.set(-1.3, 1.2, 2.5);
  scene.add(key);
  const fill = new DirectionalLight(palette.tileSide, 0.65);
  fill.position.set(1.8, -1.5, 1.1);
  scene.add(fill);

  const mapGroup = new Group();
  scene.add(mapGroup);

  const plateMaterialTop = track(new MeshLambertMaterial({ color: palette.plateTop }));
  const plateMaterialSide = track(new MeshLambertMaterial({ color: palette.plateSide }));
  const plateShapes = REGION_GEOMETRY.flatMap((region) =>
    region.polygons.map((polygon) => toShape(polygon)),
  );
  const plateGeometry = track(
    new ExtrudeGeometry(plateShapes, {
      depth: PLATE_THICKNESS,
      bevelEnabled: false,
      curveSegments: 1,
    }),
  );
  mapGroup.add(new Mesh(plateGeometry, [plateMaterialTop, plateMaterialSide]));

  const tileMaterialTop = track(new MeshLambertMaterial({ color: palette.tileTop }));
  const tileMaterialSide = track(new MeshLambertMaterial({ color: palette.tileSide }));
  const leaderGeometry = track(new CylinderGeometry(LEADER_RADIUS, LEADER_RADIUS, 1, 6));
  leaderGeometry.rotateX(Math.PI / 2);
  leaderGeometry.translate(0, 0, 0.5);
  const markerGeometry = track(new SphereGeometry(MARKER_RADIUS, 14, 10));
  const leaderMaterial = track(new MeshLambertMaterial({ color: palette.leader }));
  const markerMaterial = track(new MeshLambertMaterial({ color: palette.marker }));

  const provinces = REGION_GEOMETRY.map((region, index) => {
    const [anchorX, anchorY] = region.anchor;

    const geometry = track(
      new ExtrudeGeometry(
        region.polygons.map((polygon) => toShape(polygon, anchorX, anchorY)),
        { depth: TILE_THICKNESS, bevelEnabled: false, curveSegments: 1 },
      ),
    );

    const inset = Math.min(0.995, Math.max(0.8, 1 - TILE_GAP / regionRadius(index)));

    const tile = new Group();
    tile.position.set(anchorX, anchorY, PLATE_THICKNESS);
    tile.scale.set(inset, inset, 1);
    tile.add(new Mesh(geometry, [tileMaterialTop, tileMaterialSide]));
    mapGroup.add(tile);

    const height = leaderHeight(index);
    const leader = new Group();
    leader.position.set(anchorX, anchorY, PLATE_THICKNESS + TILE_THICKNESS);
    const stem = new Mesh(leaderGeometry, leaderMaterial);
    stem.scale.z = height;
    leader.add(stem);
    leader.add(new Mesh(markerGeometry, markerMaterial));
    mapGroup.add(leader);

    return { id: region.id, tile, leader, height, reveal: 0 };
  });

  const stagger =
    provinces.length > 1 ? (LIFT_END - LIFT_START - LIFT_DURATION) / (provinces.length - 1) : 0;

  let viewWidth = 1;
  let viewHeight = 1;

  const fitPoints: Vector3[] = Array.from(
    { length: COUNTRY_HULL.length * 2 + provinces.length },
    () => new Vector3(),
  );

  function frameMap(topZ: number, zoom: number, shiftX: number, shiftY: number) {
    let count = 0;
    for (const [x, y] of COUNTRY_HULL) {
      fitPoints[count++].set(x, y, 0).applyQuaternion(mapGroup.quaternion);
      fitPoints[count++].set(x, y, topZ).applyQuaternion(mapGroup.quaternion);
    }
    for (const province of provinces) {
      fitPoints[count++]
        .set(province.leader.position.x, province.leader.position.y, topZ)
        .applyQuaternion(mapGroup.quaternion);
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let index = 0; index < count; index += 1) {
      const point = fitPoints[index];
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }

    const centreX = -(minX + maxX) / 2;
    const centreY = -(minY + maxY) / 2;

    const aspect = Math.max(viewWidth / viewHeight, 0.0001);
    const tangent = Math.tan((CAMERA_FOV * Math.PI) / 360);

    let distance = 0;
    for (let index = 0; index < count; index += 1) {
      const point = fitPoints[index];
      const spread = Math.max(
        Math.abs(point.x + centreX) / (tangent * aspect),
        Math.abs(point.y + centreY) / tangent,
      );
      distance = Math.max(distance, point.z + spread * FRAME_PADDING);
    }
    distance /= zoom;

    const halfHeight = distance * tangent;
    mapGroup.position.set(centreX + shiftX * halfHeight * aspect, centreY + shiftY * halfHeight, 0);

    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
  }

  function resize(width: number, height: number, pixelRatio: number) {
    viewWidth = Math.max(1, width);
    viewHeight = Math.max(1, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(viewWidth, viewHeight, false);
    camera.aspect = viewWidth / viewHeight;
    camera.updateProjectionMatrix();
  }

  const projected = new Vector3();

  function render(progress: number): Phase {
    const p = clamp01(progress);
    const emerge = easeInOut(span(p, 0, EMERGE_END));
    const tip = easeInOut(span(p, TIP_START, TIP_END));

    const tipDegrees = lerp(BACKDROP_TIP_DEGREES, 0, emerge) + MAX_TIP_DEGREES * tip;
    mapGroup.rotation.x = -(tipDegrees * Math.PI) / 180;
    mapGroup.rotation.z = -((MAX_TURN_DEGREES * Math.PI) / 180) * tip;

    let tallest = 0;
    provinces.forEach((province, index) => {
      const local = span(p, LIFT_START + index * stagger, LIFT_START + index * stagger + LIFT_DURATION);
      const eased = easeOut(local);
      province.reveal = local;

      const lift = TILE_LIFT * eased;
      province.tile.position.z = PLATE_THICKNESS + lift;
      province.leader.position.z = PLATE_THICKNESS + TILE_THICKNESS + lift;
      province.leader.scale.setScalar(Math.max(eased, 0.0001));
      province.leader.visible = local > 0;
      tallest = Math.max(tallest, eased);
    });

    const topZ =
      PLATE_THICKNESS + TILE_THICKNESS + (TILE_LIFT + TALLEST_LEADER + MARKER_RADIUS) * tallest;
    frameMap(
      topZ,
      lerp(BACKDROP_ZOOM, 1, emerge),
      lerp(BACKDROP_SHIFT_X, 0, emerge),
      lerp(BACKDROP_SHIFT_Y, 0, emerge) + TIP_RISE * tip,
    );

    canvas.style.opacity = String(lerp(BACKDROP_OPACITY, 1, emerge));
    renderer.render(scene, camera);

    return { emerge, tip };
  }

  function projectMarkers(width: number, height: number): ProjectedMarker[] {
    return provinces.map((province) => {
      projected
        .set(0, 0, province.height)
        .applyMatrix4(province.leader.matrixWorld)
        .project(camera);
      return {
        id: province.id,
        x: (projected.x * 0.5 + 0.5) * width,
        y: (-projected.y * 0.5 + 0.5) * height,
        depth: projected.z,
        reveal: province.reveal,
      };
    });
  }

  function dispose() {
    scene.clear();
    for (const item of disposables) item.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return { render, resize, projectMarkers, dispose };
}

export { MAP_EXTENT };
