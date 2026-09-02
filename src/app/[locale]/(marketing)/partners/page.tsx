import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { NameBoard } from "@/components/marketing/name-board";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
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
        <Reveal>
          <SectionHeader title={t("partnership.title")} lead={t("partnership.lead")} />
        </Reveal>
        <NameBoard
          className="reveal-sequence mt-10"
          entries={PARTNERS.map((partner) => ({
            id: partner.id,
            name: partner.name,
            note: t("partnership.note"),
          }))}
        />
      </Section>

      <Section tone="sunk">
        <Reveal>
          <SectionHeader title={t("support.title")} lead={t("support.lead")} />
        </Reveal>
        <NameBoard
          className="reveal-sequence mt-10"
          entries={SUPPORTERS.map((supporter) => ({
            id: supporter.id,
            name: supporter.name,
            note: t("support.note"),
          }))}
        />
      </Section>

      <Section>
        <Reveal>
          <SectionHeader title={t("sources.title")} lead={t("sources.lead")} />
        </Reveal>
        <NameBoard
          className="reveal-sequence mt-10"
          entries={OPPORTUNITY_SOURCES.map((source) => ({
            id: source.id,
            name: source.name,
            note: t("sources.note"),
          }))}
        />
      </Section>

      <Section tone="ink">
        <Reveal className="max-w-2xl">
          <h2 className="text-headline text-knockout text-balance">{t("work.title")}</h2>
          <p className="mt-6 text-lead text-primary-muted text-pretty">{t("work.body")}</p>
          <Link
            href={navHref("contact")}
            className={buttonClass({ variant: "inverse", className: "mt-9" })}
          >
            {t("work.cta")}
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
