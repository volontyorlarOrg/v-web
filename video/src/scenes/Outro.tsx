import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { fade, rise } from "../anim";
import { BrandMark } from "../components/Brand";
import { Pill } from "../components/Ui";
import { SITE_URL_LABEL, outro } from "../copy";
import { color, font } from "../theme";

export function Outro({ length }: { length: number }) {
  const frame = useCurrentFrame();

  const rule = interpolate(frame, [30, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  const settle = interpolate(frame, [length - 40, length], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: color.paper,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${settle})`,
        }}
      >
        <BrandMark size={92} tone={color.primary} draw={{ start: 4 }} />

        <h2
          style={{
            ...rise(frame, { delay: 26 }),
            fontFamily: font.serif,
            fontWeight: 400,
            fontSize: 68,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: color.ink,
            textAlign: "center",
            maxWidth: 1080,
            margin: "44px 0 0",
          }}
        >
          {outro.title}
        </h2>

        <div
          style={{
            width: 120,
            height: 2,
            background: color.primary,
            marginTop: 48,
            transform: `scaleX(${rule})`,
          }}
        />

        <div style={{ opacity: fade(frame, 56, 22), marginTop: 44 }}>
          {SITE_URL_LABEL ? (
            <span
              style={{
                fontFamily: font.sans,
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: color.primaryInk,
              }}
            >
              {SITE_URL_LABEL}
            </span>
          ) : (
            <Pill tone="primary" size="lg">
              {outro.cta}
            </Pill>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}
