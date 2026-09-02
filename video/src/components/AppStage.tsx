import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

import { fade, fadeOut, rise } from "../anim";
import { color, font } from "../theme";
import { PhoneFrame } from "./Frames";

export function AppStage({
  eyebrow,
  headline,
  note,
  children,
  length,
  accent = false,
}: {
  eyebrow: string;
  headline: string;
  note?: string;
  children: ReactNode;
  length: number;
  accent?: boolean;
}) {
  const frame = useCurrentFrame();
  const tone = accent ? color.accent : color.primary;
  const toneInk = accent ? color.accentInk : color.primaryInk;

  const enter = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leave = fadeOut(frame, length - 18, 18);

  return (
    <AbsoluteFill style={{ background: color.paper, opacity: leave }}>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: "50%",
          transform: "translateY(-50%)",
          width: 620,
        }}
      >
        <div
          style={{
            opacity: fade(frame, 8, 18),
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: font.sans,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: toneInk,
          }}
        >
          <span
            style={{
              width: 34,
              height: 2,
              background: tone,
              transform: `scaleX(${fade(frame, 8, 26)})`,
              transformOrigin: "left center",
            }}
          />
          {eyebrow}
        </div>

        <h2
          style={{
            ...rise(frame, { delay: 14 }),
            fontFamily: font.serif,
            fontWeight: 400,
            fontSize: 62,
            lineHeight: 1.06,
            letterSpacing: "-0.028em",
            color: color.ink,
            margin: "30px 0 0",
          }}
        >
          {headline}
        </h2>

        {note ? (
          <p
            style={{
              ...rise(frame, { delay: 24 }),
              fontFamily: font.sans,
              fontSize: 21,
              lineHeight: 1.55,
              color: color.inkMuted,
              margin: "28px 0 0",
              maxWidth: 500,
            }}
          >
            {note}
          </p>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 1360,
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${(1 - enter) * 44}px) scale(${
            0.97 + enter * 0.03
          })`,
          opacity: enter,
        }}
      >
        <PhoneFrame>{children}</PhoneFrame>
      </div>
    </AbsoluteFill>
  );
}

export function AppHeader({ title }: { title?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        insetInline: 0,
        top: 54,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 22,
        borderBottom: `1px solid ${color.border}`,
        background: color.paper,
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: font.sans,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          color: color.ink,
        }}
      >
        {title ?? "Volontyorlar"}
      </span>
    </div>
  );
}
