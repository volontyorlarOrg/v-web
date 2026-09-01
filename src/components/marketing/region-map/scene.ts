import {
  AmbientLight,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Shape,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three";

import { REGION_GEOMETRY, type RegionPolygon } from "@/lib/map/region-geometry";

const SLAB_DEPTH = 1;
const SLAB_THICKNESS = 0.075;
const SLAB_THICKNESS_FLAT = 0.012;
const MAX_TIP_DEGREES = 66;
const MAX_TURN_DEGREES = 9;
const PIN_HEIGHT = 0.3;
const PIN_STEM_RADIUS = 0.008;
const PIN_HEAD_RADIUS = 0.032;
const CAMERA_FOV = 34;
const FRAME_PADDING = 1.1;
const UNRESOLVED_TOKEN_COLOUR = 0x8a8a8a;

const PINS_START = 0.34;
const PINS_END = 0.94;
const PIN_DURATION = 0.26;

export type Palette = {
  top: Color;
  side: Color;
  outline: Color;
  pinStem: Color;
  pinHead: Color;
  halo: Color;
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
    top: token("--color-surface"),
    side: token("--color-primary-muted"),
    outline: token("--color-primary-ink"),
    pinStem: token("--color-primary"),
    pinHead: token("--color-primary-ink"),
    halo: token("--color-primary"),
    key: token("--color-knockout"),
    ambient: token("--color-surface-soft"),
  };
}

function toShape(polygon: RegionPolygon): Shape {
  const shape = new Shape();
  const { outer } = polygon;
  shape.moveTo(outer[0], outer[1]);
  for (let index = 2; index < outer.length; index += 2) {
    shape.lineTo(outer[index], outer[index + 1]);
  }
  shape.closePath();

  for (const hole of polygon.holes) {
    const path = new Shape();
    path.moveTo(hole[0], hole[1]);
    for (let index = 2; index < hole.length; index += 2) {
      path.lineTo(hole[index], hole[index + 1]);
    }
    path.closePath();
    shape.holes.push(path);
  }

  return shape;
}

function buildOutline(material: Material): LineSegments {
  const positions: number[] = [];
  for (const region of REGION_GEOMETRY) {
    for (const polygon of region.polygons) {
      for (const ring of [polygon.outer, ...polygon.holes]) {
        const count = ring.length / 2;
        for (let index = 0; index < count; index += 1) {
          const next = (index + 1) % count;
          positions.push(ring[index * 2], ring[index * 2 + 1], 0);
          positions.push(ring[next * 2], ring[next * 2 + 1], 0);
        }
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return new LineSegments(geometry, material);
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
      while (stack.length >= 2 && cross(stack[stack.length - 2], stack[stack.length - 1], point) <= 0) {
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

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export type ProjectedPin = {
  id: string;
  x: number;
  y: number;
  depth: number;
  reveal: number;
};

export type MapScene = {
  render: (progress: number) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  projectPins: (width: number, height: number) => ProjectedPin[];
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

  scene.add(new HemisphereLight(palette.key, palette.ambient, 2.1));
  scene.add(new AmbientLight(palette.ambient, 0.55));
  const key = new DirectionalLight(palette.key, 1.5);
  key.position.set(-1.4, 1.1, 2.6);
  scene.add(key);
  const fill = new DirectionalLight(palette.side, 0.7);
  fill.position.set(1.8, -1.4, 1.2);
  scene.add(fill);

  const mapGroup = new Group();
  scene.add(mapGroup);

  const landGroup = new Group();
  mapGroup.add(landGroup);

  const topMaterial = track(new MeshLambertMaterial({ color: palette.top }));
  const sideMaterial = track(new MeshLambertMaterial({ color: palette.side }));

  for (const region of REGION_GEOMETRY) {
    for (const polygon of region.polygons) {
      const geometry = track(
        new ExtrudeGeometry(toShape(polygon), {
          depth: SLAB_DEPTH,
          bevelEnabled: false,
          curveSegments: 1,
        }),
      );
      landGroup.add(new Mesh(geometry, [topMaterial, sideMaterial]));
    }
  }

  const outlineMaterial = track(
    new LineBasicMaterial({ color: palette.outline, transparent: true, opacity: 0.45 }),
  );
  const outline = buildOutline(outlineMaterial);
  disposables.push(outline.geometry);
  mapGroup.add(outline);

  const stemGeometry = track(new CylinderGeometry(PIN_STEM_RADIUS, PIN_STEM_RADIUS, PIN_HEIGHT, 8));
  stemGeometry.rotateX(Math.PI / 2);
  stemGeometry.translate(0, 0, PIN_HEIGHT / 2);

  const headGeometry = track(new SphereGeometry(PIN_HEAD_RADIUS, 16, 12));
  headGeometry.translate(0, 0, PIN_HEIGHT);

  const haloGeometry = track(new RingGeometry(PIN_HEAD_RADIUS * 1.1, PIN_HEAD_RADIUS * 1.75, 24));

  const stemMaterial = track(new MeshLambertMaterial({ color: palette.pinStem }));
  const headMaterial = track(new MeshLambertMaterial({ color: palette.pinHead }));
  const haloMaterial = track(
    new MeshLambertMaterial({ color: palette.halo, transparent: true, opacity: 0.45 }),
  );

  const pinsGroup = new Group();
  mapGroup.add(pinsGroup);

  const pins = REGION_GEOMETRY.map((region) => {
    const group = new Group();
    group.position.set(region.anchor[0], region.anchor[1], 0);
    group.add(new Mesh(stemGeometry, stemMaterial));
    group.add(new Mesh(headGeometry, headMaterial));
    const halo = new Mesh(haloGeometry, haloMaterial);
    halo.position.z = 0.001;
    group.add(halo);
    pinsGroup.add(group);
    return { id: region.id, group, reveal: 0 };
  });

  const pinStagger = pins.length > 1 ? (PINS_END - PINS_START - PIN_DURATION) / (pins.length - 1) : 0;

  let viewWidth = 1;
  let viewHeight = 1;

  const fitPoints: Vector3[] = Array.from(
    { length: COUNTRY_HULL.length * 2 + REGION_GEOMETRY.length },
    () => new Vector3(),
  );

  function frameMap(slabTop: number, pinTop: number) {
    let count = 0;
    for (const [x, y] of COUNTRY_HULL) {
      fitPoints[count++].set(x, y, 0).applyQuaternion(mapGroup.quaternion);
      fitPoints[count++].set(x, y, slabTop).applyQuaternion(mapGroup.quaternion);
    }
    for (const pin of pins) {
      fitPoints[count++]
        .set(pin.group.position.x, pin.group.position.y, pinTop)
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

    const offsetX = -(minX + maxX) / 2;
    const offsetY = -(minY + maxY) / 2;
    mapGroup.position.set(offsetX, offsetY, 0);

    const aspect = Math.max(viewWidth / viewHeight, 0.0001);
    const tangent = Math.tan((CAMERA_FOV * Math.PI) / 360);

    let distance = 0;
    for (let index = 0; index < count; index += 1) {
      const point = fitPoints[index];
      const spread = Math.max(
        Math.abs(point.x + offsetX) / (tangent * aspect),
        Math.abs(point.y + offsetY) / tangent,
      );
      distance = Math.max(distance, point.z + spread * FRAME_PADDING);
    }

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

  function render(progress: number) {
    const p = clamp01(progress);
    const tip = easeInOut(p);

    mapGroup.rotation.x = -(MAX_TIP_DEGREES * Math.PI) / 180 * tip;
    mapGroup.rotation.z = -(MAX_TURN_DEGREES * Math.PI) / 180 * tip;

    const thickness = lerp(SLAB_THICKNESS_FLAT, SLAB_THICKNESS, easeInOut(clamp01(p / 0.55)));
    landGroup.scale.z = thickness;
    outline.position.z = thickness + 0.0015;
    pinsGroup.position.z = thickness;

    let tallest = 0;
    pins.forEach((pin, index) => {
      const start = PINS_START + index * pinStagger;
      const local = clamp01((p - start) / PIN_DURATION);
      const grow = local === 0 ? 0 : easeOutBack(local);
      pin.reveal = local;
      pin.group.scale.set(1, 1, Math.max(grow, 0.0001));
      pin.group.visible = local > 0;
      tallest = Math.max(tallest, local);
    });

    frameMap(thickness, thickness + (PIN_HEIGHT + PIN_HEAD_RADIUS) * tallest);

    renderer.render(scene, camera);
  }

  function projectPins(width: number, height: number) {
    return pins.map((pin) => {
      projected.set(0, 0, PIN_HEIGHT).applyMatrix4(pin.group.matrixWorld).project(camera);
      return {
        id: pin.id,
        x: (projected.x * 0.5 + 0.5) * width,
        y: (-projected.y * 0.5 + 0.5) * height,
        depth: projected.z,
        reveal: pin.reveal,
      };
    });
  }

  function dispose() {
    scene.clear();
    for (const item of disposables) item.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return { render, resize, projectPins, dispose };
}
