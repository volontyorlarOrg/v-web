import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { BrandArc } from "@/components/brand/logo";
import { ActionLink } from "@/components/marketing/action-link";
import { NameBoard } from "@/components/marketing/name-board";
import { SectionBackdrop } from "@/components/marketing/section-backdrop";
import { HeroMapSection } from "@/components/marketing/hero-map/hero-map-section";
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
    actor: id === "volunteer" ? "volunteer" : "organisation",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroMapSection locale={locale} />

      <Section>
        <Eyebrow>{t("stats.eyebrow")}</Eyebrow>
        <StatGrid stats={stats} className="mt-6" />
      </Section>

      <Section tone="sunk">
        <SectionBackdrop variant="sourcing" />
        <SectionHeader
          eyebrow={t("what.eyebrow")}
          title={t("what.title")}
          lead={t("what.lead")}
        />
        <ul className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((id) => (
            <li key={id} className="border-t border-border py-7">
              <h3 className="text-title font-semibold">{t(`what.items.${id}.title`)}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                {t(`what.items.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section tone="soft">
        <SectionBackdrop variant="channels" />
        <SectionHeader eyebrow={t("sources.eyebrow")} title={t("sources.title")} />
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

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow={t("regions.eyebrow")}
            title={t("regions.title")}
            lead={t("regions.lead")}
          />
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            <div className="border-t border-primary-muted pt-6">
              <dd className="tabular display-face text-[clamp(3rem,7vw,4.5rem)] leading-none tracking-[-0.03em] text-primary-ink">
                {format.number(TARGET_REGION_COUNT)}
              </dd>
              <dt className="mt-4 text-sm leading-snug text-ink-muted">
                {t("regions.regionsLabel")}
              </dt>
            </div>
            <div className="border-t border-primary-muted pt-6">
              <dd className="tabular display-face text-[clamp(3rem,7vw,4.5rem)] leading-none tracking-[-0.03em] text-primary-ink">
                {plus(TRACTION.regionalRoleApplications)}
              </dd>
              <dt className="mt-4 text-sm leading-snug text-ink-muted">
                {t("regions.applicationsLabel")}
              </dt>
            </div>
          </dl>
        </div>
      </Section>

      <Section tone="sunk">
        <SectionBackdrop variant="study" />
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
          <ul className="self-start divide-y divide-border border-t border-border">
            {COURSE_TOPIC_IDS.map((id) => (
              <li key={id} className="py-4 text-base font-medium">
                {courseCopy(`topics.${id}.title`)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="relative isolate overflow-hidden rounded-2xl bg-primary-ink px-7 py-16 sm:px-14 sm:py-20">
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
