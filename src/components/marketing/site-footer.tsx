import { ArrowUpRight, Send, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Instagram } from "@/components/brand/channel-icons";
import { BrandLockup } from "@/components/brand/logo";
import { Link } from "@/i18n/navigation";
import { officialChannelUrl, type ChannelId } from "@/lib/constants/channels";
import { ORGANIZATION_NAME } from "@/lib/content/org";
import { navHref } from "@/lib/routing/routes";

const channelIcon: Record<ChannelId, LucideIcon> = {
  telegram: Send,
  instagram: Instagram,
};

const CHANNELS: readonly ChannelId[] = ["telegram", "instagram"];

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const telegram = officialChannelUrl("telegram");
  const groups = [
    {
      id: "explore",
      links: [
        { label: nav("volunteering"), href: navHref("volunteering") },
        { label: nav("blog"), href: navHref("blog") },
        { label: t("links.organisations"), href: `${navHref("home")}#tashkilotlar` },
      ],
    },
    {
      id: "about",
      links: [
        { label: nav("about"), href: navHref("about") },
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
    <footer id="aloqa" className="bg-surface text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-7 min-[981px]:px-[132px] min-[981px]:pt-[72px] min-[981px]:pb-8">
        <div className="grid grid-cols-2 gap-12 min-[981px]:grid-cols-[1.4fr_1fr_1fr_1fr_1.5fr]">
          <div className="col-span-2 min-w-0 min-[981px]:col-span-1">
            <Link
              href="/"
              aria-label={ORGANIZATION_NAME}
              className="inline-flex rounded-lg"
            >
              <BrandLockup name={ORGANIZATION_NAME} tone="dark" />
            </Link>
            <p className="mt-5 max-w-[260px] text-[15px] leading-[1.55] text-ink-muted">
              {t("description")}
            </p>
            <ul role="list" aria-label={t("channelsLabel")} className="mt-5 flex gap-4">
              {CHANNELS.map((id) => {
                const Icon = channelIcon[id];
                return (
                  <li key={id}>
                    <a
                      href={officialChannelUrl(id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`channels.${id}`)}
                      className="inline-flex min-h-6 items-center text-ink-muted transition-colors hover:text-blue-600"
                    >
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {groups.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`} className="min-w-0">
              <h2
                id={`footer-${group.id}`}
                className="text-[15px] font-bold tracking-normal text-ink"
              >
                {t(`groups.${group.id}`)}
              </h2>
              <ul className="mt-[18px] grid gap-3.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink-muted transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 min-w-0 min-[981px]:col-span-1">
            <h2 className="text-[15px] font-bold tracking-normal text-ink">
              {t("updates.title")}
            </h2>
            <p className="mt-[18px] text-[15px] leading-[1.55] text-ink-muted">
              {t("updates.description")}
            </p>
            <a
              href={telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-[46px] items-center gap-2 rounded-full bg-blue-600 px-5 text-[15px] font-bold text-knockout transition-colors hover:bg-blue-700"
            >
              {t("updates.telegram")}
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={2.4} />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-5 border-t border-fog-200 pt-6 text-[13px] text-ink-muted">
          <p>
            © {new Date().getFullYear()} {ORGANIZATION_NAME}
          </p>
          <p>
            {t.rich("madeIn", {
              country: (chunks) => <span>{chunks}</span>,
            })}
            <span aria-hidden="true" className="ml-1.5">
              🩵
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
