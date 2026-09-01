import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader, StatusChip } from "@/components/marketing/section";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { joinDestination } from "@/lib/content/cta";
import { COURSE_TOPIC_IDS } from "@/lib/content/org";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/course">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "course", namespace: "course" });
}

export default async function CoursePage({ params }: PageProps<"/[locale]/course">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Course locale={locale as Locale} />;
}

function Course({ locale }: { locale: Locale }) {
  const t = useTranslations("course");
  const nav = useTranslations("nav");
  const join = joinDestination();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("course"), route: "course" },
          ],
        })}
      />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <div className="flex flex-wrap items-center gap-4">
          <StatusChip>{t("status")}</StatusChip>
        </div>
        <SectionHeader title={t("topicsTitle")} className="mt-8" />
        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {COURSE_TOPIC_IDS.map((id, index) => (
            <li key={id} className="rounded-lg border border-border bg-surface p-6">
              <p className="tabular text-xs font-bold tracking-[0.14em] text-primary-ink uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-[-0.015em]">
                {t(`topics.${id}.title`)}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                {t(`topics.${id}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sunk">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.025em]">{t("note.title")}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{t("note.body")}</p>
          <ActionLink destination={join} className={buttonClass({ className: "mt-7" })}>
            {t("cta")}
          </ActionLink>
        </div>
      </Section>
    </>
  );
}
