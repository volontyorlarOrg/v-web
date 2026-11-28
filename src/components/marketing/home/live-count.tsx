"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/routing";
import { LIVE_COUNT_REFRESH_MS, type JoinerTone } from "@/lib/content/home";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

const TONE: Record<JoinerTone, string> = {
  blue: "bg-blue-25 text-primary-ink",
  orange: "bg-orange-25 text-orange-deep",
  slate: "bg-fog-250 text-fog-800",
  sky: "bg-avatar-sky text-avatar-sky-ink",
  amber: "bg-avatar-amber text-avatar-amber-ink",
  lime: "bg-avatar-lime text-avatar-lime-ink",
};

export function LiveCount({
  initial,
  joiners,
  labels,
  locale,
}: {
  initial: number;
  locale: Locale;
  joiners: ReadonlyArray<{ initials: string; tone: JoinerTone }>;
  labels: { count: string; idle: string; joined: string };
}) {
  const [count, setCount] = useState(initial);
  const [joined, setJoined] = useState(0);
  const latest = useRef(initial);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/home/stats", { cache: "no-store" });
        if (!response.ok) return;
        const body = (await response.json()) as { volunteerTotal?: unknown };
        const next = body.volunteerTotal;
        if (cancelled || typeof next !== "number" || next === latest.current) return;
        if (next > latest.current) setJoined((value) => value + 1);
        latest.current = next;
        setCount(next);
      } catch {
        return;
      }
    };
    const timer = window.setInterval(refresh, LIVE_COUNT_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const shown = [0, 1, 2].map((slot) => joiners[(joined + 2 - slot) % joiners.length]);

  return (
    <div className="mt-[22px] flex items-center gap-4 max-[420px]:items-start">
      <div aria-hidden="true" className="flex pl-2.5">
        {shown.map((joiner, slot) => (
          <span
            key={slot === 0 ? `new-${joined}` : `${joiner.initials}-${slot}`}
            className={cn(
              "-ml-2.5 inline-flex size-[46px] items-center justify-center rounded-full border-[3px] border-navy-850 text-[15px] font-extrabold",
              TONE[joiner.tone],
              slot === 0 && joined > 0 && "joiner-in",
            )}
          >
            {joiner.initials}
          </span>
        ))}
      </div>
      <div aria-live="polite" className="flex flex-col gap-0.5">
        <span className="inline-flex flex-wrap items-baseline gap-x-2 overflow-hidden">
          <strong
            key={count}
            data-testid="live-count"
            className={cn(
              "inline-block text-[26px] font-extrabold tracking-[-0.02em] whitespace-nowrap tabular-nums",
              joined > 0 && "count-in",
            )}
          >
            {formatCount(count, locale)}
          </strong>
          <span className="text-[15px] text-navy-copy">{labels.count}</span>
        </span>
        <span className="inline-flex items-center gap-[7px] text-[13px] text-navy-muted">
          <span aria-hidden="true" className="size-[7px] rounded-full bg-live" />
          {joined > 0 ? labels.joined : labels.idle}
        </span>
      </div>
    </div>
  );
}
