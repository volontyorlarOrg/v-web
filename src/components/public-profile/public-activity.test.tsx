import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PublicActivity } from "@/components/public-profile/public-activity";
import { publicActivityTimeline } from "@/lib/public-profiles/activity";

const labels = {
  title: "Activity",
  hours: "h",
  notCounted: "History only",
  more: "Show all",
  profileCompleted: "Profile completed",
  xpTakenAway: "XP taken away",
  placements: {
    winner: "Winner",
    contributor: "Contributor",
    attendee: "Took part",
  },
};

describe("PublicActivity", () => {
  it("lists an administrator deduction with its date and the XP it took", () => {
    render(
      <PublicActivity
        entries={publicActivityTimeline(
          [],
          [],
          [{ id: "deduction", xp: -20, createdAt: "2026-11-20T08:15:00.000Z" }],
        )}
        locale="en"
        labels={labels}
      />,
    );

    const row = screen.getByText("XP taken away").closest("li");
    expect(row).toHaveTextContent("Nov 20, 2026");
    expect(row).toHaveTextContent("−20 XP");
    expect(row).not.toHaveTextContent("+");
  });
});
