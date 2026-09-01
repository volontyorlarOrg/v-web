import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

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
    // The real component prefixes the locale; the stub records it instead.
    <a href={`/${locale}${href === "/" ? "" : href}`} {...rest}>
      {children}
    </a>
  ),
}));

describe("LocaleSwitcher", () => {
  it("offers every locale and keeps the current route", () => {
    render(<LocaleSwitcher label="Language" />);

    for (const locale of locales) {
      const link = screen.getByRole("link", { name: locale });
      expect(link).toHaveAttribute("href", `/${locale}/partners`);
      expect(link).toHaveAttribute("hreflang", locale);
      expect(link).toHaveAttribute("lang", locale);
      expect(link).toHaveAttribute("title", localeNames[locale]);
    }
  });

  it("marks only the active locale", () => {
    render(<LocaleSwitcher label="Language" />);

    expect(screen.getByRole("link", { name: "ru" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "uz" })).not.toHaveAttribute("aria-current");
  });

  it("preserves the home route", () => {
    usePathname.mockReturnValueOnce("/");
    render(<LocaleSwitcher label="Language" />);
    expect(screen.getByRole("link", { name: "en" })).toHaveAttribute("href", "/en");
  });

  it("labels the switcher for assistive technology", () => {
    render(<LocaleSwitcher label="Til" />);
    expect(screen.getByRole("navigation", { name: "Til" })).toBeInTheDocument();
  });
});
