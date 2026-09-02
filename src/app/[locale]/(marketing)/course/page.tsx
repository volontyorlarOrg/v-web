import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import { JsonLd } from "@/components/marketing/json-ld";
import { NumberedRail } from "@/components/marketing/numbered-rail";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
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
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <StatusChip>{t("status")}</StatusChip>
              <SectionHeader title={t("topicsTitle")} className="mt-7" />
            </Reveal>
          </div>
          <NumberedRail
            items={COURSE_TOPIC_IDS.map((id) => ({
              id,
              title: t(`topics.${id}.title`),
              description: t(`topics.${id}.description`),
            }))}
          />
        </div>
      </Section>

      <Section tone="ink">
        <Reveal className="max-w-2xl">
          <h2 className="text-headline text-knockout text-balance">{t("note.title")}</h2>
          <p className="mt-6 text-lead text-primary-muted text-pretty">{t("note.body")}</p>
          <ActionLink
            destination={join}
            className={buttonClass({ variant: "inverse", className: "mt-9" })}
          >
            {t("cta")}
          </ActionLink>
        </Reveal>
      </Section>
    </>
  );
}
