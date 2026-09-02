import { useTranslations } from "next-intl";

import { ActionLink } from "@/components/marketing/action-link";
import { HeroMapFlat } from "@/components/marketing/hero-map/hero-map-flat";
import { HeroMapStage } from "@/components/marketing/hero-map/hero-map-stage";
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

  return (
    <HeroMapStage
      regions={localisedRegions(locale)}
      regionsHeading={map("regionsHeading")}
      fallback={<HeroMapFlat locale={locale} />}
      hero={
        <div className="max-w-3xl">
          <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] text-display font-bold text-balance">
            {t("hero.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-lead text-ink-muted text-pretty">{t("hero.lead")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionLink destination={join} className={buttonClass()}>
              {t("hero.primaryCta")}
            </ActionLink>
            <Link href={navHref("volunteering")} className={buttonClass({ variant: "outline" })}>
              {t("hero.secondaryCta")}
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-muted">{t("hero.note")}</p>
        </div>
      }
      caption={
        <div className="max-w-xl">
          <Eyebrow>{map("eyebrow")}</Eyebrow>
          <h2 id="regions-map-heading" className="mt-4 text-headline font-bold text-balance">
            {map("title")}
          </h2>
          <p className="mt-4 text-pretty text-ink-muted">{map("lead")}</p>
        </div>
      }
    />
  );
}
