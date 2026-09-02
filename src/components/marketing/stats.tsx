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
    <dl className={cn("grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div key={stat.id} className="border-t border-border pt-5">
          <dd className="tabular display-face text-[clamp(2.5rem,5.5vw,3.5rem)] leading-none tracking-[-0.03em] text-accent">
            {stat.value}
          </dd>
          <dt className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-muted">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
