import { useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { MobileNav, type NavItem } from "@/components/marketing/mobile-nav";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { joinDestination } from "@/lib/content/cta";
import { ORGANIZATION_NAME, ORGANIZATION_SHORT_NAME } from "@/lib/content/org";
import { mainNavRoutes, navHref } from "@/lib/routing/routes";

export function SiteHeader() {
  const t = useTranslations("nav");
  const join = joinDestination();

  const items: NavItem[] = mainNavRoutes.map((route) => ({
    href: navHref(route.key),
    label: t(route.key),
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

        <nav
          aria-label={t("primaryLabel")}
          className="hidden items-center gap-1 lg:flex"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-soft hover:text-primary-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher label={t("languageLabel")} />
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
