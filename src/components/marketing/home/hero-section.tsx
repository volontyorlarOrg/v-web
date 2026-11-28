import { useTranslations } from "next-intl";

import { BrandIcon, BrandWordmark } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { HeroFrame } from "@/components/marketing/home/hero-frame";
import { LiveCount } from "@/components/marketing/home/live-count";
import { GlyphMark, HeartMark } from "@/components/marketing/home/marks";
import { VisitorBadge } from "@/components/marketing/home/visitor-badge";
import type { Locale } from "@/i18n/routing";
import { joinDestination, signupDestination } from "@/lib/content/cta";
import { SAMPLE_JOINERS } from "@/lib/content/home";

export function HeroSection({ locale, volunteerTotal }: { locale: Locale; volunteerTotal: number }) {
  const t = useTranslations("home.hero");
  const signup = signupDestination(locale) ?? joinDestination();

  return (
    <HeroFrame
      labelledBy="hero-title"
      className="hero navy-ground focus-orange relative min-h-screen overflow-hidden text-knockout"
    >
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div aria-hidden="true" className="dot-grid absolute inset-0" />
      <div aria-hidden="true" className="hero-dots-lit absolute inset-0" />

      <div className="pointer-events-none relative z-[2] mx-auto flex min-h-screen max-w-[1240px] items-center px-5 pt-[92px] min-[640px]:px-8 max-[980px]:min-h-0">
        <div className="pointer-events-auto flex w-full max-w-[600px] flex-col gap-7 pt-10 pb-20">
          <h1 id="hero-title" className="hero-title m-0 font-extrabold">
            {t("title")} <span className="text-blue-400">{t("titleAccent")}</span>
          </h1>
          <p className="m-0 max-w-[560px] text-[21px] leading-[1.5] text-navy-copy">{t("lead")}</p>
          <div className="mt-1 flex flex-wrap gap-3">
            <ActionLink
              destination={signup}
              className="inline-flex h-[60px] items-center rounded-2xl bg-orange-600 px-8 text-[17px] font-bold text-knockout transition-colors hover:bg-orange-700"
            >
              {t("signup")}
            </ActionLink>
            <a
              href="#imkoniyatlar"
              className="inline-flex h-[60px] items-center rounded-2xl border-[1.5px] border-knockout/28 px-7 text-[17px] font-semibold text-knockout transition-colors hover:border-knockout/60"
            >
              {t("browse")}
            </a>
          </div>
          <LiveCount
            initial={volunteerTotal}
            locale={locale}
            joiners={SAMPLE_JOINERS}
            labels={{ count: t("countLabel"), idle: t("liveIdle"), joined: t("liveJoined") }}
          />
        </div>
      </div>

      <div className="hang z-[2]">
        <div className="hang-drop">
          <div aria-hidden="true" className="hang-strap lenta-v left-[132px] rotate-[-8deg]" />
          <div aria-hidden="true" className="hang-strap lenta-v-back left-[166px] rotate-[8deg]" />
          <div aria-hidden="true" className="hang-clip absolute top-[224px] left-[146px] h-[22px] w-10 rounded-[5px]" />
          <div
            aria-hidden="true"
            className="hang-hook absolute top-[244px] left-[155px] h-[52px] w-[22px] rounded-[11px_11px_8px_8px]"
          >
            <span className="absolute top-[9px] left-[9px] h-6 w-1 rounded-[2px] bg-navy-900/22" />
          </div>
          <div aria-hidden="true" className="hang-ring absolute top-[304px] left-[154px] z-[3] size-6 rounded-full" />

          <div className="absolute top-[296px] left-4 h-[460px] w-[300px] [perspective:900px]">
            <div
              role="group"
              aria-label={t("badge.label")}
              className="badge-card relative h-[460px] w-[300px] overflow-hidden rounded-[20px] text-navy-900"
            >
              <svg
                aria-hidden="true"
                width="300"
                height="460"
                className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
              >
                <filter id="badge-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                </filter>
                <rect width="300" height="460" filter="url(#badge-grain)" />
              </svg>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-[-86px] bottom-[-40px] drop-shadow-[0_1px_0_var(--color-knockout)]"
              >
                <GlyphMark className="h-[266px] w-[300px] text-metal-100" />
              </span>
              <span aria-hidden="true" className="badge-hole absolute top-[18px] left-1/2 -ml-[11px] size-[22px] rounded-full" />

              <div className="relative flex h-full flex-col px-7 pt-[58px] pb-9">
                <div aria-hidden="true" className="flex items-center justify-between">
                  <span className="inline-flex items-start">
                    <BrandIcon className="size-7" />
                    <BrandWordmark className="mt-[6.7px] ml-[8.5px] h-[16.8px] w-auto text-blue-600" />
                  </span>
                  <span className="badge-heart flex size-11 items-center justify-center rounded-full">
                    <HeartMark className="size-[22px] text-knockout/95" />
                  </span>
                </div>

                <VisitorBadge
                  labels={{
                    photoLabel: t("badge.photoLabel"),
                    photoHint: t("badge.photoHint"),
                    nameLabel: t("badge.nameLabel"),
                    namePlaceholder: t("badge.namePlaceholder"),
                  }}
                />

                <p
                  aria-hidden="true"
                  className="mt-auto inline-flex items-center gap-2 text-base font-bold text-blue-600"
                >
                  <span className="size-2 rounded-full bg-orange-600" />
                  {t("badge.role")}
                </p>
              </div>
              <span aria-hidden="true" className="badge-glare pointer-events-none absolute inset-0" />
              <span aria-hidden="true" className="badge-sheen pointer-events-none absolute top-0 left-0 h-full w-2/5" />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="lenta-h absolute inset-x-0 bottom-0 z-[1] h-[34px]" />
    </HeroFrame>
  );
}
