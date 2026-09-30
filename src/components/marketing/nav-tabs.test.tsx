import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import { NavTabs } from "@/components/marketing/nav-tabs";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => pathname.current,
  Link: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const ITEMS = [
  { href: "/volunteering", path: "/volunteering", label: "Volunteering" },
  { href: "/blog", path: "/blog", label: "Blog" },
];

function renderAt(path: string) {
  pathname.current = path;
  return render(<NavTabs items={ITEMS} label="Main" />);
}

describe("NavTabs", () => {
  it("marks the tab of the current page as the page", () => {
    renderAt("/blog");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Volunteering" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("keeps a section's tab marked on the pages inside it", () => {
    renderAt("/blog/riverbank-clean-up");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("does not mark a tab for a path that only shares its prefix", () => {
    renderAt("/blogroll");
    expect(screen.getByRole("link", { name: "Blog" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
