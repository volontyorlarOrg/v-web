import { Scene } from "@/components/marketing/scene";

export type RailItem = {
  id: string;
  title: string;
  description?: string;
};

export function NumberedRail({
  items,
  className,
}: {
  items: readonly RailItem[];
  className?: string;
}) {
  return (
    <Scene as="ol" variant="stagger" className={className}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className="relative grid grid-cols-[2.75rem_1fr] gap-x-4 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6"
        >
          <span
            aria-hidden="true"
            className="scene-rule absolute inset-x-0 top-0 h-px bg-border-control/70"
          />
          <p className="tabular pt-1 text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="text-title font-semibold text-balance">{item.title}</h3>
            {item.description ? (
              <p className="mt-2 leading-relaxed text-ink-muted text-pretty">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </Scene>
  );
}
