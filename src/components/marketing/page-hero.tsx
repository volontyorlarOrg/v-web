import { SplitWords } from "@/components/marketing/scene";
import { Eyebrow } from "@/components/marketing/section";
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
    <section className={cn("border-b border-border", className)}>
      <div className="hero-copy container-page py-14 sm:py-20">
        {eyebrow ? <Eyebrow className="enter-rise">{eyebrow}</Eyebrow> : null}
        <h1 className="page-display enter-words mt-6 max-w-[24ch] [--enter-delay:120ms]">
          <SplitWords text={title} />
        </h1>
        {lead ? (
          <p className="enter-rise mt-7 max-w-[58ch] text-lead text-ink-muted text-pretty [--enter-delay:560ms]">
            {lead}
          </p>
        ) : null}
        {meta && meta.length > 0 ? (
          <dl className="enter-rise mt-9 flex flex-wrap gap-x-12 gap-y-5 [--enter-delay:720ms]">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
