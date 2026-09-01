/**
 * Regenerates `src/lib/map/region-geometry.ts` from Natural Earth admin-1 data.
 *
 * Source: Natural Earth 1:10m Admin 1 – States, Provinces (public domain).
 * https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_1_states_provinces.geojson
 *
 *   node scripts/build-region-geometry.mjs path/to/ne_10m_admin_1_states_provinces.geojson
 *
 * The raw file is ~40MB, so it is not committed. Only the simplified, projected
 * output is, and the output is small enough to read in a diff.
 */
import { readFileSync, writeFileSync } from "node:fs";

/** Natural Earth `iso_3166_2` code -> the id used across the site. */
const REGION_IDS = {
  "UZ-QR": "karakalpakstan",
  "UZ-XO": "khorezm",
  "UZ-NW": "navoiy",
  "UZ-BU": "bukhara",
  "UZ-SA": "samarkand",
  "UZ-QA": "kashkadarya",
  "UZ-SU": "surkhandarya",
  "UZ-JI": "jizzakh",
  "UZ-SI": "syrdarya",
  "UZ-TO": "tashkent-region",
  "UZ-TK": "tashkent-city",
  "UZ-NG": "namangan",
  "UZ-AN": "andijan",
  "UZ-FA": "fergana",
};

/** Latitude the equirectangular projection is true at; the country's middle. */
const REFERENCE_LATITUDE = 41.5;
/** Map-space width the projected country is normalised into. */
const MAP_WIDTH = 2;
/** Ring points closer than this to the simplified line (in degrees) are dropped. */
const SIMPLIFY_TOLERANCE = 0.02;
/** Polygons below this share of the largest polygon's area are dropped. */
const MIN_POLYGON_AREA_RATIO = 0.02;
const PRECISION = 3;

function perpendicularDistance([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Ramer–Douglas–Peucker, iterative so a dense ring cannot blow the stack. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];

  while (stack.length > 0) {
    const [start, end] = stack.pop();
    let worst = 0;
    let index = -1;
    for (let i = start + 1; i < end; i += 1) {
      const distance = perpendicularDistance(points[i], points[start], points[end]);
      if (distance > worst) {
        worst = distance;
        index = i;
      }
    }
    if (worst > tolerance && index !== -1) {
      keep[index] = 1;
      stack.push([start, index], [index, end]);
    }
  }

  return points.filter((_, index) => keep[index] === 1);
}

/** Twice the signed area; positive is counter-clockwise. */
function signedArea(ring) {
  let total = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    total += (ring[j][0] - ring[i][0]) * (ring[j][1] + ring[i][1]);
  }
  return total / 2;
}

/** Equirectangular, corrected at the reference latitude so the shape is not stretched. */
function project([longitude, latitude]) {
  return [
    longitude * Math.cos((REFERENCE_LATITUDE * Math.PI) / 180),
    latitude,
  ];
}

function toPolygons(geometry) {
  return geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
}

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("usage: node scripts/build-region-geometry.mjs <ne_10m_admin_1_states_provinces.geojson>");
  process.exit(1);
}

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
const features = source.features.filter((feature) => feature.properties.adm0_a3 === "UZB");

const expected = Object.keys(REGION_IDS).length;
if (features.length !== expected) {
  console.error(`expected ${expected} Uzbek admin-1 features, found ${features.length}`);
  process.exit(1);
}

const regions = features.map((feature) => {
  const iso = feature.properties.iso_3166_2;
  const id = REGION_IDS[iso];
  if (!id) throw new Error(`unmapped admin-1 code: ${iso}`);

  const polygons = toPolygons(feature.geometry)
    .map((rings) => {
      const simplified = rings
        .map((ring) => simplify(ring.map(project), SIMPLIFY_TOLERANCE))
        .filter((ring) => ring.length >= 4);
      return simplified.length === 0 ? null : { rings: simplified };
    })
    .filter(Boolean)
    .map((polygon) => ({ ...polygon, area: Math.abs(signedArea(polygon.rings[0])) }))
    .sort((a, b) => b.area - a.area);

  const largest = polygons[0].area;
  const kept = polygons.filter((polygon) => polygon.area / largest >= MIN_POLYGON_AREA_RATIO);

  return {
    id,
    iso,
    area: kept.reduce((total, polygon) => total + polygon.area, 0),
    anchor: project([feature.properties.longitude, feature.properties.latitude]),
    polygons: kept,
  };
});

// Normalise every coordinate into a centred map space MAP_WIDTH units across.
const xs = regions.flatMap((r) => r.polygons.flatMap((p) => p.rings.flatMap((ring) => ring.map(([x]) => x))));
const ys = regions.flatMap((r) => r.polygons.flatMap((p) => p.rings.flatMap((ring) => ring.map(([, y]) => y))));
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);
const scale = MAP_WIDTH / (maxX - minX);
const centreX = (minX + maxX) / 2;
const centreY = (minY + maxY) / 2;

const round = (value) => Number(((value - 0) * 1).toFixed(PRECISION));
const normalise = ([x, y]) => [round((x - centreX) * scale), round((y - centreY) * scale)];
const flatten = (ring) => ring.flatMap(normalise);

const totalArea = regions.reduce((total, region) => total + region.area, 0);

const serialised = regions
  .sort((a, b) => b.area - a.area)
  .map((region) => {
    const polygons = region.polygons.map((polygon) => {
      // Outer ring counter-clockwise, holes clockwise, so the extruded caps face out.
      const [outer, ...holes] = polygon.rings;
      const orient = (ring, wantCounterClockwise) =>
        signedArea(ring) > 0 === wantCounterClockwise ? ring : [...ring].reverse();
      return {
        outer: flatten(orient(outer, true)),
        holes: holes.map((hole) => flatten(orient(hole, false))),
      };
    });
    return {
      id: region.id,
      iso: region.iso,
      anchor: normalise(region.anchor),
      areaShare: Number((region.area / totalArea).toFixed(4)),
      polygons,
    };
  });

// Derive the extent from the emitted, rounded coordinates rather than from the
// scale: rounding can push a point a half-ulp outside a bound computed earlier.
const emitted = serialised.flatMap((region) => [
  region.anchor,
  ...region.polygons.flatMap((polygon) =>
    [polygon.outer, ...polygon.holes].flatMap((ring) => {
      const pairs = [];
      for (let i = 0; i < ring.length; i += 2) pairs.push([ring[i], ring[i + 1]]);
      return pairs;
    }),
  ),
]);
const ceilAt = (value) => Math.ceil(value * 10 ** PRECISION) / 10 ** PRECISION;
const width = ceilAt(Math.max(...emitted.map(([x]) => Math.abs(x))) * 2);
const height = ceilAt(Math.max(...emitted.map(([, y]) => Math.abs(y))) * 2);

const pointCount = serialised.reduce(
  (total, region) =>
    total +
    region.polygons.reduce(
      (sum, polygon) => sum + polygon.outer.length / 2 + polygon.holes.reduce((h, hole) => h + hole.length / 2, 0),
      0,
    ),
  0,
);

/** Compact printer: coordinate runs stay on one line so a diff is readable. */
function formatRing(ring, indent) {
  const pairs = [];
  for (let i = 0; i < ring.length; i += 2) pairs.push(`${ring[i]}, ${ring[i + 1]}`);
  const lines = [];
  for (let i = 0; i < pairs.length; i += 4) lines.push(`${indent}  ${pairs.slice(i, i + 4).join(", ")},`);
  return `[\n${lines.join("\n")}\n${indent}]`;
}

function formatRegion(region) {
  const polygons = region.polygons
    .map((polygon) => {
      const holes =
        polygon.holes.length === 0
          ? "[]"
          : `[${polygon.holes.map((hole) => formatRing(hole, "        ")).join(", ")}]`;
      return [
        "    {",
        `      outer: ${formatRing(polygon.outer, "      ")},`,
        `      holes: ${holes},`,
        "    },",
      ].join("\n");
    })
    .join("\n");
  return [
    "  {",
    `    id: ${JSON.stringify(region.id)},`,
    `    iso: ${JSON.stringify(region.iso)},`,
    `    anchor: [${region.anchor[0]}, ${region.anchor[1]}],`,
    `    areaShare: ${region.areaShare},`,
    "    polygons: [",
    polygons,
    "    ],",
    "  },",
  ].join("\n");
}

const file = `// Generated by scripts/build-region-geometry.mjs — do not edit by hand.
//
// Source: Natural Earth 1:10m Admin 1 – States, Provinces, which is in the
// public domain. Rings are simplified, projected equirectangular at ${REFERENCE_LATITUDE}°N,
// and normalised into a centred map space ${MAP_WIDTH} units wide. Coordinates are flat
// [x, y, x, y, …] pairs: +x is east, +y is north.

export type RegionPolygon = {
  /** Outer ring, counter-clockwise. */
  readonly outer: readonly number[];
  /** Interior rings, clockwise. Only Tashkent region has one. */
  readonly holes: readonly (readonly number[])[];
};

export type RegionGeometry = {
  readonly id: string;
  /** ISO 3166-2 code, kept so the geometry can be re-derived from the source. */
  readonly iso: string;
  /** Where the region's pin stands, in map space. */
  readonly anchor: readonly [number, number];
  /** Share of the country's area, used to scale each region's pin. */
  readonly areaShare: number;
  readonly polygons: readonly RegionPolygon[];
};

/** Map-space extent of the country: ${width} east-west by ${height} north-south. */
export const MAP_EXTENT = { width: ${width}, height: ${height} } as const;

export const REGION_GEOMETRY: readonly RegionGeometry[] = [
${serialised.map(formatRegion).join("\n")}
] as const;
`;

writeFileSync("src/lib/map/region-geometry.ts", file);
console.log(`wrote ${serialised.length} regions, ${pointCount} points, extent ${width} x ${height}`);
