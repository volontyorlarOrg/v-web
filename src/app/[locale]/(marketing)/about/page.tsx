import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { NumberedRail } from "@/components/marketing/numbered-rail";
import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Scene } from "@/components/marketing/scene";
import { Section, SectionHeader } from "@/components/marketing/section";
import { StatGrid, type Stat } from "@/components/marketing/stats";
import type { Locale } from "@/i18n/routing";
import { FOUNDED_ON, FOUNDERS, TRACTION } from "@/lib/content/org";
import { buildPageMetadata } from "@/lib/seo/metadata";

const STORY = ["founded", "purpose", "growth"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "about", namespace: "about" });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About locale={locale as Locale} />;
}

function About({ locale }: { locale: Locale }) {
  const t = useTranslations("about");
  const format = useFormatter();

  const stats: Stat[] = [
    {
      id: "telegram",
      amount: TRACTION.telegramFollowers,
      suffix: "+",
      label: t("stats.telegram"),
    },
    {
      id: "instagram",
      amount: TRACTION.instagramFollowers,
      suffix: "+",
      label: t("stats.instagram"),
    },
    { id: "events", amount: TRACTION.eventsSupplied, suffix: "+", label: t("stats.events") },
    {
      id: "applications",
      amount: TRACTION.regionalRoleApplications,
      suffix: "+",
      label: t("stats.applications"),
    },
  ];

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="about" />

      <PageHero
        title={t("title")}
        lead={t("lead")}
        meta={[
          {
            label: t("foundedLabel"),
            value: format.dateTime(new Date(FOUNDED_ON), {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
          { label: t("foundersLabel"), value: FOUNDERS.map((founder) => founder.name).join(" · ") },
        ]}
      />

      <Section>
        <NumberedRail
          className="max-w-4xl"
          items={STORY.map((id) => ({
            id,
            title: t(`${id}.title`),
            description: t(`${id}.body`),
          }))}
        />
      </Section>

      <Section id="team" tone="sunk">
        <SectionHeader title={t("founders.title")} />
        <Scene as="ul" variant="stagger" className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <li key={founder.id} className="border-t border-border pt-6">
              <p className="text-title font-semibold tracking-[-0.015em]">{founder.name}</p>
              <p className="mt-2 text-sm tracking-[0.08em] text-primary-ink uppercase">
                {t(`founders.${founder.id}.role`)}
              </p>
            </li>
          ))}
        </Scene>
      </Section>

      <Section tone="ink">
        <SectionHeader tone="inverse" title={t("numbers.title")} lead={t("numbers.lead")} />
        <StatGrid stats={stats} className="mt-14" />
      </Section>
    </>
  );
}
