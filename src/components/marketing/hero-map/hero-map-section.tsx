import { useTranslations } from "next-intl";

import { ActionLink } from "@/components/marketing/action-link";
import { HeroMapFlat } from "@/components/marketing/hero-map/hero-map-flat";
import { HeroMapStage } from "@/components/marketing/hero-map/hero-map-stage";
import { RollingWords } from "@/components/marketing/rolling-words";
import { SplitWords } from "@/components/marketing/scene";
import { Eyebrow } from "@/components/marketing/section";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { joinDestination, loginDestination } from "@/lib/content/cta";
import { localisedRegions } from "@/lib/map/regions";

export function HeroMapSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const map = useTranslations("home.map");
  const join = joinDestination();
  const login = loginDestination(locale);
  const regions = localisedRegions(locale);

  return (
    <HeroMapStage
      regions={regions}
      regionsHeading={map("regionsHeading")}
      fallback={<HeroMapFlat locale={locale} />}
      hero={
        <div className="hero-copy mx-auto flex w-full flex-col items-center text-center">
          <Eyebrow rule="flank" className="enter-rise flex-wrap justify-center">
            <span className="sr-only">{t("hero.eyebrowLabel")}</span>
            <span aria-hidden="true" className="contents">
              {t.rich("hero.eyebrow", {
                region: () => (
                  <RollingWords
                    words={regions.map((region) => region.locative)}
                    className="region-rotation-chip rounded-full bg-surface-soft py-1 text-primary-ink"
                  />
                ),
              })}
            </span>
          </Eyebrow>
          <h1 className="hero-display enter-words mt-9 [--enter-delay:180ms]">
            <SplitWords text={t("hero.title")} />
          </h1>
          <p className="enter-rise mt-8 max-w-[46ch] text-lead text-ink-muted text-pretty [--enter-delay:780ms]">
            {t("hero.lead")}
          </p>
          <div className="enter-rise mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center [--enter-delay:920ms]">
            <ActionLink destination={join} className={buttonClass()}>
              {t("hero.primaryCta")}
            </ActionLink>
            {login ? (
              <ActionLink destination={login} className={buttonClass({ variant: "outline" })}>
                {t("hero.loginCta")}
              </ActionLink>
            ) : null}
          </div>
        </div>
      }
      caption={
        <div className="max-w-xl">
          <Eyebrow>{map("eyebrow")}</Eyebrow>
          <h2 id="regions-map-heading" className="mt-4 text-headline text-balance">
            {map("title")}
          </h2>
          <p className="mt-4 text-pretty text-ink-muted">{map("lead")}</p>
        </div>
      }
    />
  );
}
