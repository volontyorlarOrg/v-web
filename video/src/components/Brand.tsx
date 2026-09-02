import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { color } from "../theme";

export function BrandMark({
  size = 64,
  tone = color.primary,
  draw,
}: {
  size?: number;
  tone?: string;
  draw?: { start: number };
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = draw ? frame - draw.start : Number.POSITIVE_INFINITY;
  const drawing = Number.isFinite(local);

  const head = drawing
    ? spring({ frame: local - 4, fps, config: { damping: 12, mass: 0.7 } })
    : 1;
  const arms = drawing
    ? interpolate(local, [10, 34], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
      <circle
        cx="100"
        cy="76"
        r="20"
        fill={tone}
        opacity={head}
        style={{
          transformOrigin: "100px 76px",
          transform: `translateY(${(1 - head) * 26}px) scale(${0.55 + head * 0.45})`,
        }}
      />
      <path
        d="M 41.74 81.30 A 59 59 0 0 0 158.26 81.30"
        fill="none"
        stroke={tone}
        strokeWidth="13"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${arms * 100} 100`}
        strokeDashoffset={-50 * (1 - arms)}
      />
    </svg>
  );
}

export function BrandLockup({
  size = 34,
  tone = color.primary,
  wordTone = color.ink,
}: {
  size?: number;
  tone?: string;
  wordTone?: string;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.3 }}>
      <BrandMark size={size} tone={tone} />
      <span
        style={{
          fontSize: size * 0.56,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: wordTone,
          lineHeight: 1,
        }}
      >
        Volontyorlar
      </span>
    </span>
  );
}
