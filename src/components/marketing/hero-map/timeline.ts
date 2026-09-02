export const EMERGE_END = 0.22;
export const REVEAL_START = 0.24;
export const REVEAL_END = 0.66;
export const LIFT_DURATION = 0.16;
export const TURN_START = 0.7;

export const BACKDROP_TIP_DEGREES = 58;
export const PLAN_TIP_DEGREES = 9;
export const REVEAL_TIP_DEGREES = 33;
export const FINAL_TIP_DEGREES = 56;
export const FINAL_TURN_DEGREES = 12;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const span = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));

export type MapPhase = {
  /** 0 while the map is the hero's backdrop, 1 once it is the subject. */
  emerge: number;
  /** 0 before the first province lifts, 1 once every province is up. */
  reveal: number;
  /** 0 while the board faces the reader, 1 once it has turned to three-quarter. */
  turn: number;
  tipDegrees: number;
  turnDegrees: number;
};

export function mapPhase(progress: number): MapPhase {
  const p = clamp01(progress);
  const emerge = easeInOut(span(p, 0, EMERGE_END));
  const reveal = span(p, REVEAL_START, REVEAL_END);
  const turn = easeInOut(span(p, TURN_START, 1));

  let tipDegrees = lerp(BACKDROP_TIP_DEGREES, PLAN_TIP_DEGREES, emerge);
  tipDegrees = lerp(tipDegrees, REVEAL_TIP_DEGREES, easeInOut(reveal));
  tipDegrees = lerp(tipDegrees, FINAL_TIP_DEGREES, turn);

  return { emerge, reveal, turn, tipDegrees, turnDegrees: FINAL_TURN_DEGREES * turn };
}

export function liftStagger(count: number): number {
  return count > 1 ? (REVEAL_END - REVEAL_START - LIFT_DURATION) / (count - 1) : 0;
}

export function provinceLift(order: number, count: number, progress: number): number {
  const from = REVEAL_START + order * liftStagger(count);
  return span(clamp01(progress), from, from + LIFT_DURATION);
}
