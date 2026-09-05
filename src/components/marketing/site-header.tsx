import { useLocale, useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { NavTabs, type NavTabItem } from "@/components/marketing/nav-tabs";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { joinDestination, loginDestination } from "@/lib/content/cta";
import { HEADER_NAV_ITEMS, headerNavHref, headerNavPath } from "@/lib/content/nav-tabs";
import { ORGANIZATION_NAME } from "@/lib/content/org";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const join = joinDestination();
  const login = loginDestination(locale);

  const items: NavTabItem[] = HEADER_NAV_ITEMS.map((item) => ({
    href: headerNavHref(item),
    path: headerNavPath(item),
    label: t(item.id),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 lg:min-h-20">
        <Link
          href="/"
          className="-m-1 rounded-lg p-1"
          aria-label={`${ORGANIZATION_NAME} — ${t("home")}`}
        >
          <BrandLockup name={ORGANIZATION_NAME} />
        </Link>

        <NavTabs items={items} label={t("primaryLabel")} className="hidden lg:flex" />

        <div className="flex items-center gap-2">
          <LocaleSwitcher label={t("languageLabel")} />
          <ThemeToggle label={t("themeLabel")} />
          {login ? (
            <ActionLink
              destination={login}
              className={buttonClass({
                variant: "outline",
                size: "sm",
                className: "hidden lg:inline-flex",
              })}
            >
              {t("login")}
            </ActionLink>
          ) : null}
          <ActionLink
            destination={join}
            className={buttonClass({ size: "sm", className: "hidden lg:inline-flex" })}
          >
            {t("join")}
          </ActionLink>
          <MobileNav
            items={items}
            cta={{ ...join, label: t("join") }}
            secondary={login ? { ...login, label: t("login") } : null}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            navigationLabel={t("primaryLabel")}
          />
        </div>
      </div>
    </header>
  );
}
