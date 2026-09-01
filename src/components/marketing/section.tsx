import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "paper" | "sunk" | "soft" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sunk: "bg-surface-sunk text-ink",
  soft: "bg-surface-soft text-ink",
  ink: "bg-primary-ink text-primary-fg",
};

/**
 * One vertical rhythm for the whole site: 80px on mobile, 112px from the small
 * breakpoint. Tone changes carry the section boundary instead of decorative
 * dividers.
 */
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
        "scroll-mt-20 border-b border-border py-20 sm:py-28",
        toneClass[tone],
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * Small uppercase label preceded by a short rule. The logo itself is not used
 * here: its documented minimum size is 16px, which a label-height mark would
 * break.
 */
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
        "flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase",
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
        "max-w-3xl",
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
          "mt-4 text-headline font-bold text-balance",
          tone === "inverse" && "text-primary-fg",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-lead text-pretty",
            tone === "primary" ? "text-ink-muted" : "text-primary-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Marks material that is planned rather than live. Meaning is carried by the
 * text, not by colour alone.
 */
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
        "inline-flex items-center rounded-sm border border-dashed border-border-control px-2 py-1 text-[0.6875rem] font-bold tracking-[0.1em] text-ink-muted uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
