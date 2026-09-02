import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { localeNames, locales } from "@/i18n/routing";

const usePathname = vi.fn(() => "/partners");
const useLocale = vi.fn(() => "ru");

vi.mock("next-intl", () => ({
  useLocale: () => useLocale(),
}));

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => usePathname(),
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { locale?: string }) => (
    <a href={`/${locale}${href === "/" ? "" : href}`} {...rest}>
      {children}
    </a>
  ),
}));

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/partners");
    useLocale.mockReturnValue("ru");
  });

  it("offers every locale by name and keeps the current route", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher label="Language" />);
    await user.click(screen.getByRole("button", { name: "Language: Русский" }));

    for (const locale of locales) {
      const link = screen.getByRole("link", { name: localeNames[locale] });
      expect(link).toHaveAttribute("href", `/${locale}/partners`);
      expect(link).toHaveAttribute("hreflang", locale);
      expect(link).toHaveAttribute("lang", locale);
    }
  });

  it("marks only the active locale", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher label="Language" />);
    await user.click(screen.getByRole("button", { name: "Language: Русский" }));

    expect(screen.getByRole("link", { name: "Русский" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "O‘zbekcha" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("preserves the home route", async () => {
    const user = userEvent.setup();
    usePathname.mockReturnValue("/");
    render(<LocaleSwitcher label="Language" />);
    await user.click(screen.getByRole("button", { name: "Language: Русский" }));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en");
  });

  it("labels the switcher for assistive technology", () => {
    render(<LocaleSwitcher label="Til" />);
    expect(screen.getByRole("button", { name: "Til: Русский" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher label="Language" />);
    const trigger = screen.getByRole("button", { name: "Language: Русский" });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
