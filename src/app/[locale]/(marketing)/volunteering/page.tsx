import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader, StatusChip } from "@/components/marketing/section";
import { StepRail, type Step } from "@/components/marketing/steps";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { joinDestination, opportunitiesDestination } from "@/lib/content/cta";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { appOrigin } from "@/lib/seo/origin";

const HOW_STEPS = ["find", "check", "share", "volunteer"] as const;
const EXPECTATIONS = ["real", "clear", "support"] as const;
const RESPONSIBILITIES = ["show", "time", "respect"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/volunteering">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    route: "volunteering",
    namespace: "volunteering",
  });
}

export default async function VolunteeringPage({
  params,
}: PageProps<"/[locale]/volunteering">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Volunteering locale={locale as Locale} />;
}

function Volunteering({ locale }: { locale: Locale }) {
  const t = useTranslations("volunteering");
  const home = useTranslations("home");
  const nav = useTranslations("nav");
  const join = joinDestination();
  const opportunities = opportunitiesDestination();
  const hasApp = appOrigin() !== null;

  const steps: Step[] = HOW_STEPS.map((id) => ({
    id,
    title: home(`how.steps.${id}.title`),
    description: home(`how.steps.${id}.description`),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("volunteering"), route: "volunteering" },
          ],
        })}
      />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <SectionHeader
          eyebrow={home("how.eyebrow")}
          title={home("how.title")}
          lead={home("how.lead")}
        />
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section tone="sunk">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div >
            <h2 className="text-2xl font-bold tracking-[-0.025em]">{t("start.title")}</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{t("start.body")}</p>
            <ActionLink
              destination={join}
              className={buttonClass({ size: "sm", className: "mt-7" })}
            >
              {home("hero.primaryCta")}
            </ActionLink>
          </div>

          <div >
            <h2 className="text-2xl font-bold tracking-[-0.025em]">{t("expect.title")}</h2>
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
              {EXPECTATIONS.map((id) => (
                <li key={id} className="p-5">
                  <h3 className="font-bold">{t(`expect.items.${id}.title`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {t(`expect.items.${id}.description`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div >
            <h2 className="text-2xl font-bold tracking-[-0.025em]">
              {t("responsibilities.title")}
            </h2>
            <ul className="mt-6 space-y-4">
              {RESPONSIBILITIES.map((id) => (
                <li key={id} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-2 shrink-0 rounded-full bg-primary"
                  />
                  {t(`responsibilities.items.${id}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-7 sm:p-9">
            <h2 className="text-2xl font-bold tracking-[-0.025em]">{t("app.title")}</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{t("app.body")}</p>
            {hasApp ? (
              <ActionLink
                destination={opportunities}
                className={buttonClass({ size: "sm", className: "mt-7" })}
              >
                {t("app.cta")}
              </ActionLink>
            ) : (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <StatusChip>{t("app.title")}</StatusChip>
                <p className="text-sm text-ink-muted">{t("app.pending")}</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
