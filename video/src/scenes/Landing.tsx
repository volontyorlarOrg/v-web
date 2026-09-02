import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import { fade, fadeOut, rise } from "../anim";
import { BrandLockup } from "../components/Brand";
import { BrowserFrame } from "../components/Frames";
import { SceneLabel } from "../components/Interaction";
import { Pill } from "../components/Ui";
import { BROWSER_LABEL, REGIONS, captions, site } from "../copy";
import { color, font, radius } from "../theme";

const HEADER_H = 84;
const HERO_H = 700;
const HOW_H = 760;

export function Landing({ length }: { length: number }) {
  const frame = useCurrentFrame();

  const scrollY = interpolate(
    frame,
    [0, 96, 150, 250, 294, length],
    [0, 0, HERO_H - 24, HERO_H - 24, HERO_H + HOW_H - 90, HERO_H + HOW_H - 90],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );

  return (
    <AbsoluteFill style={{ background: color.paper, opacity: fadeOut(frame, length - 20, 20) }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "scale(0.88) translateY(-26px)" }}>
          <BrowserFrame url={BROWSER_LABEL}>
            <Header />
            <div style={{ transform: `translateY(${-scrollY}px)`, paddingTop: HEADER_H }}>
              <Hero frame={frame} />
              <How frame={frame} />
              <Stats frame={frame} />
            </div>
          </BrowserFrame>
        </div>
      </AbsoluteFill>

      <SceneLabel exit={length - 22}>{captions.landing}</SceneLabel>
    </AbsoluteFill>
  );
}

function Header() {
  return (
    <div
      style={{
        position: "absolute",
        insetInline: 0,
        top: 0,
        height: HEADER_H,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 56,
        background: "rgba(251,250,247,0.86)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${color.border}`,
      }}
    >
      <BrandLockup size={30} />

      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        {site.navItems.map((item) => (
          <span
            key={item}
            style={{
              fontFamily: font.sans,
              fontSize: 15,
              color: color.inkMuted,
              letterSpacing: "-0.008em",
            }}
          >
            {item}
          </span>
        ))}
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 15,
            fontWeight: 500,
            color: color.primaryInk,
            border: `1px solid ${color.borderControl}`,
            borderRadius: radius.pill,
            padding: "9px 20px",
          }}
        >
          {site.heroLoginCta}
        </span>
      </div>
    </div>
  );
}

function Hero({ frame }: { frame: number }) {
  return (
    <section
      style={{
        height: HERO_H,
        paddingInline: 56,
        paddingTop: 96,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ ...rise(frame, { delay: 6 }), display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: font.sans,
            fontSize: 16,
            color: color.inkMuted,
            letterSpacing: "-0.008em",
          }}
        >
          {site.heroEyebrow}
        </span>
        <RollingWord frame={frame} />
      </div>

      <h1
        style={{
          ...rise(frame, { delay: 14 }),
          fontFamily: font.serif,
          fontWeight: 400,
          fontSize: 78,
          lineHeight: 0.99,
          letterSpacing: "-0.032em",
          color: color.ink,
          maxWidth: 940,
          margin: "36px 0 0",
        }}
      >
        {site.heroTitle}
      </h1>

      <p
        style={{
          ...rise(frame, { delay: 22 }),
          fontFamily: font.sans,
          fontSize: 21,
          lineHeight: 1.55,
          color: color.inkMuted,
          maxWidth: 560,
          margin: "32px 0 0",
        }}
      >
        {site.heroLead}
      </p>

      <div style={{ ...rise(frame, { delay: 30 }), display: "flex", gap: 14, marginTop: 44 }}>
        <Pill tone="primary">{site.heroPrimaryCta}</Pill>
        <Pill tone="outline">{site.heroLoginCta}</Pill>
      </div>
    </section>
  );
}

function RollingWord({ frame }: { frame: number }) {
  const CYCLE = 46;
  const index = Math.min(Math.floor(frame / CYCLE), REGIONS.length - 1);
  const local = frame - index * CYCLE;
  const word = REGIONS[index] ?? REGIONS[0];

  return (
    <span
      style={{
        display: "inline-flex",
        overflow: "hidden",
        height: 32,
        alignItems: "center",
        background: color.surfaceSoft,
        borderRadius: radius.pill,
        paddingInline: 12,
      }}
    >
      <span style={{ display: "inline-flex" }}>
        {word.split("").map((char, i) => {
          const inProgress = interpolate(local, [i * 1.1, i * 1.1 + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          });
          const outProgress = interpolate(
            local,
            [CYCLE - 12 + i * 0.9, CYCLE - 12 + i * 0.9 + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const shift = (1 - inProgress) * 115 - outProgress * 115;

          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                fontFamily: font.sans,
                fontSize: 16,
                fontWeight: 600,
                color: color.primaryInk,
                letterSpacing: "-0.01em",
                transform: `translateY(${shift}%)`,
                opacity: inProgress * (1 - outProgress),
                whiteSpace: "pre",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function How({ frame }: { frame: number }) {
  const start = 150;
  const railDraw = interpolate(frame, [start + 8, start + 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <section
      style={{
        height: HOW_H,
        paddingInline: 56,
        paddingTop: 104,
        background: color.surfaceSunk,
      }}
    >
      <Eyebrow frame={frame} delay={start}>
        {site.howEyebrow}
      </Eyebrow>

      <h2
        style={{
          ...rise(frame, { delay: start + 6 }),
          fontFamily: font.serif,
          fontWeight: 400,
          fontSize: 52,
          lineHeight: 1.1,
          letterSpacing: "-0.024em",
          color: color.ink,
          maxWidth: 760,
          margin: "22px 0 0",
        }}
      >
        {site.howTitle}
      </h2>

      <div style={{ position: "relative", marginTop: 92 }}>
        <div
          style={{
            position: "absolute",
            top: 17,
            left: 17,
            right: 120,
            height: 2,
            background: color.border,
            transform: `scaleX(${railDraw})`,
            transformOrigin: "left center",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 34 }}>
          {site.howSteps.map((step, i) => {
            const isVolunteer = i === site.howSteps.length - 1;
            const tone = isVolunteer ? color.accent : color.primary;
            const delay = start + 16 + i * 11;
            const node = interpolate(frame, [delay, delay + 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            });

            return (
              <div key={step.title} style={{ paddingRight: 20 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: radius.pill,
                    background: tone,
                    color: color.knockout,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: font.sans,
                    fontSize: 16,
                    fontWeight: 600,
                    transform: `scale(${0.25 + node * 0.75})`,
                    opacity: 0.2 + node * 0.8,
                  }}
                >
                  {i + 1}
                </div>

                <div style={{ ...rise(frame, { delay: delay + 4, distance: 16 }) }}>
                  <div
                    style={{
                      marginTop: 26,
                      fontFamily: font.sans,
                      fontSize: 22,
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: isVolunteer ? color.accentInk : color.ink,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: font.sans,
                      fontSize: 17,
                      lineHeight: 1.5,
                      color: color.inkMuted,
                    }}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats({ frame }: { frame: number }) {
  const start = 294;

  return (
    <section style={{ paddingInline: 56, paddingTop: 104, paddingBottom: 120 }}>
      <Eyebrow frame={frame} delay={start}>
        {site.statsEyebrow}
      </Eyebrow>

      <h2
        style={{
          ...rise(frame, { delay: start + 6 }),
          fontFamily: font.serif,
          fontWeight: 400,
          fontSize: 52,
          letterSpacing: "-0.024em",
          color: color.ink,
          margin: "22px 0 0",
        }}
      >
        {site.statsTitle}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 30,
          marginTop: 72,
        }}
      >
        {site.stats.map((stat, i) => {
          const delay = start + 14 + i * 8;
          const progress = interpolate(frame, [delay, delay + 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
          });
          const shown = Math.round(stat.value * progress);

          return (
            <div
              key={stat.label}
              style={{
                ...rise(frame, { delay, distance: 18 }),
                borderTop: `1px solid ${color.border}`,
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  fontFamily: font.serif,
                  fontWeight: 400,
                  fontSize: 62,
                  lineHeight: 1,
                  letterSpacing: "-0.028em",
                  color: color.ink,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {shown.toLocaleString("en-US")}
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: font.sans,
                  fontSize: 16,
                  lineHeight: 1.45,
                  color: color.inkMuted,
                  maxWidth: 200,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Eyebrow({
  children,
  frame,
  delay,
}: {
  children: string;
  frame: number;
  delay: number;
}) {
  return (
    <div
      style={{
        opacity: fade(frame, delay, 18),
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: font.sans,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: color.primaryInk,
      }}
    >
      <span style={{ width: 26, height: 1, background: color.primary }} />
      {children}
    </div>
  );
}
