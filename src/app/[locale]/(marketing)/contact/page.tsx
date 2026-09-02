import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
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
        <Reveal>
          <SectionHeader title={t("channels.title")} />
        </Reveal>
        {channels.length > 0 ? (
          <ul className="reveal-sequence mt-12 border-b border-border">
            {channels.map((id) => (
              <li key={id} className="border-t border-border">
                <a
                  href={channelUrl(id) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-20 items-center justify-between gap-6 py-6 text-headline hover:text-primary-ink"
                >
                  {footer(`channels.${id}`)}
                  <span
                    aria-hidden="true"
                    className="text-title text-primary transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 max-w-2xl border-t border-dashed border-border-control pt-6 leading-relaxed text-ink-muted">
            {t("channels.empty")}
          </p>
        )}
      </Section>

      <Section tone="sunk">
        <div className="reveal-sequence grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {AUDIENCES.map((id) => (
            <section key={id} className="border-t border-border-control/60 pt-6">
              <h2 className="text-title font-semibold text-balance">{t(`${id}.title`)}</h2>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                {t(`${id}.body`)}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
