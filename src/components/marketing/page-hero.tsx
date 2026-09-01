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
      <div className="container-page py-14 sm:py-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-5 max-w-[20ch] text-headline font-bold text-balance">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-lead text-ink-muted text-pretty">{lead}</p>
        ) : null}
        {meta && meta.length > 0 ? (
          <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
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
