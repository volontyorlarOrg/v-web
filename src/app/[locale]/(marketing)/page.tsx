import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { SectionBackdrop } from "@/components/marketing/section-backdrop";
import { HeroMapSection } from "@/components/marketing/hero-map/hero-map-section";
import { JsonLd } from "@/components/marketing/json-ld";
import { Marquee } from "@/components/marketing/marquee";
import { NumberedRail } from "@/components/marketing/numbered-rail";
import { Reveal } from "@/components/marketing/reveal";
import { Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { StatGrid, type Stat } from "@/components/marketing/stats";
import { StepRail, type Step } from "@/components/marketing/steps";
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
        <Eyebrow tone="inverse">{t("stats.eyebrow")}</Eyebrow>
        <StatGrid stats={stats} className="mt-14" />
      </Section>

      <Section tone="sunk">
        <SectionBackdrop variant="sourcing" />
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionHeader
                eyebrow={t("what.eyebrow")}
                title={t("what.title")}
                lead={t("what.lead")}
              />
            </Reveal>
          </div>

          <NumberedRail
            items={WHAT_WE_DO.map((id) => ({
              id,
              title: t(`what.items.${id}.title`),
              description: t(`what.items.${id}.description`),
            }))}
          />
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />
        </Reveal>
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section tone="soft">
        <SectionBackdrop variant="channels" />
        <Reveal>
          <SectionHeader eyebrow={t("sources.eyebrow")} title={t("sources.title")} />
        </Reveal>
        <div className="mt-12 -mx-5 flex flex-col gap-3 border-y border-border sm:-mx-8">
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
        </div>
        <Link
          href={navHref("partners")}
          className={buttonClass({ variant: "ghost", size: "sm", className: "mt-8 -ml-4" })}
        >
          {t("sources.cta")}
        </Link>
      </Section>

      <Section>
        <div className="reveal-wipe relative isolate overflow-hidden rounded-2xl bg-primary-ink px-7 py-16 sm:px-14 sm:py-20">
          <BrandArc className="pointer-events-none absolute -right-16 -bottom-40 -z-10 size-96 text-knockout/12" />
          <h2 className="max-w-[18ch] text-headline text-knockout text-balance">
            {t("cta.title")}
          </h2>
          <p className="mt-6 max-w-xl text-lead text-primary-muted text-pretty">
            {t("cta.lead")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
        </div>
      </Section>
    </>
  );
}
