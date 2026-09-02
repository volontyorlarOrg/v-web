"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

const DURATION_MS = 1900;
const START_THRESHOLD = 0.35;

const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -9 * t));

export function CountUp({
  to,
  from = 1,
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const locale = useLocale();
  const [value, setValue] = useState(to);

  useBeforePaint(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = node.getBoundingClientRect();
    if (box.bottom <= 0) return;

    setValue(from);

    let frame = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (startedAt === 0) startedAt = now;
      const elapsed = Math.min(1, (now - startedAt) / DURATION_MS);
      setValue(Math.round(from + (to - from) * easeOutExpo(elapsed)));
      if (elapsed < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: START_THRESHOLD },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [from, to]);

  const format = (amount: number) => new Intl.NumberFormat(locale).format(amount);

  return (
    <span ref={ref} className={cn("tabular inline-grid", className)}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {format(to)}
        {suffix}
      </span>
      <span className="col-start-1 row-start-1">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
