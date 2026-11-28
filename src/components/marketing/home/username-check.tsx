"use client";

import { useEffect, useRef, useState } from "react";

import { GlyphMark } from "@/components/marketing/home/marks";
import { checkUsername, normaliseUsername, USERNAME_MAX_LENGTH, type UsernameCheck } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 300;

const TONE: Record<UsernameCheck, { ring: string; text: string; dot: string }> = {
  empty: { ring: "shadow-[inset_0_0_0_1.5px_var(--color-fog-200)]", text: "text-fog-500", dot: "bg-fog-500" },
  short: { ring: "shadow-[inset_0_0_0_1.5px_var(--color-orange-600)]", text: "text-orange-ink", dot: "bg-orange-ink" },
  invalid: { ring: "shadow-[inset_0_0_0_1.5px_var(--color-orange-600)]", text: "text-orange-ink", dot: "bg-orange-ink" },
  ok: { ring: "shadow-[inset_0_0_0_1.5px_var(--color-success-ring)]", text: "text-success", dot: "bg-success" },
};

export function UsernameCheckForm({
  signupHref,
  labels,
}: {
  signupHref: string;
  labels: {
    sampleName: string;
    role: string;
    pick: string;
    input: string;
    placeholder: string;
    check: string;
    states: Record<UsernameCheck, string>;
  };
}) {
  const [typed, setTyped] = useState("");
  const [settled, setSettled] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const early = inputRef.current?.value ?? "";
    if (early) setTyped(normaliseUsername(early));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(typed), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [typed]);

  const state = checkUsername(settled);
  const tone = TONE[state];
  const message = labels.states[state].replace("{username}", settled);

  return (
    <>
      <div className="flex items-center gap-[18px]">
        <span
          aria-hidden="true"
          className="flex size-[88px] flex-none items-center justify-center rounded-full bg-navy-600 shadow-[0_0_0_3px_var(--color-knockout),0_0_0_5px_var(--color-orange-600)]"
        >
          <GlyphMark className="h-[46px] w-[52px] text-knockout" />
        </span>
        <div className="min-w-0">
          <p className="m-0 text-[28px] leading-[1.1] font-extrabold tracking-[-0.03em]">{labels.sampleName}</p>
          <p className="mt-2 mb-0 flex items-center gap-2.5 text-[15px] text-fog-600">
            <span className="truncate">@{settled || labels.placeholder}</span>
            <span className="inline-flex h-[26px] flex-none items-center rounded-full px-2.5 text-[13px] font-bold text-orange-ink shadow-[inset_0_0_0_1px_var(--color-orange-600)]">
              {labels.role}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-7 mb-0 text-[15px] font-bold">{labels.pick}</p>
      <label
        className={cn(
          "relative mt-2.5 flex h-14 cursor-text items-center rounded-[14px] bg-fog-50 pr-1.5 pl-4 transition-shadow focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600",
          tone.ring,
        )}
      >
        <span className="sr-only">{labels.input}</span>
        <span aria-hidden="true" className="text-base font-semibold text-fog-600">
          volontyorlar.uz/
        </span>
        <input
          ref={inputRef}
          value={typed}
          onChange={(event) => setTyped(normaliseUsername(event.target.value))}
          placeholder={labels.placeholder}
          maxLength={USERNAME_MAX_LENGTH}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-describedby="portfolio-username-status"
          className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-base font-bold text-blue-600 outline-none placeholder:font-semibold placeholder:text-fog-placeholder"
        />
        <a
          href={signupHref}
          className="inline-flex h-11 flex-none items-center rounded-[10px] bg-orange-600 px-[18px] text-[15px] font-bold text-knockout transition-colors hover:bg-orange-700"
        >
          {labels.check}
        </a>
      </label>
      <p
        id="portfolio-username-status"
        aria-live="polite"
        className={cn("mt-2.5 mb-0 flex min-h-[22px] items-center gap-2 text-sm font-semibold", tone.text)}
      >
        <span aria-hidden="true" className={cn("size-2 flex-none rounded-full", tone.dot)} />
        {message}
      </p>
    </>
  );
}
