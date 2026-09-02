import { useTranslations } from "next-intl";

import { ActionLink } from "@/components/marketing/action-link";
import { HeroMapFlat } from "@/components/marketing/hero-map/hero-map-flat";
import { HeroMapStage } from "@/components/marketing/hero-map/hero-map-stage";
import { RollingWords } from "@/components/marketing/rolling-words";
import { Eyebrow } from "@/components/marketing/section";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { joinDestination } from "@/lib/content/cta";
import { localisedRegions } from "@/lib/map/regions";
import { navHref } from "@/lib/routing/routes";

export function HeroMapSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const map = useTranslations("home.map");
  const join = joinDestination();
  const regions = localisedRegions(locale);

  return (
    <HeroMapStage
      regions={regions}
      regionsHeading={map("regionsHeading")}
      fallback={<HeroMapFlat locale={locale} />}
      hero={
        <div className="hero-copy mx-auto flex w-full flex-col items-center text-center">
          <Eyebrow>
            {t("hero.eyebrow")}
            <RollingWords
              words={regions.map((region) => region.name)}
              className="region-rotation-chip rounded-full bg-primary-muted/50 py-1 text-primary-ink"
            />
          </Eyebrow>
          <h1 className="hero-display mt-9">{t("hero.title")}</h1>
          <p className="mt-8 max-w-[46ch] text-lead text-ink-muted text-pretty">{t("hero.lead")}</p>
          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ActionLink destination={join} className={buttonClass()}>
              {t("hero.primaryCta")}
            </ActionLink>
            <Link href={navHref("volunteering")} className={buttonClass({ variant: "outline" })}>
              {t("hero.secondaryCta")}
            </Link>
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
