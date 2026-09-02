import { Easing, interpolate } from "remotion";

const OUT = Easing.bezier(0.22, 1, 0.36, 1);
const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

type RiseOptions = {
  delay?: number;
  duration?: number;
  distance?: number;
};

export function rise(frame: number, options: RiseOptions = {}) {
  const { delay = 0, duration = 24, distance = 26 } = options;
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });

  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
}

export function fade(frame: number, delay = 0, duration = 18) {
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: OUT,
  });
}

export function fadeOut(frame: number, start: number, duration = 18) {
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: IN_OUT,
  });
}

export function ramp(
  frame: number,
  from: number,
  to: number,
  outputFrom: number,
  outputTo: number,
) {
  return interpolate(frame, [from, to], [outputFrom, outputTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: IN_OUT,
  });
}

export function typewriter(text: string, frame: number, start: number, perChar = 2.2) {
  const shown = Math.floor(
    interpolate(frame, [start, start + text.length * perChar], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return text.slice(0, shown);
}

export function caretOn(frame: number) {
  return Math.floor(frame / 15) % 2 === 0;
}
