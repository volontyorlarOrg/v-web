import { useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { Link } from "@/i18n/navigation";
import { availableChannels, channelUrl } from "@/lib/constants/channels";
import { ORGANIZATION_NAME, ORGANIZATION_SHORT_NAME } from "@/lib/content/org";
import { legalNavRoutes, mainNavRoutes, navHref } from "@/lib/routing/routes";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const channels = availableChannels();

  return (
    <footer className="bg-paper">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
        <div className="max-w-sm">
          <BrandLockup
            name={ORGANIZATION_NAME}
            shortName={ORGANIZATION_SHORT_NAME}
          />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {t("description")}
          </p>
          <LocaleSwitcher label={nav("languageLabel")} className="mt-6" />
        </div>

        <nav aria-label={t("siteLabel")}>
          <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
            {t("siteLabel")}
          </h2>
          <ul className="mt-4 space-y-1">
            {mainNavRoutes.map((route) => (
              <li key={route.key}>
                <Link
                  href={navHref(route.key)}
                  className="inline-flex min-h-9 items-center text-sm font-semibold text-ink hover:text-primary-ink"
                >
                  {nav(route.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {channels.length > 0 ? (
            <>
              <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
                {t("channelsLabel")}
              </h2>
              <ul className="mt-4 space-y-1">
                {channels.map((id) => (
                  <li key={id}>
                    <a
                      href={channelUrl(id) ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center text-sm font-semibold text-ink hover:text-primary-ink"
                    >
                      {t(`channels.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2 className="mt-8 font-sans text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase first:mt-0">
            {t("legalLabel")}
          </h2>
          <ul className="mt-4 space-y-1">
            {legalNavRoutes.map((route) => (
              <li key={route.key}>
                <Link
                  href={navHref(route.key)}
                  className="inline-flex min-h-9 items-center text-sm font-semibold text-ink hover:text-primary-ink"
                >
                  {nav(route.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {ORGANIZATION_NAME}
          </p>
          <p>{t("location")}</p>
        </div>
      </div>
    </footer>
  );
}
