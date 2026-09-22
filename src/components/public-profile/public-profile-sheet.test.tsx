import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PublicProfileLinks,
  PublicProfileSheet,
} from "@/components/public-profile/public-profile-sheet";

const base = {
  name: "Aziza Karimova",
  username: "aziza_uz",
  avatarUrl: null,
  level: "Active",
  bio: "Toshkentdagi taʼlim loyihalarida volontyorlik qilaman.",
  socials: [],
  figures: [{ id: "events", content: "12 events" }],
  rows: [{ id: "region", label: "Region", value: "Tashkent city" }],
  figuresLabel: "Participation",
  socialsLabel: "Social profiles",
  platformLabels: {
    telegram: "Telegram",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
};

describe("PublicProfileSheet", () => {
  it("names the volunteer once, with the handle and the level beside it", () => {
    render(<PublicProfileSheet {...base} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Aziza Karimova" }),
    ).toBeInTheDocument();
    expect(screen.getByText("@aziza_uz")).toBeInTheDocument();
    expect(screen.getByText("Active")).toHaveAttribute(
      "data-variant",
      "achievement",
    );
  });

  it("draws initials when there is no photo and the photo when there is", () => {
    const { container, rerender } = render(<PublicProfileSheet {...base} />);
    expect(container.querySelector(".profile-avatar")?.textContent).toBe("AK");

    rerender(
      <PublicProfileSheet
        {...base}
        avatarUrl="https://cdn.example.com/avatar.webp"
      />,
    );
    expect(container.querySelector(".profile-avatar img")).toHaveAttribute(
      "src",
      "https://cdn.example.com/avatar.webp",
    );
  });

  it("stops after the handle for a profile with nothing else to show", () => {
    render(<PublicProfileSheet {...base} bio="" figures={[]} rows={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByRole("term")).not.toBeInTheDocument();
  });

  it("renders labelled social profile links", () => {
    render(
      <PublicProfileSheet
        {...base}
        socials={[
          {
            platform: "linkedin",
            handle: "aziza-karimova",
            href: "https://www.linkedin.com/in/aziza-karimova",
          },
        ]}
      />,
    );
    expect(
      screen.getByRole("link", { name: "LinkedIn: @aziza-karimova" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/aziza-karimova");
  });
});

describe("PublicProfileLinks", () => {
  it("labels each link by host and path and says it opens elsewhere", () => {
    render(
      <PublicProfileLinks
        links={["https://www.github.com/vvadr/", "https://t.me/volontyorlar"]}
        openLabel="Open external link"
      />,
    );
    expect(
      screen.getByRole("link", {
        name: "github.com/vvadr — Open external link",
      }),
    ).toHaveAttribute("rel", "noopener noreferrer nofollow");
    expect(screen.getByText("t.me/volontyorlar")).toBeInTheDocument();
  });
});
