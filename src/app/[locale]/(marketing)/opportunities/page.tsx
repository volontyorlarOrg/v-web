import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import {
  OpportunityList,
  opportunitiesDestination,
} from "@/components/marketing/home/opportunities-section";
import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import type { Locale } from "@/i18n/routing";
import { LEVEL_STEPS } from "@/lib/content/home";
import { buildPageMetadata } from "@/lib/seo/metadata";

const XP_ITEMS = ["volunteering", "competition", "levels"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/opportunities">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "opportunities", namespace: "opportunitiesPage" });
}

export default async function OpportunitiesPage({ params }: PageProps<"/[locale]/opportunities">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Opportunities locale={locale as Locale} />;
}

function Opportunities({ locale }: { locale: Locale }) {
  const t = useTranslations("opportunitiesPage");
  const levels = useTranslations("home.levels");
  const list = opportunitiesDestination(locale);

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="opportunities" />
      <PageHero title={t("title")} lead={t("lead")} />

      <section aria-labelledby="latest-title" className="bg-fog-50 px-5 py-16 text-navy-900 min-[981px]:px-[132px] min-[981px]:py-24">
        <div className="mx-auto max-w-[1176px]">
          <h2 id="latest-title" className="m-0 text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] min-[981px]:text-[40px]">
            {t("latest.title")}
          </h2>
          <p className="mt-3 mb-0 max-w-[60ch] text-[17px] leading-[1.5] text-fog-600">{t("latest.lead")}</p>
          <OpportunityList locale={locale} limit={6} />
          <div className="mt-10">
            <ActionLink
              destination={list}
              className="inline-flex h-14 items-center rounded-xl bg-orange-600 px-8 text-[17px] font-bold text-knockout transition-colors hover:bg-orange-700"
            >
              {t("cta")}
            </ActionLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="xp-title" className="bg-knockout px-5 py-16 text-navy-900 min-[981px]:px-[132px] min-[981px]:py-24">
        <div className="mx-auto max-w-[1176px]">
          <h2 id="xp-title" className="m-0 text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] min-[981px]:text-[40px]">
            {t("xp.title")}
          </h2>
          <p className="mt-3 mb-0 max-w-[60ch] text-[17px] leading-[1.5] text-fog-600">{t("xp.lead")}</p>
          <ul role="list" className="mt-10 grid grid-cols-3 gap-6 p-0 max-[980px]:grid-cols-1">
            {XP_ITEMS.map((id) => (
              <li key={id} className="rounded-[20px] border border-fog-200 bg-fog-50 p-7">
                <h3 className="m-0 text-[21px] font-bold tracking-[-0.02em]">{t(`xp.items.${id}.title`)}</h3>
                <p className="mt-2.5 mb-0 text-base leading-[1.55] text-fog-600">{t(`xp.items.${id}.body`)}</p>
                {id === "levels" ? (
                  <ol className="mt-4 mb-0 grid gap-1.5 p-0 text-[15px]">
                    {LEVEL_STEPS.map((step) => (
                      <li key={step.id} className="flex justify-between gap-3 font-semibold">
                        <span>{levels(`names.${step.id}`)}</span>
                        <span className="text-fog-500">
                          {step.hours === 0 ? levels("start") : levels("hours", { count: step.hours })}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
