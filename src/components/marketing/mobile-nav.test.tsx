import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import { MobileNav } from "@/components/marketing/mobile-nav";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

function renderNav(withLogin = false) {
  return render(
    <MobileNav
      items={[
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ]}
      cta={{ href: "/contact", label: "Join us", external: false, newTab: false }}
      secondary={
        withLogin
          ? { href: "https://app.example.org/en/login", label: "Log in", external: true, newTab: false }
          : null
      }
      openLabel="Open menu"
      closeLabel="Close menu"
      navigationLabel="Main navigation"
    />,
  );
}

describe("MobileNav", () => {
  it("starts closed and reports its state to assistive technology", () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls");
    expect(screen.queryByRole("navigation", { name: "Main navigation" })).toBeNull();
    expect(screen.queryByRole("link", { name: "About" })).toBeNull();
  });

  it("opens and closes from the keyboard", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.tab();
    await user.keyboard("{Enter}");

    const trigger = screen.getByRole("button", { name: "Close menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("closes once a destination is chosen", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("offers sign-in beside the join action, in the same tab, once the app has an origin", async () => {
    const user = userEvent.setup();
    renderNav(true);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const login = screen.getByRole("link", { name: "Log in" });
    expect(login).toHaveAttribute("href", "https://app.example.org/en/login");
    expect(login).not.toHaveAttribute("target");
    expect(screen.getByRole("link", { name: "Join us" })).toBeVisible();
  });

  it("shows only the join action while the app has no origin", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.queryByRole("link", { name: "Log in" })).toBeNull();
    expect(screen.getByRole("link", { name: "Join us" })).toBeVisible();
  });
});
