import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { NameBoard } from "@/components/marketing/name-board";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { OPPORTUNITY_SOURCES, PARTNERS, SUPPORTERS } from "@/lib/content/org";
import { navHref } from "@/lib/routing/routes";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/partners">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    route: "partners",
    namespace: "partners",
  });
}

export default async function PartnersPage({ params }: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Partners locale={locale as Locale} />;
}

function Partners({ locale }: { locale: Locale }) {
  const t = useTranslations("partners");
  const nav = useTranslations("nav");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("partners"), route: "partners" },
          ],
        })}
      />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <SectionHeader title={t("partnership.title")} lead={t("partnership.lead")} />
        <NameBoard
          className="mt-8"
          entries={PARTNERS.map((partner) => ({
            id: partner.id,
            name: partner.name,
            note: t("partnership.note"),
          }))}
        />
      </Section>

      <Section tone="sunk">
        <SectionHeader title={t("support.title")} lead={t("support.lead")} />
        <NameBoard
          className="mt-8"
          entries={SUPPORTERS.map((supporter) => ({
            id: supporter.id,
            name: supporter.name,
            note: t("support.note"),
          }))}
        />
      </Section>

      <Section>
        <SectionHeader title={t("sources.title")} lead={t("sources.lead")} />
        <NameBoard
          className="mt-8"
          entries={OPPORTUNITY_SOURCES.map((source) => ({
            id: source.id,
            name: source.name,
            note: t("sources.note"),
          }))}
        />
      </Section>

      <Section tone="soft">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.025em]">{t("work.title")}</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{t("work.body")}</p>
          <Link href={navHref("contact")} className={buttonClass({ className: "mt-7" })}>
            {t("work.cta")}
          </Link>
        </div>
      </Section>
    </>
  );
}
