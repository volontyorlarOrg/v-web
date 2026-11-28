import { Bell, Link2, ListChecks, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { UsernameCheckForm } from "@/components/marketing/home/username-check";
import type { Locale } from "@/i18n/routing";
import { joinDestination, signupDestination } from "@/lib/content/cta";
import { OFFICIAL_LINKS } from "@/lib/constants/channels";
import { localePath } from "@/lib/routing/routes";

const ITEMS: ReadonlyArray<{ id: "link" | "history" | "alerts"; Icon: LucideIcon }> = [
  { id: "link", Icon: Link2 },
  { id: "history", Icon: ListChecks },
  { id: "alerts", Icon: Bell },
];

export function PortfolioSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home.portfolio");
  const signup = signupDestination(locale) ?? joinDestination();
  const signupHref = signup.external ? signup.href : localePath(locale, "contact");
  const channelLink = (chunks: ReactNode, href: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:underline">
      {chunks}
    </a>
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="navy-ground-up focus-sky relative overflow-hidden px-5 py-20 text-knockout min-[981px]:px-[132px] min-[981px]:py-[120px]"
    >
      <div aria-hidden="true" className="dot-grid-soft absolute inset-0 opacity-45" />
      <div className="relative mx-auto grid max-w-[1176px] grid-cols-1 items-center gap-24 min-[981px]:grid-cols-[1fr_480px]">
        <div className="relative">
          <h2 id="portfolio-title" className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] min-[981px]:text-[56px]">
            {t("title")}
          </h2>
          <p className="mt-4 mb-0 max-w-[520px] text-[19px] leading-[1.5] text-navy-muted">{t("lead")}</p>
          <ul className="mt-10 mb-0 max-w-[560px] border-b border-knockout/10 p-0">
            {ITEMS.map(({ id, Icon }) => (
              <li key={id} className="grid grid-cols-[44px_1fr] gap-[18px] border-t border-knockout/10 py-[22px]">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-blue-400/14 text-blue-400">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="m-0 text-[19px] font-bold tracking-[-0.01em]">{t(`items.${id}.title`)}</h3>
                  <p className="mt-1.5 mb-0 text-base leading-[1.5] text-navy-muted">
                    {id === "alerts"
                      ? t.rich("items.alerts.body", {
                          bot: (chunks) => channelLink(chunks, OFFICIAL_LINKS.telegramBot),
                          channel: (chunks) => channelLink(chunks, OFFICIAL_LINKS.telegramChannel),
                        })
                      : t(`items.${id}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="profile-card-glow pointer-events-none absolute -inset-[60px]" />
          <div className="profile-card-shadow relative rounded-3xl bg-knockout p-8 text-navy-900 max-[420px]:p-5">
            <UsernameCheckForm
              signupHref={signupHref}
              labels={{
                sampleName: t("sampleName"),
                role: t("role"),
                pick: t("pick"),
                input: t("inputLabel"),
                placeholder: t("placeholder"),
                check: t("check"),
                states: {
                  empty: t("states.empty"),
                  short: t("states.short"),
                  invalid: t("states.invalid"),
                  ok: t.raw("states.ok") as string,
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
