import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { caretOn, fade, typewriter } from "../anim";
import { AppStage } from "../components/AppStage";
import { BrandMark } from "../components/Brand";
import { PHONE_VIEWPORT } from "../components/Frames";
import { Tap } from "../components/Interaction";
import { Check, Field, Pill } from "../components/Ui";
import { app } from "../copy";
import { color, font, radius } from "../theme";

const TYPE_START = 40;
const SEND_TAP = 96;
const SWITCH = 112;
const CODE_START = 128;
const DONE = 196;

export function LogIn({ length }: { length: number }) {
  const frame = useCurrentFrame();

  const slide = interpolate(frame, [SWITCH, SWITCH + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <AppStage
      eyebrow="Log in"
      headline="One account, one tap."
      note="A phone number and a six-digit code. Nothing to remember, nothing to lose."
      length={length}
    >
      <AbsoluteFill style={{ background: color.paper, paddingTop: 54 }}>
        <div
          style={{
            display: "flex",
            width: PHONE_VIEWPORT.width * 2,
            transform: `translateX(${-slide * PHONE_VIEWPORT.width}px)`,
          }}
        >
          <PhoneScreen frame={frame} />
          <CodeScreen frame={frame} />
        </div>
      </AbsoluteFill>

      <Tap x={195} y={426} at={SEND_TAP} />
    </AppStage>
  );
}

function PhoneScreen({ frame }: { frame: number }) {
  const typed = typewriter(app.phoneValue, frame, TYPE_START, 2.4);
  const typing = frame >= TYPE_START && typed.length < app.phoneValue.length;
  const ready = typed.length === app.phoneValue.length;

  return (
    <div style={{ width: PHONE_VIEWPORT.width, padding: "44px 28px 0", flexShrink: 0 }}>
      <BrandMark size={44} tone={color.primary} />

      <h3
        style={{
          fontFamily: font.serif,
          fontWeight: 400,
          fontSize: 38,
          letterSpacing: "-0.028em",
          color: color.ink,
          margin: "30px 0 0",
        }}
      >
        {app.loginTitle}
      </h3>
      <p
        style={{
          fontFamily: font.sans,
          fontSize: 16,
          lineHeight: 1.5,
          color: color.inkMuted,
          margin: "12px 0 0",
        }}
      >
        {app.loginLead}
      </p>

      <div style={{ marginTop: 38 }}>
        <Field
          label={app.phoneLabel}
          value={typed}
          caret={typing && caretOn(frame)}
          focused={frame >= TYPE_START - 8}
        />
      </div>

      <Pill
        tone="primary"
        style={{
          width: "100%",
          marginTop: 26,
          opacity: ready ? 1 : 0.45,
          transform: frame >= SEND_TAP && frame < SEND_TAP + 6 ? "scale(0.985)" : "none",
        }}
      >
        {app.continueCta}
      </Pill>
    </div>
  );
}

function CodeScreen({ frame }: { frame: number }) {
  const digits = app.code.split("");
  const filled = Math.floor(
    interpolate(frame, [CODE_START, CODE_START + digits.length * 7], [0, digits.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const verified = frame >= DONE;
  const checkProgress = interpolate(frame, [DONE, DONE + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <div style={{ width: PHONE_VIEWPORT.width, padding: "44px 28px 0", flexShrink: 0 }}>
      <BrandMark size={44} tone={color.primary} />

      <h3
        style={{
          fontFamily: font.serif,
          fontWeight: 400,
          fontSize: 38,
          letterSpacing: "-0.028em",
          color: color.ink,
          margin: "30px 0 0",
        }}
      >
        {app.codeTitle}
      </h3>
      <p
        style={{
          fontFamily: font.sans,
          fontSize: 16,
          lineHeight: 1.5,
          color: color.inkMuted,
          margin: "12px 0 0",
        }}
      >
        {app.codeLead}
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 38 }}>
        {digits.map((digit, i) => {
          const isFilled = i < filled;
          const isNext = i === filled && !verified;
          return (
            <span
              key={i}
              style={{
                flex: 1,
                height: 62,
                borderRadius: radius.md,
                background: color.surface,
                border: `1.5px solid ${
                  verified ? color.primary : isNext ? color.primary : color.border
                }`,
                boxShadow: isNext ? "0 0 0 4px rgba(0,127,194,0.12)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: font.sans,
                fontSize: 24,
                fontWeight: 600,
                color: color.ink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {isFilled ? digit : ""}
            </span>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 32,
          opacity: fade(frame, DONE, 12),
        }}
      >
        <Check size={22} tone={color.primary} progress={checkProgress} />
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 16,
            fontWeight: 500,
            color: color.primaryInk,
          }}
        >
          Signed in
        </span>
      </div>
    </div>
  );
}
