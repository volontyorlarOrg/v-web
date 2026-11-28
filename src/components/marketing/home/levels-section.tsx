import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { BrandIcon } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { GlyphMark, HeartMark } from "@/components/marketing/home/marks";
import type { Locale } from "@/i18n/routing";
import { leaderboardDestination, type Destination } from "@/lib/content/cta";
import { initialsOf, LEVEL_STEPS, SAMPLE_PODIUM, type LevelStep, type PodiumPlace } from "@/lib/content/home";
import { navHref } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";

const LOOK: Record<LevelStep["look"], { card: string; chip: string; avatar: string; light: boolean }> = {
  plain: { card: "level-card-plain", chip: "bg-metal-350", avatar: "bg-metal-400", light: true },
  "plain-blue": { card: "level-card-plain", chip: "bg-blue-600", avatar: "bg-navy-600", light: true },
  "plain-band": { card: "level-card-plain", chip: "bg-blue-600", avatar: "bg-navy-600", light: true },
  blue: { card: "level-card-blue", chip: "bg-orange-600", avatar: "bg-level-blue-avatar", light: false },
  navy: { card: "level-card-navy", chip: "bg-orange-600", avatar: "bg-orange-600", light: false },
};

const PODIUM_ORDER = [2, 1, 3] as const;

const PODIUM_LOOK: Record<PodiumPlace["place"], { delay: number; avatar: string; ring: string; size: string; block: string; height: string; number: string }> = {
  1: {
    delay: 2,
    avatar: "bg-orange-25 text-orange-deep text-[28px]",
    ring: "shadow-[0_0_0_4px_var(--color-fog-50),0_0_0_6px_var(--color-orange-600)]",
    size: "size-[88px]",
    block: "podium-block-orange",
    height: "h-[200px]",
    number: "text-[64px] text-knockout",
  },
  2: {
    delay: 1,
    avatar: "bg-blue-25 text-primary-ink text-[22px]",
    ring: "shadow-[0_0_0_4px_var(--color-fog-50),0_0_0_6px_var(--color-navy-muted)]",
    size: "size-[72px]",
    block: "podium-block-navy",
    height: "h-[150px]",
    number: "text-[50px] text-knockout/90",
  },
  3: {
    delay: 0,
    avatar: "bg-fog-250 text-fog-800 text-[22px]",
    ring: "shadow-[0_0_0_4px_var(--color-fog-50),0_0_0_6px_var(--color-bronze)]",
    size: "size-[72px]",
    block: "podium-block-navy",
    height: "h-[115px]",
    number: "text-[50px] text-knockout/90",
  },
};

export function LevelsSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home.levels");
  const leaderboard: Destination = leaderboardDestination(locale) ?? {
    href: navHref("volunteering"),
    external: false,
    newTab: false,
  };

  return (
    <section
      id="darajalar"
      aria-labelledby="levels-title"
      className="relative overflow-hidden bg-fog-50 pt-20 pb-20 text-navy-900 min-[981px]:pt-28 min-[981px]:pb-28"
    >
      <div aria-hidden="true" className="dot-grid-ink absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1440px] px-5 min-[981px]:px-[132px]">
        <h2 id="levels-title" className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] min-[981px]:text-[56px]">
          {t("title")}
        </h2>
        <p className="mt-4 mb-0 text-[19px] leading-[1.5] text-fog-600">{t("lead")}</p>
      </div>

      <div data-scene="enter" className="relative mt-16">
        <div aria-hidden="true" className="lenta-h ribbon-shadow h-[34px]" />
        <ol className="mx-auto -mt-1.5 flex max-w-[1440px] justify-between px-[132px] max-[980px]:snap-x max-[980px]:snap-mandatory max-[980px]:gap-7 max-[980px]:overflow-x-auto max-[980px]:px-5 max-[980px]:pb-6">
          {LEVEL_STEPS.map((step, index) => {
            const look = LOOK[step.look];
            return (
              <li
                key={step.id}
                className="level-badge relative flex flex-none snap-center flex-col items-center"
                style={{ "--r": `${step.tilt}deg`, "--i": index } as CSSProperties}
              >
                <span aria-hidden="true" className="level-hook absolute left-1/2 -mt-1 h-[46px] w-3 -translate-x-1/2 rounded-md" />
                <div
                  className={cn(
                    "relative mt-10 h-[262px] w-[188px] overflow-hidden rounded-2xl",
                    look.card,
                    look.light ? "text-navy-900" : "text-knockout",
                  )}
                >
                  <span aria-hidden="true" className="level-hole absolute top-3 left-1/2 -ml-2 size-4 rounded-full" />
                  <div className="relative flex h-full flex-col items-start px-[18px] pt-10 pb-[34px]">
                    <div aria-hidden="true" className="flex w-full items-center justify-between">
                      <BrandIcon className="size-[18px]" />
                      <span className={cn("flex size-[26px] items-center justify-center rounded-full", look.chip)}>
                        <HeartMark className="size-3 text-knockout" />
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-5 flex size-[66px] items-center justify-center rounded-full shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-knockout)_90%,transparent)]",
                        look.avatar,
                      )}
                    >
                      <GlyphMark className="h-[35px] w-10 text-knockout" />
                    </span>
                    <p className="mt-[18px] mb-0 text-[23px] leading-[1.05] font-extrabold tracking-[-0.03em]">
                      {t(`names.${step.id}`)}
                    </p>
                    <p className="sr-only">
                      {step.hours === 0 ? t("start") : t("hours", { count: step.hours })}
                    </p>
                  </div>
                  {step.look === "plain-band" ? (
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2 bg-blue-600" />
                  ) : null}
                  {step.look === "navy" ? (
                    <span aria-hidden="true" className="lenta-h lenta-h-slim absolute inset-x-0 bottom-0 h-[22px]" />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        <ol
          aria-hidden="true"
          className="relative mx-auto mt-12 flex max-w-[1440px] justify-between px-[132px] max-[980px]:hidden"
        >
          <span className="level-line absolute top-1.5 right-[226px] left-[226px] h-0.5 opacity-60" />
          {LEVEL_STEPS.map((step, index) => (
            <li
              key={step.id}
              className="level-node relative flex w-[188px] flex-col items-center gap-3"
              style={{ "--i": index } as CSSProperties}
            >
              <span
                className={cn(
                  "size-3.5 rounded-full",
                  index === LEVEL_STEPS.length - 1
                    ? "bg-orange-600 shadow-[0_0_0_3px_var(--color-orange-600)]"
                    : "bg-knockout shadow-[0_0_0_3px_var(--color-blue-600)]",
                )}
              />
              <span className={cn("text-base font-bold", step.hours === 0 ? "text-fog-500" : "text-navy-900")}>
                {step.hours === 0 ? t("start") : t("hours", { count: step.hours })}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        data-scene="enter"
        className="relative mx-auto mt-[72px] max-w-[1440px] px-5 min-[981px]:px-[132px]"
      >
        <div className="-mb-20 grid grid-cols-1 items-end gap-16 border-t border-fog-150 pt-12 min-[981px]:-mb-28 min-[981px]:grid-cols-[1fr_1.3fr]">
          <div className="pb-0 min-[981px]:pb-28">
            <h3 className="m-0 text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em]">{t("rating.title")}</h3>
            <p className="mt-3 mb-0 max-w-[440px] text-[17px] leading-[1.5] text-fog-600">{t("rating.body")}</p>
            <ActionLink
              destination={leaderboard}
              className="mt-6 inline-flex h-[50px] items-center rounded-xl bg-navy-900 px-6 text-base font-bold text-knockout transition-colors hover:bg-navy-600"
            >
              {t("rating.cta")}
            </ActionLink>
          </div>

          <ol
            aria-label={t("rating.podiumLabel")}
            className="flex origin-bottom items-end justify-end gap-3.5 max-[980px]:-mt-16 max-[980px]:scale-[0.7] max-[980px]:justify-center"
          >
            {PODIUM_ORDER.map((place) => {
              const person = SAMPLE_PODIUM.find((entry) => entry.place === place);
              if (!person) return null;
              const look = PODIUM_LOOK[place];
              return (
                <li
                  key={place}
                  className="flex w-[180px] flex-none flex-col items-center min-[1200px]:w-[200px]"
                  style={{ "--i": look.delay } as CSSProperties}
                >
                  <div className="podium-who flex flex-col items-center text-center">
                    <span
                      aria-hidden="true"
                      className={cn("flex items-center justify-center rounded-full font-extrabold", look.size, look.avatar, look.ring)}
                    >
                      {initialsOf(person.name)}
                    </span>
                    <p className="mt-3.5 mb-0 text-base font-bold whitespace-nowrap">{person.name}</p>
                    <p className="mt-1 mb-0 text-sm font-bold text-blue-ink">{person.xp} XP</p>
                  </div>
                  <div
                    className={cn(
                      "podium-block relative mt-[18px] flex w-full justify-center overflow-hidden rounded-t-[14px]",
                      look.block,
                      look.height,
                    )}
                  >
                    <span aria-hidden="true" className="lenta-h lenta-h-slim absolute inset-x-0 top-0 h-[22px]" />
                    <span className={cn("mt-[38px] leading-none font-extrabold tracking-[-0.04em]", look.number)}>
                      <span className="sr-only">{t("rating.place", { place })}: </span>
                      {place}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
