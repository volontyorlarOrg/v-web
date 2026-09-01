import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { NameBoard } from "@/components/marketing/name-board";
import { Eyebrow, Section, SectionHeader, StatusChip } from "@/components/marketing/section";
import { StatGrid, type Stat } from "@/components/marketing/stats";
import { StepRail, type Step } from "@/components/marketing/steps";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { joinDestination } from "@/lib/content/cta";
import {
  COURSE_TOPIC_IDS,
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
  const courseCopy = useTranslations("course");
  const common = useTranslations("common");
  const format = useFormatter();
  const join = joinDestination();

  const plus = (value: number) => `${format.number(value)}+`;

  const stats: Stat[] = [
    { id: "telegram", value: plus(TRACTION.telegramFollowers), label: t("stats.telegram") },
    { id: "events", value: plus(TRACTION.eventsSupplied), label: t("stats.events") },
    {
      id: "applications",
      value: plus(TRACTION.regionalRoleApplications),
      label: t("stats.applications"),
    },
    {
      id: "regions",
      value: format.number(TARGET_REGION_COUNT),
      label: t("stats.regions"),
    },
  ];

  const steps: Step[] = HOW_STEPS.map((id) => ({
    id,
    title: t(`how.steps.${id}.title`),
    description: t(`how.steps.${id}.description`),
  }));

  const structuredData = [
    organizationJsonLd({
      locale,
      name: common("organizationName"),
      description: t("metaDescription"),
    }),
    webSiteJsonLd({
      locale,
      name: common("organizationName"),
      description: t("metaDescription"),
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Values come from a local module, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero ------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <BrandArc className="pointer-events-none absolute -top-16 -right-24 -z-10 size-[24rem] text-primary/[0.07] sm:-top-24 sm:-right-16 sm:size-[34rem]" />
        <div className="container-page py-16 sm:py-24">
          <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] text-display font-bold text-balance">
            {t("hero.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-lead text-ink-muted text-pretty">
            {t("hero.lead")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionLink destination={join} className={buttonClass()}>
              {t("hero.primaryCta")}
            </ActionLink>
            <Link
              href={navHref("volunteering")}
              className={buttonClass({ variant: "outline" })}
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
          <p className="mt-5 text-sm text-ink-muted">{t("hero.note")}</p>

          <div className="mt-14 border-t border-border pt-10">
            <Eyebrow>{t("stats.eyebrow")}</Eyebrow>
            <StatGrid stats={stats} className="mt-5" />
          </div>
        </div>
      </section>

      {/* What we do ------------------------------------------------------- */}
      <Section tone="sunk">
        <SectionHeader
          eyebrow={t("what.eyebrow")}
          title={t("what.title")}
          lead={t("what.lead")}
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((id) => (
            <li key={id} className="bg-surface p-6">
              <h3 className="text-lg font-bold tracking-[-0.015em]">
                {t(`what.items.${id}.title`)}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                {t(`what.items.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works ----------------------------------------------------- */}
      <Section>
        <SectionHeader
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          lead={t("how.lead")}
        />
        <StepRail steps={steps} className="mt-14" />
      </Section>

      {/* Who we work with -------------------------------------------------- */}
      <Section tone="soft">
        <SectionHeader
          eyebrow={t("sources.eyebrow")}
          title={t("sources.title")}
          lead={t("sources.lead")}
        />
        <NameBoard
          className="mt-10"
          entries={OPPORTUNITY_SOURCES.map((source) => ({
            id: source.id,
            name: source.name,
            note: partnersCopy("sources.note"),
          }))}
        />
        <NameBoard
          className="mt-4"
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
        <Link
          href={navHref("partners")}
          className={buttonClass({ variant: "ghost", size: "sm", className: "mt-6 -ml-4" })}
        >
          {t("sources.cta")}
        </Link>
      </Section>

      {/* Regions ---------------------------------------------------------- */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow={t("regions.eyebrow")}
            title={t("regions.title")}
            lead={t("regions.lead")}
          />
          <dl className="grid gap-px overflow-hidden rounded-xl border border-primary-ink bg-primary-ink sm:grid-cols-2">
            <div className="bg-primary-ink p-7">
              <dd className="tabular text-[clamp(2.75rem,8vw,4rem)] leading-none font-bold text-primary-fg">
                {format.number(TARGET_REGION_COUNT)}
              </dd>
              <dt className="mt-3 text-sm leading-snug text-primary-muted">
                {t("regions.regionsLabel")}
              </dt>
            </div>
            <div className="bg-primary-ink p-7 sm:border-l sm:border-primary-fg/25">
              <dd className="tabular text-[clamp(2.75rem,8vw,4rem)] leading-none font-bold text-primary-fg">
                {plus(TRACTION.regionalRoleApplications)}
              </dd>
              <dt className="mt-3 text-sm leading-snug text-primary-muted">
                {t("regions.applicationsLabel")}
              </dt>
            </div>
          </dl>
        </div>
      </Section>

      {/* Course ----------------------------------------------------------- */}
      <Section tone="sunk">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={t("course.eyebrow")}
              title={t("course.title")}
              lead={t("course.lead")}
            />
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <StatusChip>{courseCopy("status")}</StatusChip>
              <Link
                href={navHref("course")}
                className={buttonClass({ variant: "outline", size: "sm" })}
              >
                {t("course.cta")}
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-border self-start rounded-xl border border-border bg-surface">
            {COURSE_TOPIC_IDS.map((id) => (
              <li key={id} className="px-6 py-4 text-base font-semibold">
                {courseCopy(`topics.${id}.title`)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Closing call to action ------------------------------------------- */}
      <Section>
        <div className="relative isolate overflow-hidden rounded-2xl bg-primary-ink px-6 py-14 sm:px-12 sm:py-16">
          <BrandArc className="pointer-events-none absolute -right-16 -bottom-40 -z-10 size-96 text-primary-fg/12" />
          <h2 className="max-w-[18ch] text-headline font-bold text-primary-fg text-balance">
            {t("cta.title")}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-primary-muted text-pretty">
            {t("cta.lead")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionLink destination={join} className={buttonClass({ variant: "inverse" })}>
              {t("cta.primary")}
            </ActionLink>
            <Link
              href={navHref("contact")}
              className={buttonClass({
                variant: "outline",
                className: "border-primary-fg/40 text-primary-fg hover:border-primary-fg hover:bg-primary-deep hover:text-primary-fg",
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
