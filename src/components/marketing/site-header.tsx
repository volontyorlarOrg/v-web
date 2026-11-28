import { useLocale, useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { HeaderFrame } from "@/components/marketing/header-frame";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { joinDestination, loginDestination, signupDestination } from "@/lib/content/cta";
import { HEADER_NAV_ITEMS, headerNavHref } from "@/lib/content/nav-tabs";
import { ORGANIZATION_NAME } from "@/lib/content/org";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const login = loginDestination(locale);
  const signup = signupDestination(locale);
  const primary = signup ?? joinDestination();
  const primaryLabel = t(signup ? "signup" : "join");

  const items = HEADER_NAV_ITEMS.map((item) => ({
    href: headerNavHref(item),
    label: t(item.id),
  }));

  return (
    <HeaderFrame>
      <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center gap-9 px-5 py-6 min-[640px]:px-8">
        <Link
          href="/"
          className="-m-1 rounded-lg p-1 focus-visible:outline-orange-600"
          aria-label={`${ORGANIZATION_NAME} — ${t("home")}`}
        >
          <BrandLockup name={ORGANIZATION_NAME} tone="inverse" />
        </Link>

        <nav
          aria-label={t("primaryLabel")}
          className="flex flex-auto flex-wrap gap-[26px] text-[15px] font-medium text-navy-copy max-[980px]:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm transition-colors hover:text-knockout focus-visible:outline-orange-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LocaleSwitcher label={t("languageLabel")} tone="inverse" />
          {login ? (
            <ActionLink
              destination={login}
              className="inline-flex h-11 items-center rounded-full border-[1.5px] border-knockout/28 px-5 text-[15px] font-semibold text-knockout transition-colors hover:border-knockout/60 focus-visible:outline-orange-600 max-[980px]:hidden"
            >
              {t("login")}
            </ActionLink>
          ) : null}
          <MobileNav
            items={items}
            cta={{ ...primary, label: primaryLabel }}
            secondary={login ? { ...login, label: t("login") } : null}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            navigationLabel={t("primaryLabel")}
          />
        </div>
      </div>
    </HeaderFrame>
  );
}
