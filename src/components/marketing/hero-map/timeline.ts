export const EMERGE_END = 0.3;
export const REVEAL_START = 0.32;
export const REVEAL_END = 0.7;
export const LIFT_DURATION = 0.15;
export const SETTLE_START = 0.76;
export const SETTLE_END = 0.94;

export const BACKDROP_TIP_DEGREES = 58;
export const PLAN_TIP_DEGREES = 9;
export const REVEAL_TIP_DEGREES = 33;
export const FINAL_TIP_DEGREES = 46;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const span = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));

export type MapPhase = {
  emerge: number;
  reveal: number;
  settle: number;
  tipDegrees: number;
};

export function mapPhase(progress: number): MapPhase {
  const p = clamp01(progress);
  const emerge = easeInOut(span(p, 0, EMERGE_END));
  const reveal = span(p, REVEAL_START, REVEAL_END);
  const settle = easeInOut(span(p, SETTLE_START, SETTLE_END));

  let tipDegrees = lerp(BACKDROP_TIP_DEGREES, PLAN_TIP_DEGREES, emerge);
  tipDegrees = lerp(tipDegrees, REVEAL_TIP_DEGREES, easeInOut(reveal));
  tipDegrees = lerp(tipDegrees, FINAL_TIP_DEGREES, settle);

  return { emerge, reveal, settle, tipDegrees };
}

export function liftStagger(count: number): number {
  return count > 1 ? (REVEAL_END - REVEAL_START - LIFT_DURATION) / (count - 1) : 0;
}

export function provinceLift(order: number, count: number, progress: number): number {
  const from = REVEAL_START + order * liftStagger(count);
  return span(clamp01(progress), from, from + LIFT_DURATION);
}
