import { cn } from "@/lib/utils";

export type Stat = {
  id: string;
  value: string;
  label: string;
};

export function StatGrid({
  stats,
  className,
}: {
  stats: readonly Stat[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-col gap-1 bg-surface p-5 sm:p-6">
          <dd className="tabular text-[clamp(1.875rem,5vw,2.5rem)] leading-none font-bold tracking-[-0.03em] text-accent">
            {stat.value}
          </dd>
          <dt className="text-sm leading-snug font-medium text-ink-muted">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
