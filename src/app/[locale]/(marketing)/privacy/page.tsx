import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { LegalContact } from "@/components/legal/legal-contact";
import { ProseSections, type ProseSection } from "@/components/marketing/prose";
import { Section } from "@/components/marketing/section";
import type { Locale } from "@/i18n/routing";
import { LEGAL_UPDATED_ON } from "@/lib/content/org";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "privacy", namespace: "privacy" });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Privacy locale={locale as Locale} />;
}

function Privacy({ locale }: { locale: Locale }) {
  const t = useTranslations("privacy");
  const format = useFormatter();

  const sections: ProseSection[] = Object.entries(
    t.raw("sections") as Record<string, Omit<ProseSection, "id">>,
  ).map(([id, section]) => ({ id, ...section }));

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="privacy" />

      <PageHero
        title={t("title")}
        lead={t("lead")}
        meta={[
          {
            label: t("updatedLabel"),
            value: format.dateTime(new Date(LEGAL_UPDATED_ON), {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
        ]}
      />

      <Section>
        <ProseSections sections={sections} />
        <LegalContact />
      </Section>
    </>
  );
}
