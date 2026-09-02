import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { rise } from "../anim";
import { AppHeader, AppStage } from "../components/AppStage";
import { Tap } from "../components/Interaction";
import { Check } from "../components/Ui";
import { OPPORTUNITIES, REGIONS, app } from "../copy";
import { color, font, radius } from "../theme";

const LIST_START = 34;
const SCROLL_AT = 150;
const CARD_TAP = 248;
const HEADER_BOTTOM = 112;

export function Discover({ length }: { length: number }) {
  const frame = useCurrentFrame();

  const scroll = interpolate(
    frame,
    [SCROLL_AT, SCROLL_AT + 34, SCROLL_AT + 58, SCROLL_AT + 84],
    [0, 118, 118, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );

  return (
    <AppStage
      eyebrow="Find something"
      headline="Opportunities, already checked."
      note="Every listing has been through a conversation with the organiser first. What you read is what the day is."
      length={length}
    >
      <AbsoluteFill style={{ background: color.paper }}>
        <AppHeader title={app.discoverTitle} />

        <div
          style={{
            position: "absolute",
            top: HEADER_BOTTOM,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ paddingTop: 18, transform: `translateY(${-scroll}px)` }}>
            <Filters frame={frame} />

            <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {OPPORTUNITIES.map((item, i) => (
                <Card
                  key={item.id}
                  item={item}
                  frame={frame}
                  delay={LIST_START + i * 12}
                  pressed={i === 0 && frame >= CARD_TAP && frame < CARD_TAP + 8}
                />
              ))}
            </div>
          </div>
        </div>

        <Tap x={195} y={252} at={CARD_TAP} />
      </AbsoluteFill>
    </AppStage>
  );
}

function Filters({ frame }: { frame: number }) {
  const chips = [app.filterAll, ...REGIONS.slice(0, 3)];

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "0 20px 18px",
        overflow: "hidden",
      }}
    >
      {chips.map((chip, i) => {
        const active = i === 0;
        return (
          <span
            key={chip}
            style={{
              ...rise(frame, { delay: 18 + i * 5, distance: 12 }),
              flexShrink: 0,
              borderRadius: radius.pill,
              paddingInline: 15,
              height: 36,
              display: "inline-flex",
              alignItems: "center",
              fontFamily: font.sans,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              background: active ? color.primaryInk : color.surface,
              color: active ? color.knockout : color.inkMuted,
              border: `1px solid ${active ? color.primaryInk : color.border}`,
            }}
          >
            {chip}
          </span>
        );
      })}
    </div>
  );
}

function Card({
  item,
  frame,
  delay,
  pressed,
}: {
  item: (typeof OPPORTUNITIES)[number];
  frame: number;
  delay: number;
  pressed: boolean;
}) {
  const checkProgress = interpolate(frame, [delay + 14, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <div
      style={{
        ...rise(frame, { delay, distance: 22 }),
        borderRadius: radius.lg,
        background: color.surface,
        border: `1px solid ${color.border}`,
        padding: "18px 18px 16px",
        transform: `${rise(frame, { delay, distance: 22 }).transform} scale(${
          pressed ? 0.98 : 1
        })`,
      }}
    >
      <div
        style={{
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
        <Check size={14} tone={color.primary} progress={checkProgress} strokeWidth={3.4} />
        Checked with {item.organiser}
      </div>

      <div
        style={{
          marginTop: 11,
          fontFamily: font.sans,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: "-0.018em",
          color: color.ink,
          lineHeight: 1.25,
        }}
      >
        {item.title}
      </div>

      <div
        style={{
          marginTop: 13,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: font.sans,
          fontSize: 14,
          color: color.inkMuted,
        }}
      >
        <span>{item.region}</span>
        <Dot />
        <span>{item.date}</span>
        <Dot />
        <span>{item.slots} places</span>
      </div>

      <div
        style={{
          marginTop: 15,
          paddingTop: 13,
          borderTop: `1px solid ${color.border}`,
          fontFamily: font.sans,
          fontSize: 13.5,
          fontWeight: 500,
          color: color.accentInk,
        }}
      >
        {item.needed} volunteers still needed
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span
      style={{
        width: 3,
        height: 3,
        borderRadius: radius.pill,
        background: color.borderControl,
        display: "inline-block",
      }}
    />
  );
}
