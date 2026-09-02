"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const HOLD_MS = 2600;
const RETIRE_MS = 1000;

const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Turn = { index: number; previous: number; tick: number };

export function RollingWords({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  const gaugeRef = useRef<HTMLSpanElement>(null);
  const [turn, setTurn] = useState<Turn>({ index: 0, previous: -1, tick: 0 });
  const [widths, setWidths] = useState<readonly number[]>();

  useBeforePaint(() => {
    const gauge = gaugeRef.current;
    if (!gauge) return;

    const measure = () => {
      const measured = Array.from(gauge.children, (child) =>
        child.getBoundingClientRect().width,
      );
      setWidths((current) =>
        current?.length === measured.length &&
        current.every((width, index) => width === measured[index])
          ? current
          : measured,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(gauge);
    if (document.fonts?.status !== "loaded") void document.fonts?.ready.then(measure);

    return () => observer.disconnect();
  }, [words]);

  useEffect(() => {
    if (turn.previous < 0) return;

    const timer = window.setTimeout(() => {
      setTurn((current) =>
        current.tick === turn.tick ? { ...current, previous: -1 } : current,
      );
    }, RETIRE_MS);
    return () => window.clearTimeout(timer);
  }, [turn.previous, turn.tick]);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setTurn((current) => ({
        index: (current.index + 1) % words.length,
        previous: current.index,
        tick: current.tick + 1,
      }));
    }, HOLD_MS);
    return () => window.clearInterval(timer);
  }, [words.length]);

  const width = widths?.[turn.index];

  return (
    <span
      aria-hidden="true"
      className={cn("rotating-slot", className)}
      data-ready={width === undefined ? undefined : "true"}
      style={width === undefined ? undefined : { width: `${width}px` }}
    >
      <span ref={gaugeRef} className="rotating-gauge">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </span>
      <span className="rotating-sizer">{words[turn.index]}</span>
      {turn.previous >= 0 ? (
        <Word key={`out-${turn.tick}`} word={words[turn.previous]} direction="out" />
      ) : null}
      <Word key={`in-${turn.tick}`} word={words[turn.index]} direction="in" />
    </span>
  );
}

function Word({ word, direction }: { word: string; direction: "in" | "out" }) {
  return (
    <span className={cn("rotating-word", `rotating-${direction}`)}>
      {[...word].map((character, position) => (
        <span
          key={`${character}-${position}`}
          className="rotating-char"
          style={{ "--char": position } as React.CSSProperties}
        >
          {character}
        </span>
      ))}
    </span>
  );
}
