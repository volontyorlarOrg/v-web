import type { CSSProperties, ReactNode } from "react";

import { color, font, radius } from "../theme";

export const BROWSER_VIEWPORT = { width: 1280, height: 800 };
export const PHONE_VIEWPORT = { width: 390, height: 844 };

export function BrowserFrame({
  url,
  children,
  style,
}: {
  url: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: BROWSER_VIEWPORT.width,
        borderRadius: radius.xl,
        background: color.surface,
        border: `1px solid ${color.border}`,
        boxShadow: "0 40px 90px -40px rgba(34,43,51,0.38), 0 8px 24px -12px rgba(34,43,51,0.16)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          height: 52,
          paddingInline: 20,
          background: color.surfaceSunk,
          borderBottom: `1px solid ${color.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 11,
                height: 11,
                borderRadius: radius.pill,
                background: color.border,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: radius.pill,
            background: color.surface,
            border: `1px solid ${color.border}`,
            display: "flex",
            alignItems: "center",
            paddingInline: 14,
            fontFamily: font.sans,
            fontSize: 13,
            color: color.inkMuted,
            letterSpacing: "-0.01em",
          }}
        >
          {url}
        </div>
      </div>

      <div
        style={{
          height: BROWSER_VIEWPORT.height,
          overflow: "hidden",
          position: "relative",
          background: color.paper,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: PHONE_VIEWPORT.width + 24,
        height: PHONE_VIEWPORT.height + 24,
        borderRadius: 60,
        padding: 12,
        background: color.ink,
        boxShadow:
          "0 50px 110px -40px rgba(34,43,51,0.45), 0 10px 30px -14px rgba(34,43,51,0.22)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: PHONE_VIEWPORT.width,
          height: PHONE_VIEWPORT.height,
          borderRadius: 48,
          overflow: "hidden",
          background: color.paper,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 54,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: 30,
            fontFamily: font.sans,
            fontSize: 14,
            fontWeight: 600,
            color: color.ink,
          }}
        >
          <span>9:41</span>
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 10,
              width: 104,
              height: 30,
              borderRadius: radius.pill,
              background: color.ink,
            }}
          />
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Bars />
            <Battery />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Bars() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill={color.ink}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4.5} y={8 - i * 2.4} width="3" height={3 + i * 2.4} rx="1" />
      ))}
    </svg>
  );
}

function Battery() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3.5"
        fill="none"
        stroke={color.ink}
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="15" height="8" rx="2" fill={color.ink} />
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill={color.ink} fillOpacity="0.4" />
    </svg>
  );
}
