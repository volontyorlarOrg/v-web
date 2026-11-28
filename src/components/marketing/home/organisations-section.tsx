import { Send, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";

import { OFFICIAL_LINKS } from "@/lib/constants/channels";

const STEPS = ["submit", "publish", "choose"] as const;

const APPLICANTS = [
  { role: "volunteer", state: "pending" },
  { role: "supervisor", state: "pending" },
  { role: "volunteer", state: "accepted" },
  { role: "coordinator", state: "confirmed" },
] as const;

export function OrganisationsSection() {
  const t = useTranslations("home.organisations");

  return (
    <section
      id="tashkilotlar"
      aria-labelledby="organisations-title"
      className="navy-ground-up focus-sky scroll-mt-4 overflow-hidden px-5 py-20 text-knockout min-[981px]:px-[132px] min-[981px]:py-[120px]"
    >
      <div className="mx-auto grid max-w-[1176px] grid-cols-1 items-center gap-20 min-[981px]:grid-cols-[1fr_600px]">
        <div>
          <h2 id="organisations-title" className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] min-[981px]:text-[56px]">
            {t("title")}
          </h2>
          <p className="mt-[18px] mb-0 max-w-[480px] text-[19px] leading-[1.5] text-navy-muted">{t("lead")}</p>
          <ol className="mt-8 mb-0 max-w-[480px] border-b border-knockout/12 p-0">
            {STEPS.map((id, index) => (
              <li key={id} className="grid grid-cols-[40px_1fr] gap-4 border-t border-knockout/12 py-[18px]">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-xl bg-blue-400/16 text-[17px] font-extrabold text-blue-400"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="m-0 text-lg font-bold tracking-normal">{t(`steps.${id}.title`)}</h3>
                  <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-navy-muted">{t(`steps.${id}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_LINKS.telegramAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-orange-600 px-7 text-[17px] font-bold text-knockout transition-colors hover:bg-orange-700"
            >
              <Send aria-hidden="true" className="size-5" strokeWidth={2} />
              {t("cta")}
            </a>
            <a
              href={OFFICIAL_LINKS.telegramAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center px-2 text-base font-semibold text-navy-link"
            >
              {t("telegram")}
              <b className="ml-1.5 text-knockout group-hover:underline">@yvc_admin</b>
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="relative">
          <div className="absolute top-[30px] right-[-20px] bottom-[-24px] left-10 rounded-3xl bg-blue-600 max-[980px]:right-[-12px] max-[980px]:left-6" />
          <div className="panel-shadow relative overflow-hidden rounded-[20px] bg-knockout text-navy-900">
            <div className="flex h-11 items-center gap-2 border-b border-knockout/12 bg-fog-100 px-4">
              <span className="size-2.5 rounded-full bg-window-red" />
              <span className="size-2.5 rounded-full bg-window-yellow" />
              <span className="size-2.5 rounded-full bg-window-green" />
              <span className="ml-3 inline-flex h-[26px] items-center rounded-[7px] bg-knockout px-3 text-xs font-semibold text-fog-500">
                {t("panel.title")}
              </span>
            </div>
            <div className="px-[26px] pt-6 pb-[18px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="m-0 text-[13px] font-semibold text-fog-500">{t("panel.yours")}</p>
                  <p className="mt-1.5 mb-0 text-[21px] font-extrabold tracking-[-0.02em]">{t("panel.name")}</p>
                </div>
                <span className="inline-flex h-[30px] flex-none items-center rounded-full bg-orange-600 px-3 text-[13px] font-bold text-knockout">
                  {t("panel.fresh")}
                </span>
              </div>
              <ul className="mt-[18px] mb-0 p-0">
                {APPLICANTS.map((person, index) => (
                  <li key={index} className="flex items-center gap-3.5 border-t border-fog-120 py-3.5">
                    <span className="flex size-10 flex-none items-center justify-center rounded-full bg-fog-150 text-navy-900/40">
                      <UserRound className="size-5" strokeWidth={1.8} />
                    </span>
                    <div className="flex-1">
                      <p className="m-0 text-[15px] font-bold">{t("panel.person")}</p>
                      <p className="mt-[3px] mb-0 text-[13px] text-fog-500">{t(`panel.roles.${person.role}`)}</p>
                    </div>
                    {person.state === "pending" ? (
                      <span className="flex gap-2">
                        <span className="inline-flex h-9 items-center rounded-[9px] bg-blue-600 px-3.5 text-sm font-bold text-knockout">
                          {t("panel.accept")}
                        </span>
                        <span className="inline-flex h-9 items-center rounded-[9px] px-3 text-sm font-bold text-fog-600 shadow-[inset_0_0_0_1.5px_var(--color-fog-300)]">
                          {t("panel.reject")}
                        </span>
                      </span>
                    ) : person.state === "accepted" ? (
                      <span className="inline-flex h-[30px] items-center rounded-full bg-blue-50 px-3 text-[13px] font-bold text-blue-ink">
                        {t("panel.accepted")}
                      </span>
                    ) : (
                      <span className="inline-flex h-[30px] items-center rounded-full bg-orange-50 px-3 text-[13px] font-bold text-orange-ink">
                        {t("panel.confirmed")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
