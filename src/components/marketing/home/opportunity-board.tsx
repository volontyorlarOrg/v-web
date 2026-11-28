"use client";

import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ShareButton } from "@/components/marketing/home/share-button";
import type { OpportunityKind } from "@/lib/content/home";
import { cn } from "@/lib/utils";

export type BoardCard = {
  slug: string;
  title: string;
  organizer: string;
  kind: OpportunityKind;
  kindLabel: string;
  hoursLabel: string | null;
  xpLabel: string;
  dateLabel: string;
  place: string;
  applicationsLabel: string;
  cover: { src: string; width: number; height: number };
  tint: "blue" | "violet" | "sand";
  applyHref: string;
  shareUrl: string;
};

type Filter = "all" | OpportunityKind;

const TINT = {
  blue: "bg-tint-blue",
  violet: "bg-tint-violet",
  sand: "bg-tint-sand",
} as const;

export function OpportunityBoard({
  cards,
  labels,
  limit = 3,
}: {
  cards: readonly BoardCard[];
  limit?: number;
  labels: {
    filter: string;
    filters: Record<Filter, string>;
    apply: string;
    share: string;
    copied: string;
  };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = cards.filter((card) => filter === "all" || card.kind === filter).slice(0, limit);

  return (
    <>
      <div className="mt-10 flex items-center justify-between gap-5 max-[980px]:flex-col max-[980px]:items-start">
        <div
          role="group"
          aria-label={labels.filter}
          className="inline-flex rounded-[14px] border border-fog-200 bg-knockout p-1"
        >
          {(["all", "volunteering", "competition"] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className="h-11 rounded-[10px] px-[18px] text-[15px] font-bold text-fog-600 transition-colors hover:text-navy-900 aria-pressed:bg-navy-900 aria-pressed:text-knockout"
            >
              {labels.filters[id]}
            </button>
          ))}
        </div>
      </div>

      <ul role="list" className="mt-7 grid grid-cols-3 gap-6 max-[980px]:grid-cols-1">
        {shown.map((card) => (
          <li key={card.slug} className="op-card op-card-live flex flex-col overflow-hidden rounded-[20px] border border-fog-200 bg-knockout">
            <article className="flex flex-1 flex-col">
              <div className={cn("relative aspect-video overflow-hidden", TINT[card.tint])}>
                <Image
                  src={card.cover.src}
                  alt=""
                  width={card.cover.width}
                  height={card.cover.height}
                  unoptimized
                  className="size-full object-cover"
                />
                <span
                  className={cn(
                    "absolute top-3.5 left-3.5 inline-flex h-7 items-center rounded-full px-3 text-[13px] font-bold text-knockout",
                    card.kind === "volunteering" ? "bg-blue-600" : "bg-navy-900",
                  )}
                >
                  {card.kindLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="m-0 truncate text-sm font-semibold text-fog-500">{card.organizer}</p>
                  <div className="flex flex-none gap-1.5">
                    {card.hoursLabel ? (
                      <span className="inline-flex h-7 items-center rounded-lg bg-orange-50 px-2.5 text-[13px] font-extrabold text-orange-ink">
                        {card.hoursLabel}
                      </span>
                    ) : null}
                    <span className="inline-flex h-7 items-center rounded-lg bg-blue-50 px-2.5 text-[13px] font-extrabold text-blue-ink">
                      {card.xpLabel}
                    </span>
                  </div>
                </div>
                <h3 className="mt-2.5 mb-0 line-clamp-2 text-[21px] leading-[1.25] font-bold tracking-[-0.02em] text-navy-900">
                  {card.title}
                </h3>
                <ul className="mt-4 grid gap-2 text-[15px] text-fog-700">
                  <li className="flex items-start gap-2.5">
                    <CalendarDays aria-hidden="true" className="mt-0.5 size-[17px] flex-none text-blue-600" strokeWidth={2} />
                    {card.dateLabel}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin aria-hidden="true" className="mt-0.5 size-[17px] flex-none text-blue-600" strokeWidth={2} />
                    {card.place}
                  </li>
                </ul>
                <div className="mt-auto flex items-center gap-2.5 pt-5">
                  <span aria-hidden="true" className="flex">
                    <span className="size-[26px] rounded-full bg-fog-150 shadow-[0_0_0_2px_var(--color-knockout)]" />
                    <span className="-ml-2 size-[26px] rounded-full bg-fog-350 shadow-[0_0_0_2px_var(--color-knockout)]" />
                    <span className="-ml-2 size-[26px] rounded-full bg-fog-400 shadow-[0_0_0_2px_var(--color-knockout)]" />
                  </span>
                  <span className="text-sm font-semibold text-fog-700">{card.applicationsLabel}</span>
                </div>
                <div className="mt-4 flex gap-2.5">
                  <a
                    href={card.applyHref}
                    className="flex h-[50px] flex-1 items-center justify-center rounded-xl bg-orange-600 text-base font-bold text-knockout transition-colors hover:bg-orange-700"
                  >
                    {labels.apply}
                  </a>
                  <ShareButton url={card.shareUrl} title={card.title} labels={{ share: labels.share, copied: labels.copied }} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
