import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import { NumberedRail } from "@/components/marketing/numbered-rail";
import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Scene, SplitWords } from "@/components/marketing/scene";
import { Section, SectionHeader, StatusChip } from "@/components/marketing/section";
import { StepRail, type Step } from "@/components/marketing/steps";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { joinDestination, opportunitiesDestination } from "@/lib/content/cta";
import { buildPageMetadata } from "@/lib/seo/metadata";

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
  const join = joinDestination();
  const opportunities = opportunitiesDestination();

  const steps: Step[] = HOW_STEPS.map((id) => ({
    id,
    title: home(`how.steps.${id}.title`),
    description: home(`how.steps.${id}.description`),
    actor: id === "volunteer" ? "volunteer" : "organisation",
  }));

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="volunteering" />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <SectionHeader eyebrow={home("how.eyebrow")} title={home("how.title")} />
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section tone="sunk">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader title={t("expect.title")} />
          </div>
          <NumberedRail
            items={EXPECTATIONS.map((id) => ({
              id,
              title: t(`expect.items.${id}.title`),
              description: t(`expect.items.${id}.description`),
            }))}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader title={t("responsibilities.title")} />
            <Scene as="ul" variant="stagger" className="mt-10">
              {RESPONSIBILITIES.map((id) => (
                <li
                  key={id}
                  className="border-t border-border py-5 leading-relaxed text-pretty"
                >
                  {t(`responsibilities.items.${id}`)}
                </li>
              ))}
            </Scene>
          </div>

          <div className="lg:pt-2">
            <SectionHeader title={t("app.title")} lead={t("app.body")} />
            {opportunities ? (
              <Scene className="mt-9">
                <ActionLink destination={opportunities} className={buttonClass()}>
                  {t("app.cta")}
                </ActionLink>
              </Scene>
            ) : (
              <Scene className="mt-9 flex flex-wrap items-center gap-3">
                <StatusChip>{t("app.title")}</StatusChip>
                <p className="text-sm text-ink-muted">{t("app.pending")}</p>
              </Scene>
            )}
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <Scene variant="group" className="max-w-2xl">
          <h2 className="text-headline text-knockout text-balance">
            <SplitWords text={t("start.title")} />
          </h2>
          <p className="scene-rise mt-6 text-lead text-band-copy text-pretty [--scene-delay:340ms]">
            {t("start.body")}
          </p>
          <ActionLink
            destination={join}
            className={buttonClass({
              variant: "inverse",
              className: "scene-rise mt-9 [--scene-delay:460ms]",
            })}
          >
            {home("hero.primaryCta")}
          </ActionLink>
        </Scene>
      </Section>
    </>
  );
}
