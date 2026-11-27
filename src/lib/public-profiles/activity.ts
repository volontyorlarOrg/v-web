import type {
  PublicActivity,
  PublicDeduction,
  PublicReward,
} from "./public-profile.server";

export function publicActivityTimeline(
  entries: readonly PublicActivity[],
  rewards: readonly PublicReward[],
  deductions: readonly PublicDeduction[] = [],
) {
  return [
    ...entries,
    ...rewards
      .filter((reward) => reward.key === "profile")
      .map((reward) => ({
        ...reward,
        source: "checkpoint" as const,
        eventDate: reward.claimedAt,
      })),
    ...deductions.map((deduction) => ({
      ...deduction,
      source: "deduction" as const,
      eventDate: deduction.date,
    })),
  ].sort((a, b) => activityTime(b.eventDate) - activityTime(a.eventDate));
}

function activityTime(value: string) {
  return Date.parse(value.length === 10 ? `${value}T00:00:00+05:00` : value);
}
