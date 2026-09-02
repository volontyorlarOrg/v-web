import { interpolate, useCurrentFrame } from "remotion";

import { fade, fadeOut, ramp } from "../anim";
import { color, font, radius } from "../theme";

export function Cursor({
  from,
  to,
  start,
  travel = 26,
  clickAt,
}: {
  from: [number, number];
  to: [number, number];
  start: number;
  travel?: number;
  clickAt?: number;
}) {
  const frame = useCurrentFrame();
  const x = ramp(frame, start, start + travel, from[0], to[0]);
  const y = ramp(frame, start, start + travel, from[1], to[1]);

  const pressed =
    clickAt !== undefined && frame >= clickAt && frame < clickAt + 6 ? 0.86 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 40,
        pointerEvents: "none",
        opacity: fade(frame, start - 8, 10),
        transform: `scale(${pressed})`,
        transformOrigin: "top left",
      }}
    >
      {clickAt !== undefined ? <Ripple at={clickAt} /> : null}
      <svg width="26" height="30" viewBox="0 0 26 30" style={{ position: "relative" }}>
        <path
          d="M2 1.6 21.4 15.1l-8.2 1.2 4.4 9.3-3.5 1.7-4.4-9.3-5.6 5.4z"
          fill={color.ink}
          stroke={color.knockout}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Ripple({ at }: { at: number }) {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < 0 || local > 24) return null;

  const scale = interpolate(local, [0, 24], [0.2, 1.9], { extrapolateRight: "clamp" });
  const opacity = interpolate(local, [0, 24], [0.4, 0], { extrapolateRight: "clamp" });

  return (
    <span
      style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 52,
        height: 52,
        marginLeft: -26,
        marginTop: -26,
        borderRadius: radius.pill,
        border: `2px solid ${color.primary}`,
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
}

export function Tap({ x, y, at }: { x: number; y: number; at: number }) {
  const frame = useCurrentFrame();
  const local = frame - at;
  if (local < -6 || local > 26) return null;

  const scale = interpolate(local, [0, 26], [0.25, 1.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(local, [0, 8, 26], [0.55, 0.32, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 76,
        height: 76,
        marginLeft: -38,
        marginTop: -38,
        borderRadius: radius.pill,
        border: `3px solid ${color.primary}`,
        background: "rgba(0,127,194,0.10)",
        transform: `scale(${scale})`,
        opacity,
        zIndex: 40,
        pointerEvents: "none",
      }}
    />
  );
}

export function SceneLabel({
  children,
  enter = 6,
  exit,
}: {
  children: string;
  enter?: number;
  exit: number;
}) {
  const frame = useCurrentFrame();
  const inOpacity = fade(frame, enter, 16);
  const outOpacity = fadeOut(frame, exit, 14);
  const rule = interpolate(frame, [enter, enter + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 78,
        zIndex: 30,
        opacity: Math.min(inOpacity, outOpacity),
      }}
    >
      <div
        style={{
          width: 64,
          height: 2,
          background: color.primary,
          transform: `scaleX(${rule})`,
          transformOrigin: "left center",
          marginBottom: 18,
        }}
      />
      <div
        style={{
          fontFamily: font.sans,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: color.inkMuted,
        }}
      >
        {children}
      </div>
    </div>
  );
}
