import type { CSSProperties, ReactNode } from "react";

import { color, font, radius } from "../theme";

type Tone = "primary" | "outline" | "inverse" | "accent";

const tones: Record<Tone, CSSProperties> = {
  primary: { background: color.primaryInk, color: color.knockout },
  outline: {
    background: "transparent",
    color: color.ink,
    border: `1px solid ${color.borderControl}`,
  },
  inverse: { background: color.knockout, color: color.primaryInk },
  accent: { background: color.accentInk, color: color.knockout },
};

export function Pill({
  children,
  tone = "primary",
  size = "md",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}) {
  const scale = size === "sm" ? 0.86 : size === "lg" ? 1.16 : 1;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: radius.pill,
        fontFamily: font.sans,
        fontWeight: 500,
        letterSpacing: "-0.008em",
        fontSize: 17 * scale,
        minHeight: 52 * scale,
        paddingInline: 28 * scale,
        whiteSpace: "nowrap",
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Check({
  size = 24,
  tone = color.accent,
  progress = 1,
  strokeWidth = 3,
}: {
  size?: number;
  tone?: string;
  progress?: number;
  strokeWidth?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 12.5 9.5 17.5 19.5 6.5"
        stroke={tone}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={`${progress * 100} 100`}
      />
    </svg>
  );
}

export function Field({
  label,
  value,
  caret,
  focused,
}: {
  label: string;
  value: string;
  caret?: boolean;
  focused?: boolean;
}) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontFamily: font.sans,
          fontSize: 13,
          fontWeight: 500,
          color: color.inkMuted,
          marginBottom: 9,
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          height: 54,
          paddingInline: 17,
          borderRadius: radius.md,
          background: color.surface,
          border: `1.5px solid ${focused ? color.primary : color.border}`,
          boxShadow: focused ? `0 0 0 4px rgba(0,127,194,0.12)` : "none",
          fontFamily: font.sans,
          fontSize: 17,
          color: color.ink,
          letterSpacing: "-0.008em",
        }}
      >
        {value}
        {caret ? (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 21,
              marginLeft: 2,
              background: color.primary,
            }}
          />
        ) : null}
      </span>
    </label>
  );
}
