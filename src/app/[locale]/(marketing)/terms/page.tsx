import { useFormatter, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { ProseSections, type ProseSection } from "@/components/marketing/prose";
import { Section } from "@/components/marketing/section";
import type { Locale } from "@/i18n/routing";
import { LEGAL_UPDATED_ON } from "@/lib/content/org";
import { buildPageMetadata } from "@/lib/seo/metadata";

const SECTION_IDS = ["purpose", "accuracy", "placement", "conduct", "brand", "external", "changes"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "terms", namespace: "terms" });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Terms locale={locale as Locale} />;
}

function Terms({ locale }: { locale: Locale }) {
  const t = useTranslations("terms");
  const format = useFormatter();

  const sections: ProseSection[] = SECTION_IDS.map((id) => ({
    id,
    title: t(`sections.${id}.title`),
    body: t(`sections.${id}.body`),
  }));

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="terms" />

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
      </Section>
    </>
  );
}
