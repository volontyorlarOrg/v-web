import { useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { NavTabs, type NavTabItem } from "@/components/marketing/nav-tabs";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { joinDestination } from "@/lib/content/cta";
import { NAV_TABS_MOCK, navTabHref, navTabPath } from "@/lib/content/nav-tabs";
import { ORGANIZATION_NAME, ORGANIZATION_SHORT_NAME } from "@/lib/content/org";

export function SiteHeader() {
  const t = useTranslations("nav");
  const join = joinDestination();

  const items: NavTabItem[] = NAV_TABS_MOCK.map((tab) => ({
    href: navTabHref(tab),
    path: navTabPath(tab),
    label: t(tab.id),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 lg:min-h-20">
        <Link
          href="/"
          className="-m-1 rounded-lg p-1"
          aria-label={`${ORGANIZATION_NAME} — ${t("home")}`}
        >
          <BrandLockup
            name={ORGANIZATION_NAME}
            shortName={ORGANIZATION_SHORT_NAME}
          />
        </Link>

        <NavTabs items={items} label={t("primaryLabel")} className="hidden lg:flex" />

        <div className="flex items-center gap-2">
          <LocaleSwitcher label={t("languageLabel")} />
          <ThemeToggle label={t("themeLabel")} />
          <ActionLink
            destination={join}
            className={buttonClass({ size: "sm", className: "hidden lg:inline-flex" })}
          >
            {t("join")}
          </ActionLink>
          <MobileNav
            items={items}
            cta={{ ...join, label: t("join") }}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            navigationLabel={t("primaryLabel")}
          />
        </div>
      </div>
    </header>
  );
}
