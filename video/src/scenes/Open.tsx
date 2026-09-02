import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

import { fade, fadeOut } from "../anim";
import { BrandMark } from "../components/Brand";
import { captions } from "../copy";
import { color, font } from "../theme";

export function Open({ length }: { length: number }) {
  const frame = useCurrentFrame();

  const wordReveal = interpolate(frame, [34, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leave = fadeOut(frame, length - 20, 20);

  return (
    <AbsoluteFill
      style={{
        background: color.paper,
        alignItems: "center",
        justifyContent: "center",
        opacity: leave,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <BrandMark size={132} tone={color.primary} draw={{ start: 8 }} />

        <div
          style={{
            marginTop: 34,
            overflow: "hidden",
            paddingBottom: 14,
            marginBottom: -14,
          }}
        >
          <div
            style={{
              fontFamily: font.sans,
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: color.ink,
              lineHeight: 1,
              transform: `translateY(${(1 - wordReveal) * 118}%)`,
            }}
          >
            Volontyorlar
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: font.sans,
            fontSize: 27,
            color: color.inkMuted,
            letterSpacing: "-0.008em",
            opacity: fade(frame, 62, 22),
          }}
        >
          {captions.open}
        </div>
      </div>
    </AbsoluteFill>
  );
}
