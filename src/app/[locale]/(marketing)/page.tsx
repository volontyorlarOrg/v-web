import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { FaqSection } from "@/components/marketing/home/faq-section";
import { HeroSection } from "@/components/marketing/home/hero-section";
import { LevelsSection } from "@/components/marketing/home/levels-section";
import { OpportunitiesSection } from "@/components/marketing/home/opportunities-section";
import { OrganisationsSection } from "@/components/marketing/home/organisations-section";
import { PartnersStrip } from "@/components/marketing/home/partners-strip";
import { PortfolioSection } from "@/components/marketing/home/portfolio-section";
import { TeamSection } from "@/components/marketing/home/team-section";
import { JsonLd } from "@/components/marketing/json-ld";
import type { Locale } from "@/i18n/routing";
import { volunteerTotalOrFallback } from "@/lib/home/stats.server";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

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
  const [volunteerTotal, t, common] = await Promise.all([
    volunteerTotalOrFallback(),
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  return (
    <>
      <JsonLd
        data={organizationJsonLd({
          locale: locale as Locale,
          name: common("organizationName"),
          description: t("metaDescription"),
          founderJobTitles: {
            ceo: common("founderRoles.ceo"),
            cto: common("founderRoles.cto"),
          },
        })}
      />
      <JsonLd
        data={webSiteJsonLd({
          locale: locale as Locale,
          name: common("organizationName"),
          description: t("metaDescription"),
        })}
      />
      <HeroSection locale={locale as Locale} volunteerTotal={volunteerTotal} />
      <PartnersStrip />
      <OpportunitiesSection locale={locale as Locale} />
      <PortfolioSection locale={locale as Locale} />
      <LevelsSection locale={locale as Locale} />
      <OrganisationsSection />
      <TeamSection locale={locale as Locale} />
      <FaqSection />
    </>
  );
}
