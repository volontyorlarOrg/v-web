import { ArrowUpRight, Instagram, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLockup } from "@/components/brand/logo";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { configuredChannels } from "@/lib/constants/channels";
import { ORGANIZATION_NAME } from "@/lib/content/org";
import { navHref } from "@/lib/routing/routes";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const channels = configuredChannels();
  const telegram = channels.find((channel) => channel.id === "telegram");
  const groups = [
    {
      id: "explore",
      links: [
        { label: nav("volunteering"), href: navHref("volunteering") },
        { label: t("links.regions"), href: `${navHref("home")}#hero-map` },
        { label: t("links.organisations"), href: navHref("contact") },
      ],
    },
    {
      id: "about",
      links: [
        { label: nav("about"), href: navHref("about") },
        { label: t("links.team"), href: `${navHref("about")}#team` },
        { label: nav("partners"), href: navHref("partners") },
      ],
    },
    {
      id: "support",
      links: [
        { label: nav("contact"), href: navHref("contact") },
        { label: nav("privacy"), href: navHref("privacy") },
        { label: nav("terms"), href: navHref("terms") },
      ],
    },
  ] as const;

  return (
    <footer className="bg-surface">
      <div className="container-page">
        <div className="grid gap-x-10 gap-y-10 pt-12 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_2.1fr_1.3fr] lg:gap-x-8 lg:pt-14 lg:pb-11">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <BrandLockup name={ORGANIZATION_NAME} className="[&>span]:inline" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted text-pretty">
              {t("description")}
            </p>
            {channels.length > 0 ? (
              <ul aria-label={t("channelsLabel")} className="mt-4 -ml-3 flex flex-wrap gap-1">
                {channels.map((channel) => {
                  const Icon = channel.id === "telegram" ? Send : Instagram;
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(`channels.${channel.id}`)}
                        className="inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft hover:text-primary-ink"
                      >
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div className="grid min-w-0 gap-x-6 gap-y-8 sm:grid-cols-[0.9fr_0.8fr_1.2fr] md:col-span-2 md:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
            {groups.map((group) => (
              <nav key={group.id} aria-labelledby={`footer-${group.id}`} className="min-w-0">
                <h2 id={`footer-${group.id}`} className="font-sans text-sm font-semibold leading-6 text-ink">
                  {t(`groups.${group.id}`)}
                </h2>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 max-w-full items-center py-2 text-sm leading-5 text-ink-muted transition-colors hover:text-primary-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="min-w-0 md:col-start-2 md:row-start-1 lg:col-start-3">
            <h2 className="font-sans text-base font-semibold leading-6 text-ink">
              {t("updates.title")}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted text-pretty">
              {t(telegram ? "updates.description" : "updates.unavailable")}
            </p>
            {telegram ? (
              <a
                href={telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({
                  size: "sm",
                  className: "mt-5 max-w-full",
                })}
              >
                {t("updates.telegram")}
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-5 text-xs leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© {new Date().getFullYear()} {ORGANIZATION_NAME}</p>
          <p>
            {t.rich("madeIn", {
              country: (chunks) => <strong className="font-medium text-ink">{chunks}</strong>,
            })}
            <span aria-hidden="true" className="ml-1.5">🩵</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
