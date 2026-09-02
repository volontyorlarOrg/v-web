import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "paper" | "sunk" | "soft" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sunk: "bg-surface-sunk text-ink",
  soft: "bg-surface-soft text-ink",
  ink: "bg-primary-ink text-knockout",
};

export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate scroll-mt-20 border-b border-border py-24 sm:py-28 lg:py-32",
        toneClass[tone],
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "inverse";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase",
        tone === "primary" ? "text-primary-ink" : "text-primary-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6",
          tone === "primary" ? "bg-primary" : "bg-primary-muted",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "primary",
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "primary" | "inverse";
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className={cn(align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-headline text-balance",
          tone === "inverse" && "text-knockout",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-6 text-lead text-pretty",
            tone === "primary" ? "text-ink-muted" : "text-primary-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function StatusChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-border-control px-3 py-1.5 text-xs font-semibold tracking-[0.1em] text-ink-muted uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
