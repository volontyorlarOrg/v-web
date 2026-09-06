import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { SectionBackdrop } from "@/components/marketing/section-backdrop";
import { HeroMapSection } from "@/components/marketing/hero-map/hero-map-section";
import { JsonLd } from "@/components/marketing/json-ld";
import { Marquee } from "@/components/marketing/marquee";
import { Scene, SplitWords } from "@/components/marketing/scene";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { StatGrid, type Stat } from "@/components/marketing/stats";
import { StepRail, type Step } from "@/components/marketing/steps";
import { WorkField } from "@/components/marketing/work-field";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { joinDestination } from "@/lib/content/cta";
import {
  OPPORTUNITY_SOURCES,
  PARTNERS,
  SUPPORTERS,
  TARGET_REGION_COUNT,
  TRACTION,
} from "@/lib/content/org";
import { navHref } from "@/lib/routing/routes";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const WHAT_WE_DO = ["find", "contact", "source", "partnerships", "supply", "regional"] as const;
const HOW_STEPS = ["find", "check", "share", "volunteer"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    route: "home",
    namespace: "home",
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home locale={locale as Locale} />;
}

function Home({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const partnersCopy = useTranslations("partners");
  const common = useTranslations("common");
  const join = joinDestination();

  const stats: Stat[] = [
    {
      id: "telegram",
      amount: TRACTION.telegramFollowers,
      suffix: "+",
      label: t("stats.telegram"),
    },
    { id: "events", amount: TRACTION.eventsSupplied, suffix: "+", label: t("stats.events") },
    {
      id: "applications",
      amount: TRACTION.regionalRoleApplications,
      suffix: "+",
      label: t("stats.applications"),
    },
    { id: "regions", amount: TARGET_REGION_COUNT, label: t("stats.regions") },
  ];

  const steps: Step[] = HOW_STEPS.map((id) => ({
    id,
    title: t(`how.steps.${id}.title`),
    description: t(`how.steps.${id}.description`),
    actor: id === "volunteer" ? "volunteer" : "organisation",
  }));

  const organizationStructuredData = organizationJsonLd({
    locale,
    name: common("organizationName"),
    description: t("metaDescription"),
  });
  const websiteStructuredData = webSiteJsonLd({
    locale,
    name: common("organizationName"),
    description: t("metaDescription"),
  });

  return (
    <>
      <JsonLd data={organizationStructuredData} />
      <JsonLd data={websiteStructuredData} />

      <HeroMapSection locale={locale} />

      <Section tone="ink">
        <Scene variant="group">
          <Eyebrow tone="inverse" className="scene-rise">
            {t("stats.eyebrow")}
          </Eyebrow>
        </Scene>
        <StatGrid stats={stats} className="mt-14" />
      </Section>

      <Section tone="sunk">
        <Scene variant="group" className="mx-auto max-w-3xl text-center">
          <h2 className="text-headline text-balance">
            <SplitWords text={t("what.eyebrow")} />
          </h2>
          <p className="scene-rise mt-5 text-lead text-ink text-pretty [--scene-delay:280ms]">
            {t("what.title")}
          </p>
          <p className="scene-rise mt-3 text-ink-muted text-pretty [--scene-delay:380ms]">
            {t("what.lead")}
          </p>
        </Scene>

        <WorkField
          className="mt-14 sm:mt-20"
          items={WHAT_WE_DO.map((id) => ({
            id,
            title: t(`what.items.${id}.title`),
            description: t(`what.items.${id}.description`),
          }))}
        />
      </Section>

      <Section>
        <SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section id="sources" tone="soft">
        <SectionBackdrop variant="channels" />
        <SectionHeader eyebrow={t("sources.eyebrow")} title={t("sources.title")} />
        <Scene className="mt-12 -mx-5 flex flex-col gap-3 border-y border-border sm:-mx-8">
          <Marquee
            label={t("sources.sourcesLabel")}
            seconds={44}
            entries={OPPORTUNITY_SOURCES.map((source) => ({
              id: source.id,
              name: source.name,
              note: partnersCopy("sources.note"),
            }))}
          />
          <Marquee
            label={t("sources.partnersLabel")}
            reverse
            seconds={52}
            className="border-t border-border"
            entries={[
              ...PARTNERS.map((partner) => ({
                id: partner.id,
                name: partner.name,
                note: partnersCopy("partnership.note"),
              })),
              ...SUPPORTERS.map((supporter) => ({
                id: supporter.id,
                name: supporter.name,
                note: partnersCopy("support.note"),
              })),
            ]}
          />
        </Scene>
        <Link
          href={navHref("partners")}
          className={buttonClass({ variant: "ghost", size: "sm", className: "mt-8 -ml-4" })}
        >
          {t("sources.cta")}
        </Link>
      </Section>

      <Section>
        <Scene
          variant="wipe"
          className="relative isolate overflow-hidden rounded-2xl bg-band px-7 py-16 sm:px-14 sm:py-20"
        >
          <BrandArc className="pointer-events-none absolute -right-16 -bottom-40 -z-10 size-96 text-knockout/12" />
          <h2 className="max-w-[18ch] text-headline text-knockout text-balance [--scene-delay:260ms]">
            <SplitWords text={t("cta.title")} />
          </h2>
          <p className="scene-rise mt-6 max-w-xl text-lead text-band-copy text-pretty [--scene-delay:520ms]">
            {t("cta.lead")}
          </p>
          <div className="scene-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [--scene-delay:640ms]">
            <ActionLink destination={join} className={buttonClass({ variant: "inverse" })}>
              {t("cta.primary")}
            </ActionLink>
            <Link
              href={navHref("contact")}
              className={buttonClass({
                variant: "outline",
                className: "border-knockout/55 text-knockout hover:border-knockout hover:bg-primary-deep hover:text-knockout",
              })}
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </Scene>
      </Section>
    </>
  );
}
