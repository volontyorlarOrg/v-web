import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { StatGrid, type Stat } from "@/components/marketing/stats";
import type { Locale } from "@/i18n/routing";
import { FOUNDED_ON, FOUNDERS, TRACTION } from "@/lib/content/org";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
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
  const nav = useTranslations("nav");
  const format = useFormatter();

  const plus = (value: number) => `${format.number(value)}+`;

  const stats: Stat[] = [
    { id: "telegram", value: plus(TRACTION.telegramFollowers), label: t("stats.telegram") },
    { id: "instagram", value: plus(TRACTION.instagramFollowers), label: t("stats.instagram") },
    { id: "events", value: plus(TRACTION.eventsSupplied), label: t("stats.events") },
    {
      id: "applications",
      value: plus(TRACTION.regionalRoleApplications),
      label: t("stats.applications"),
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("about"), route: "about" },
          ],
        })}
      />

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
          { label: t("foundersLabel"), value: FOUNDERS.join(" · ") },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {STORY.map((id) => (
            <section key={id} >
              <h2 className="text-xl font-bold tracking-[-0.02em] text-balance">
                {t(`${id}.title`)}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                {t(`${id}.body`)}
              </p>
            </section>
          ))}
        </div>
      </Section>

      <Section tone="sunk">
        <SectionHeader title={t("numbers.title")} lead={t("numbers.lead")} />
        <StatGrid stats={stats} className="mt-10" />
      </Section>
    </>
  );
}
