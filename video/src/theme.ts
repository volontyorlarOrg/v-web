export const color = {
  paper: "#fbfaf7",
  surface: "#ffffff",
  surfaceSunk: "#f1efe9",
  surfaceSoft: "#e7f1f8",

  ink: "#222b33",
  inkMuted: "#566270",

  border: "#e3e0d8",
  borderControl: "#949084",

  knockout: "#ffffff",

  primary: "#007fc2",
  primaryInk: "#005e92",
  primaryDeep: "#004a73",
  primaryMuted: "#bfdcef",

  accent: "#e85d30",
  accentInk: "#b34917",
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
  pill: 9999,
} as const;

export const font = {
  sans: "Onest, ui-sans-serif, system-ui, sans-serif",
  serif: "'Source Serif 4', ui-serif, Georgia, serif",
} as const;

export const display = {
  fontFamily: font.serif,
  fontWeight: 400,
  lineHeight: 1.02,
  letterSpacing: "-0.028em",
} as const;

export const FPS = 30;

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
