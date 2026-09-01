import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import type { Locale } from "@/i18n/routing";
import { availableChannels, channelUrl } from "@/lib/constants/channels";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
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
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");
  const channels = availableChannels();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("contact"), route: "contact" },
          ],
        })}
      />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <SectionHeader title={t("channels.title")} />
        {channels.length > 0 ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {channels.map((id) => (
              <li key={id} className="rounded-lg border border-border bg-surface">
                <a
                  href={channelUrl(id) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-20 items-center justify-between gap-4 p-6 text-lg font-bold hover:text-primary-ink"
                >
                  {footer(`channels.${id}`)}
                  <span aria-hidden="true" className="text-primary">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-2xl rounded-xl border border-dashed border-border-control p-6 leading-relaxed text-ink-muted">
            {t("channels.empty")}
          </p>
        )}
      </Section>

      <Section tone="sunk">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
          {AUDIENCES.map((id) => (
            <section key={id} className="bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-balance">
                {t(`${id}.title`)}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-muted">{t(`${id}.body`)}</p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
