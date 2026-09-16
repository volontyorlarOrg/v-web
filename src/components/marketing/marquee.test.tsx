import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Marquee } from "@/components/marketing/marquee";

describe("Marquee", () => {
  it("renders paired logo states without duplicating a wordmark as text", () => {
    const { container } = render(
      <Marquee
        label="Opportunity sources"
        entries={[
          {
            id: "with-logo",
            name: "Yashil Qo‘llar",
            logo: "/opportunity-sources/yashil-qollar.svg",
            logoGrey: "/opportunity-sources/yashil-qollar-grey.svg",
            logoWidth: 200.21,
            logoHeight: 100,
          },
          { id: "without-logo", name: "Community project" },
        ]}
      />,
    );

    expect(screen.getByRole("group", { name: "Opportunity sources" })).toBeInTheDocument();
    expect(screen.queryByText("Yashil Qo‘llar")).not.toBeInTheDocument();
    expect(screen.getAllByAltText("Yashil Qo‘llar")).toHaveLength(2);
    expect(screen.getAllByText("Community project")).toHaveLength(2);
    expect(container.querySelectorAll('img[aria-hidden="true"]')).toHaveLength(2);
    expect(container.querySelector("img")).toHaveAttribute("width", "200.21");
    expect(container.querySelector("img")).toHaveAttribute("height", "100");
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute("tabindex", "0");
  });
});
