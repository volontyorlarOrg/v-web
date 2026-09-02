import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { rise } from "../anim";
import { AppStage } from "../components/AppStage";
import { Tap } from "../components/Interaction";
import { Check, Pill } from "../components/Ui";
import { OPPORTUNITIES, REQUIREMENTS, app } from "../copy";
import { color, font, radius } from "../theme";

const APPLY_TAP = 196;
const APPLYING = 204;
const APPLIED = 264;

const item = OPPORTUNITIES[0];

export function Apply({ length }: { length: number }) {
  const frame = useCurrentFrame();

  return (
    <AppStage
      eyebrow="Apply"
      headline="Applying takes a minute."
      note="You already know what the organiser needs before you say yes. One tap, and your name is on the list."
      length={length}
    >
      <AbsoluteFill style={{ background: color.paper }}>
        <TopBar />

        <div style={{ padding: "126px 22px 0" }}>
          <div
            style={{
              ...rise(frame, { delay: 22, distance: 18 }),
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontFamily: font.sans,
              fontSize: 12.5,
              fontWeight: 500,
              color: color.primaryInk,
              letterSpacing: "0.02em",
            }}
          >
            <Check size={14} tone={color.primary} progress={1} strokeWidth={3.4} />
            Checked with {item.organiser}
          </div>

          <h3
            style={{
              ...rise(frame, { delay: 28 }),
              fontFamily: font.serif,
              fontWeight: 400,
              fontSize: 34,
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              color: color.ink,
              margin: "14px 0 0",
            }}
          >
            {item.title}
          </h3>

          <div
            style={{
              ...rise(frame, { delay: 34, distance: 16 }),
              marginTop: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {[item.region, item.date, `${item.slots} places`].map((meta) => (
              <span
                key={meta}
                style={{
                  borderRadius: radius.pill,
                  background: color.surfaceSoft,
                  color: color.primaryInk,
                  fontFamily: font.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "7px 13px",
                }}
              >
                {meta}
              </span>
            ))}
          </div>

          <div
            style={{
              ...rise(frame, { delay: 48, distance: 16 }),
              marginTop: 30,
              fontFamily: font.sans,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: color.inkMuted,
            }}
          >
            {app.requirementsTitle}
          </div>

          <div style={{ marginTop: 16 }}>
            {REQUIREMENTS.map((requirement, i) => (
              <div
                key={requirement}
                style={{
                  ...rise(frame, { delay: 56 + i * 12, distance: 16 }),
                  display: "flex",
                  gap: 12,
                  padding: "14px 0",
                  borderTop: `1px solid ${color.border}`,
                  fontFamily: font.sans,
                  fontSize: 15.5,
                  lineHeight: 1.45,
                  color: color.ink,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: 2,
                    width: 20,
                    height: 20,
                    borderRadius: radius.pill,
                    background: color.surfaceSoft,
                    color: color.primaryInk,
                    fontSize: 11.5,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                {requirement}
              </div>
            ))}
          </div>
        </div>

        <ApplyBar frame={frame} />
        <Tap x={195} y={788} at={APPLY_TAP} />
      </AbsoluteFill>
    </AppStage>
  );
}

function TopBar() {
  return (
    <div
      style={{
        position: "absolute",
        insetInline: 0,
        top: 54,
        height: 58,
        display: "flex",
        alignItems: "center",
        gap: 12,
        paddingInline: 20,
        borderBottom: `1px solid ${color.border}`,
        background: color.paper,
        zIndex: 10,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M12.5 4 6.5 10l6 6"
          stroke={color.ink}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: font.sans,
          fontSize: 15,
          fontWeight: 500,
          color: color.inkMuted,
        }}
      >
        {app.discoverTitle}
      </span>
    </div>
  );
}

function ApplyBar({ frame }: { frame: number }) {
  const applied = frame >= APPLIED;
  const applying = frame >= APPLYING && !applied;

  const checkProgress = interpolate(frame, [APPLIED, APPLIED + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const spin = ((frame - APPLYING) / 26) * 360;

  return (
    <div
      style={{
        position: "absolute",
        insetInline: 0,
        bottom: 0,
        padding: "16px 22px 30px",
        background: "rgba(251,250,247,0.94)",
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${color.border}`,
        zIndex: 10,
      }}
    >
      {applied ? (
        <div
          style={{
            height: 52,
            borderRadius: radius.pill,
            border: `1.5px solid ${color.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            fontFamily: font.sans,
            fontSize: 17,
            fontWeight: 600,
            color: color.accentInk,
            letterSpacing: "-0.008em",
          }}
        >
          <Check size={19} tone={color.accent} progress={checkProgress} />
          {app.appliedCta}
        </div>
      ) : (
        <Pill
          tone="primary"
          style={{
            width: "100%",
            transform:
              frame >= APPLY_TAP && frame < APPLY_TAP + 6 ? "scale(0.985)" : "none",
          }}
        >
          {applying ? (
            <>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: radius.pill,
                  border: "2px solid rgba(255,255,255,0.35)",
                  borderTopColor: color.knockout,
                  transform: `rotate(${spin}deg)`,
                  display: "inline-block",
                }}
              />
              {app.applyingCta}
            </>
          ) : (
            app.applyCta
          )}
        </Pill>
      )}
    </div>
  );
}
