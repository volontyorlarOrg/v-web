import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { rise } from "../anim";
import { AppStage } from "../components/AppStage";
import { Check } from "../components/Ui";
import { OPPORTUNITIES, REQUIREMENTS, app } from "../copy";
import { color, font, radius } from "../theme";

const item = OPPORTUNITIES[0];

export function Confirmed({ length }: { length: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame: frame - 30, fps, config: { damping: 13, mass: 0.6 } });
  const checkProgress = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <AppStage
      eyebrow="Confirmed"
      headline="Your place is confirmed."
      note="The organiser has your name. You get the details the day before, and the hours land on your record afterwards."
      length={length}
      accent
    >
      <AbsoluteFill
        style={{
          background: color.paper,
          paddingTop: 54,
          alignItems: "center",
        }}
      >
        <div style={{ padding: "70px 28px 0", width: "100%" }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: radius.pill,
              background: "rgba(232,93,48,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              transform: `scale(${0.4 + pop * 0.6})`,
              opacity: pop,
            }}
          >
            <Check size={46} tone={color.accent} progress={checkProgress} strokeWidth={2.6} />
          </div>

          <h3
            style={{
              ...rise(frame, { delay: 48 }),
              fontFamily: font.serif,
              fontWeight: 400,
              fontSize: 40,
              letterSpacing: "-0.028em",
              color: color.ink,
              textAlign: "center",
              margin: "34px 0 0",
            }}
          >
            {app.confirmTitle}
          </h3>

          <p
            style={{
              ...rise(frame, { delay: 56 }),
              fontFamily: font.sans,
              fontSize: 16,
              lineHeight: 1.5,
              color: color.inkMuted,
              textAlign: "center",
              margin: "14px auto 0",
              maxWidth: 300,
            }}
          >
            {app.confirmLead}
          </p>

          <div
            style={{
              ...rise(frame, { delay: 68, distance: 20 }),
              marginTop: 36,
              borderRadius: radius.lg,
              background: color.surface,
              border: `1px solid ${color.border}`,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: font.sans,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-0.018em",
                color: color.ink,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: font.sans,
                fontSize: 14,
                color: color.inkMuted,
              }}
            >
              {item.organiser} · {item.region}
            </div>

            <div
              style={{
                marginTop: 15,
                paddingTop: 14,
                borderTop: `1px solid ${color.border}`,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: font.sans,
                fontSize: 14.5,
              }}
            >
              <span style={{ color: color.inkMuted }}>{item.date}</span>
              <span style={{ color: color.ink, fontWeight: 500 }}>08:30</span>
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: font.sans,
                fontSize: 14.5,
                color: color.inkMuted,
              }}
            >
              {REQUIREMENTS[0]}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AppStage>
  );
}
