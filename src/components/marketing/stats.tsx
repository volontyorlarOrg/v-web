import { CountUp } from "@/components/marketing/count-up";
import { Scene } from "@/components/marketing/scene";
import { cn } from "@/lib/utils";

export type Stat = {
  id: string;
  amount: number;
  suffix?: string;
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
    <Scene
      as="dl"
      variant="stagger"
      className={cn("grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      {stats.map((stat) => (
        <div key={stat.id} className="relative pt-8">
          <span
            aria-hidden="true"
            className="scene-rule absolute inset-x-0 top-0 h-px bg-primary"
          />
          <dd className="display-face text-[clamp(3rem,7.5vw,5.25rem)] leading-[0.92] tracking-[-0.04em] text-knockout">
            <CountUp to={stat.amount} suffix={stat.suffix} />
          </dd>
          <dt className="mt-5 max-w-[20ch] text-sm leading-snug text-band-copy">
            {stat.label}
          </dt>
        </div>
      ))}
    </Scene>
  );
}
