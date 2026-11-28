import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { OrganisationsSection } from "@/components/marketing/home/organisations-section";
import { PartnersStrip } from "@/components/marketing/home/partners-strip";
import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/organisations">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "organisations", namespace: "organisationsPage" });
}

export default async function OrganisationsPage({ params }: PageProps<"/[locale]/organisations">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Organisations locale={locale as Locale} />;
}

function Organisations({ locale }: { locale: Locale }) {
  const t = useTranslations("organisationsPage");

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="organisations" />
      <PageHero title={t("title")} lead={t("lead")} />
      <OrganisationsSection showHeading={false} />
      <section aria-labelledby="orgs-partners-title" className="bg-knockout pt-16 text-navy-900">
        <h2 id="orgs-partners-title" className="m-0 px-5 text-center text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] min-[981px]:text-[40px]">
          {t("partnersTitle")}
        </h2>
        <PartnersStrip />
      </section>
    </>
  );
}
