import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { ActionLink } from "@/components/marketing/action-link";
import { JsonLd } from "@/components/marketing/json-ld";
import { NumberedRail } from "@/components/marketing/numbered-rail";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { Section, SectionHeader, StatusChip } from "@/components/marketing/section";
import { StepRail, type Step } from "@/components/marketing/steps";
import { buttonClass } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { joinDestination, opportunitiesDestination } from "@/lib/content/cta";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { appOrigin } from "@/lib/seo/origin";

const HOW_STEPS = ["find", "check", "share", "volunteer"] as const;
const EXPECTATIONS = ["real", "clear", "support"] as const;
const RESPONSIBILITIES = ["show", "time", "respect"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/volunteering">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    route: "volunteering",
    namespace: "volunteering",
  });
}

export default async function VolunteeringPage({
  params,
}: PageProps<"/[locale]/volunteering">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Volunteering locale={locale as Locale} />;
}

function Volunteering({ locale }: { locale: Locale }) {
  const t = useTranslations("volunteering");
  const home = useTranslations("home");
  const nav = useTranslations("nav");
  const join = joinDestination();
  const opportunities = opportunitiesDestination();
  const hasApp = appOrigin() !== null;

  const steps: Step[] = HOW_STEPS.map((id) => ({
    id,
    title: home(`how.steps.${id}.title`),
    description: home(`how.steps.${id}.description`),
    actor: id === "volunteer" ? "volunteer" : "organisation",
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          locale,
          trail: [
            { name: nav("home"), route: "home" },
            { name: nav("volunteering"), route: "volunteering" },
          ],
        })}
      />

      <PageHero title={t("title")} lead={t("lead")} />

      <Section>
        <Reveal>
          <SectionHeader eyebrow={home("how.eyebrow")} title={home("how.title")} />
        </Reveal>
        <StepRail steps={steps} className="mt-14" />
      </Section>

      <Section tone="sunk">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionHeader title={t("expect.title")} />
            </Reveal>
          </div>
          <NumberedRail
            items={EXPECTATIONS.map((id) => ({
              id,
              title: t(`expect.items.${id}.title`),
              description: t(`expect.items.${id}.description`),
            }))}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeader title={t("responsibilities.title")} />
            </Reveal>
            <ul className="reveal-sequence mt-10">
              {RESPONSIBILITIES.map((id) => (
                <li
                  key={id}
                  className="border-t border-border py-5 leading-relaxed text-pretty"
                >
                  {t(`responsibilities.items.${id}`)}
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="lg:pt-2">
            <SectionHeader title={t("app.title")} lead={t("app.body")} />
            {hasApp ? (
              <ActionLink destination={opportunities} className={buttonClass({ className: "mt-9" })}>
                {t("app.cta")}
              </ActionLink>
            ) : (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <StatusChip>{t("app.title")}</StatusChip>
                <p className="text-sm text-ink-muted">{t("app.pending")}</p>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal className="max-w-2xl">
          <h2 className="text-headline text-knockout text-balance">{t("start.title")}</h2>
          <p className="mt-6 text-lead text-primary-muted text-pretty">{t("start.body")}</p>
          <ActionLink
            destination={join}
            className={buttonClass({ variant: "inverse", className: "mt-9" })}
          >
            {home("hero.primaryCta")}
          </ActionLink>
        </Reveal>
      </Section>
    </>
  );
}
