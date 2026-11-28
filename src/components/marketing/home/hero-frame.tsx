"use client";

import { useEffect, useRef, type ReactNode } from "react";

const EASE = 0.12;
const BADGE_OFFSET_X = 140 + 166;
const BADGE_CENTRE_Y = 526;
const WIDE = 981;

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

export function HeroFrame({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX: number | null = null;
    let currentY = 0;
    let width = 0;
    let frame = 0;

    const paint = (x: number, y: number) => {
      section.style.setProperty("--hx", `${Math.round(x)}px`);
      section.style.setProperty("--hy", `${Math.round(y)}px`);
      if (width < WIDE) return;
      const dx = clamp((x - (width / 2 + BADGE_OFFSET_X)) / 520);
      const dy = clamp((y - BADGE_CENTRE_Y) / 420);
      section.style.setProperty("--tilt-y", `${(dx * 9).toFixed(2)}deg`);
      section.style.setProperty("--tilt-x", `${(-dy * 7).toFixed(2)}deg`);
      section.style.setProperty("--gx", `${Math.round(50 + dx * 60)}%`);
      section.style.setProperty("--gy", `${Math.round(40 + dy * 50)}%`);
    };

    const step = () => {
      const fromX = currentX ?? targetX;
      const fromY = currentX === null ? targetY : currentY;
      currentX = fromX + (targetX - fromX) * EASE;
      currentY = fromY + (targetY - fromY) * EASE;
      paint(currentX, currentY);
      frame =
        Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5
          ? requestAnimationFrame(step)
          : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = section.getBoundingClientRect();
      width = box.width;
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(step);
    };

    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}
