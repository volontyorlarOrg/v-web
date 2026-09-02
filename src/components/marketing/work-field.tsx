import { Scene } from "@/components/marketing/scene";
import { cn } from "@/lib/utils";

export type WorkFieldItem = {
  id: string;
  title: string;
  description: string;
};

export function WorkField({
  items,
  className,
}: {
  items: readonly WorkFieldItem[];
  className?: string;
}) {
  return (
    <Scene variant="stagger" className={cn("work-field", className)} role="list">
      <svg
        aria-hidden="true"
        className="work-field-route"
        viewBox="0 0 4 100"
        preserveAspectRatio="none"
      >
        <path className="work-field-route-base" d="M2 0V100" />
        <path className="work-field-route-flow" d="M2 0V100" pathLength="100" />
      </svg>

      {items.map((item) => (
        <article key={item.id} className="work-field-item" role="listitem">
          <span aria-hidden="true" className="work-field-node" />
          <h3 className="text-title font-semibold text-balance">{item.title}</h3>
          <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-muted text-pretty">
            {item.description}
          </p>
        </article>
      ))}
    </Scene>
  );
}
