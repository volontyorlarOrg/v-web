import { cn } from "@/lib/utils";

export type Stat = {
  id: string;
  /** Pre-formatted for the active locale, e.g. "3 600+". */
  value: string;
  label: string;
};

/**
 * Traction figures. Every number here is a supplied fact; the component adds
 * nothing. Values use tabular numerals so the row stays aligned as it wraps.
 */
export function StatGrid({
  stats,
  tone = "primary",
  className,
}: {
  stats: readonly Stat[];
  tone?: "primary" | "inverse";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4",
        tone === "primary"
          ? "border-border bg-border"
          : "border-primary-fg/25 bg-primary-fg/25",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={cn(
            "flex flex-col gap-1 p-5 sm:p-6",
            tone === "primary" ? "bg-surface" : "bg-primary-ink",
          )}
        >
          <dd
            className={cn(
              "tabular text-[clamp(1.875rem,5vw,2.5rem)] leading-none font-bold tracking-[-0.03em]",
              tone === "primary" ? "text-primary" : "text-primary-fg",
            )}
          >
            {stat.value}
          </dd>
          <dt
            className={cn(
              "text-sm leading-snug font-medium",
              tone === "primary" ? "text-ink-muted" : "text-primary-muted",
            )}
          >
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
