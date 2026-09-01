import { useTranslations } from "next-intl";

import { RegionMapFlat } from "@/components/marketing/region-map/region-map-flat";
import { RegionMapStage } from "@/components/marketing/region-map/region-map-stage";
import { Eyebrow } from "@/components/marketing/section";
import type { Locale } from "@/i18n/routing";
import { localisedRegions } from "@/lib/map/regions";

export function RegionMapSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home.map");

  return (
    <RegionMapStage
      regions={localisedRegions(locale)}
      regionsHeading={t("regionsHeading")}
      fallback={<RegionMapFlat locale={locale} />}
    >
      <div className="max-w-2xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 id="regions-map-heading" className="mt-4 text-headline font-bold text-balance">
          {t("title")}
        </h2>
        <p className="mt-4 text-lead text-ink-muted text-pretty">{t("lead")}</p>
      </div>
    </RegionMapStage>
  );
}
