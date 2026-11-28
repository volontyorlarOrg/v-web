import { SplitWords } from "@/components/marketing/scene";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  meta?: ReadonlyArray<{ label: string; value: string }>;
  className?: string;
}) {
  return (
    <section className={cn("navy-ground focus-orange relative overflow-hidden text-knockout", className)}>
      <div aria-hidden="true" className="dot-grid absolute inset-0" />
      <div className="hero-copy relative mx-auto max-w-[1240px] px-5 pt-14 pb-24 sm:px-8 sm:pt-20 sm:pb-28">
        {eyebrow ? (
          <p className="enter-rise m-0 text-sm font-bold tracking-[0.14em] text-blue-400 uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="page-display enter-words mt-6 max-w-[20ch] [--enter-delay:120ms]">
          <SplitWords text={title} />
        </h1>
        {lead ? (
          <p className="enter-rise mt-7 max-w-[58ch] text-[19px] leading-[1.5] text-navy-copy text-pretty [--enter-delay:560ms] sm:text-[21px]">
            {lead}
          </p>
        ) : null}
        {meta && meta.length > 0 ? (
          <dl className="enter-rise mt-9 flex flex-wrap gap-x-12 gap-y-5 [--enter-delay:720ms]">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold tracking-[0.14em] text-navy-muted uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      <div aria-hidden="true" className="lenta-h absolute inset-x-0 bottom-0 h-[34px]" />
    </section>
  );
}
