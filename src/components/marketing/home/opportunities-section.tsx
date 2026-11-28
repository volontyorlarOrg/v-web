import { useTranslations } from "next-intl";

import { ActionLink } from "@/components/marketing/action-link";
import { OpportunityBoard, type BoardCard } from "@/components/marketing/home/opportunity-board";
import type { Locale } from "@/i18n/routing";
import { opportunityListDestination, type Destination } from "@/lib/content/cta";
import { SAMPLE_OPPORTUNITIES, type SampleOpportunity } from "@/lib/content/home";
import { localePath, navHref } from "@/lib/routing/routes";
import { appHref, marketingUrl } from "@/lib/seo/origin";

export function opportunitiesDestination(locale: Locale): Destination {
  return (
    opportunityListDestination(locale) ?? {
      href: navHref("opportunities"),
      external: false,
      newTab: false,
    }
  );
}

const GHOST_TINTS = ["bg-tint-blue", "bg-tint-violet", "bg-tint-sand"] as const;

function dateLabel(item: SampleOpportunity, locale: Locale) {
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "Asia/Tashkent" });
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Tashkent",
  });
  const start = new Date(item.startsAt);
  const end = new Date(item.endsAt);
  const sameDay = day.format(start) === day.format(end);
  return sameDay ? `${day.format(start)}, ${time.format(start)}` : day.formatRange(start, end);
}

export function OpportunityList({ locale, limit = 3 }: { locale: Locale; limit?: number }) {
  const t = useTranslations("home.opportunities");
  const list = opportunitiesDestination(locale);
  const listHref = list.external ? list.href : localePath(locale, "opportunities");

  const cards: BoardCard[] = SAMPLE_OPPORTUNITIES.map((item) => ({
    slug: item.slug,
    title: item.title,
    organizer: item.organizer,
    kind: item.kind,
    kindLabel: t(`filters.${item.kind}`),
    hoursLabel: item.hours === null ? null : t("hours", { count: item.hours }),
    xpLabel:
      item.xp.min === item.xp.max
        ? t("xp", { value: item.xp.max })
        : t("xpRange", { min: item.xp.min, max: item.xp.max }),
    dateLabel: dateLabel(item, locale),
    place: item.place,
    applicationsLabel: t("applications", { count: item.applications }),
    cover: item.cover,
    tint: item.tint,
    applyHref: listHref,
    shareUrl: appHref(`/opportunities/${item.slug}`) ?? marketingUrl(`/${locale}`),
  }));

  return (
    <OpportunityBoard
      limit={limit}
      cards={cards}
      labels={{
        filter: t("filterLabel"),
        filters: {
          all: t("filters.all"),
          volunteering: t("filters.volunteering"),
          competition: t("filters.competition"),
        },
        apply: t("apply"),
        share: t("share"),
        copied: t("copied"),
      }}
    />
  );
}

export function OpportunitiesSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home.opportunities");
  const list = opportunitiesDestination(locale);

  return (
    <section
      id="imkoniyatlar"
      aria-labelledby="opportunities-title"
      className="scroll-mt-4 bg-fog-50 px-5 pt-[72px] pb-20 text-navy-900 min-[981px]:px-[132px] min-[981px]:pt-28 min-[981px]:pb-[104px]"
    >
      <div className="mx-auto max-w-[1176px]">
        <h2 id="opportunities-title" className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] min-[981px]:text-[56px]">
          {t("title")}
        </h2>
        <p className="mt-4 mb-0 text-[19px] leading-[1.5] text-fog-600">{t("lead")}</p>

        <OpportunityList locale={locale} />

        <div className="relative mt-6">
          <div
            aria-hidden="true"
            className="op-more pointer-events-none grid h-[250px] grid-cols-3 gap-6 overflow-hidden max-[980px]:grid-cols-1"
          >
            {GHOST_TINTS.map((tint, index) => (
              <div
                key={tint}
                className={`op-card overflow-hidden rounded-[20px] border border-fog-200 bg-knockout ${index > 0 ? "max-[980px]:hidden" : ""}`}
              >
                <div className={`aspect-video ${tint}`} />
                <div className="px-6 py-[22px]">
                  <div className="h-3 w-2/5 rounded-md bg-fog-200" />
                  <div className="mt-3.5 h-[18px] w-[85%] rounded-md bg-fog-150" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <ActionLink
              destination={list}
              className="inline-flex h-[52px] items-center rounded-xl border-[1.5px] border-navy-900 bg-fog-50 px-7 text-base font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-knockout"
            >
              {t("all")}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
