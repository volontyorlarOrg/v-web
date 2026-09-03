import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Scene } from "@/components/marketing/scene";
import { Section, SectionHeader } from "@/components/marketing/section";
import type { Locale } from "@/i18n/routing";
import { configuredChannels } from "@/lib/constants/channels";
import { buildPageMetadata } from "@/lib/seo/metadata";

const AUDIENCES = ["volunteers", "organisers", "regional"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale: locale as Locale, route: "contact", namespace: "contact" });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Contact locale={locale as Locale} />;
}

function Contact({ locale }: { locale: Locale }) {
  const t = useTranslations("contact");
  const footer = useTranslations("footer");
  const channels = configuredChannels();

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} route="contact" />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <SectionHeader title={t("channels.title")} />
        {channels.length > 0 ? (
          <Scene as="ul" variant="stagger" className="mt-12 border-b border-border">
            {channels.map((channel) => (
              <li key={channel.id} className="border-t border-border">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-20 items-center justify-between gap-6 py-6 text-headline hover:text-primary-ink"
                >
                  {footer(`channels.${channel.id}`)}
                  <span
                    aria-hidden="true"
                    className="text-title text-primary transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </Scene>
        ) : (
          <Scene
            as="p"
            className="mt-10 max-w-2xl border-t border-dashed border-border-control pt-6 leading-relaxed text-ink-muted"
          >
            {t("channels.empty")}
          </Scene>
        )}
      </Section>

      <Section tone="sunk">
        <Scene variant="stagger" className="grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {AUDIENCES.map((id) => (
            <section key={id} className="border-t border-border-control/60 pt-6">
              <h2 className="text-title font-semibold text-balance">{t(`${id}.title`)}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                {t(`${id}.body`)}
              </p>
            </section>
          ))}
        </Scene>
      </Section>
    </>
  );
}
