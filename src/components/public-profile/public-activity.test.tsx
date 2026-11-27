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
  xpReset: "XP reset when rewards changed",
  noShow: "Unexcused no-show",
  placements: {
    winner: "Winner",
    contributor: "Contributor",
    attendee: "Took part",
  },
};

const deduction = {
  opportunityTitle: null,
  organization: null,
  reason: null,
} as const;

describe("PublicActivity", () => {
  it("lists an administrator deduction with its date, reason and the XP it took", () => {
    render(
      <PublicActivity
        entries={publicActivityTimeline(
          [],
          [],
          [
            {
              ...deduction,
              id: "deduction",
              kind: "adjustment",
              xp: -20,
              reason: "Left early",
              date: "2026-11-20T08:15:00.000Z",
            },
          ],
        )}
        locale="en"
        labels={labels}
      />,
    );

    const row = screen.getByText("XP taken away").closest("li");
    expect(row).toHaveTextContent("Nov 20, 2026");
    expect(row).toHaveTextContent("Left early");
    expect(row).toHaveTextContent("−20 XP");
    expect(row).not.toHaveTextContent("+");
  });

  it("lists a no-show under its event and a milestone reset without a reason", () => {
    render(
      <PublicActivity
        entries={publicActivityTimeline(
          [],
          [],
          [
            {
              ...deduction,
              id: "no-show",
              kind: "no_show",
              xp: -10,
              date: "2026-10-20T09:00:00.000Z",
              opportunityTitle: "Riverbank clean-up",
              organization: "Volontyorlar",
            },
            {
              ...deduction,
              id: "reset",
              kind: "reset",
              xp: -50,
              date: "2026-10-08T12:00:00.000Z",
            },
          ],
        )}
        locale="en"
        labels={labels}
      />,
    );

    const missed = screen.getByText("Riverbank clean-up").closest("li");
    expect(missed).toHaveTextContent("Volontyorlar · Oct 20, 2026");
    expect(missed).toHaveTextContent("Unexcused no-show · −10 XP");
    const reset = screen
      .getByText("XP reset when rewards changed")
      .closest("li");
    expect(reset).toHaveTextContent("Oct 8, 2026");
    expect(reset).toHaveTextContent("−50 XP");
  });
});
