"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const HOLD_MS = 2600;

type Turn = { index: number; previous: number; tick: number };

export function RollingWords({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [turn, setTurn] = useState<Turn>({ index: 0, previous: -1, tick: 0 });
  const [ready, setReady] = useState(false);
  const [width, setWidth] = useState<number>();

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

  useEffect(() => {
    const sizer = sizerRef.current;
    if (!sizer) return;
    const measure = () => setWidth(sizer.offsetWidth);
    measure();
    const frame = requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [turn.index, words]);

  return (
    <span
      aria-hidden="true"
      className={cn("rotating-slot", className)}
      data-ready={ready ? "true" : undefined}
      style={width === undefined ? undefined : { width: `${width}px` }}
    >
      <span ref={sizerRef} className="rotating-sizer">
        {words[turn.index]}
      </span>
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
          {character === " " ? " " : character}
        </span>
      ))}
    </span>
  );
}
