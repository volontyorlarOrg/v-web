import { Scene } from "@/components/marketing/scene";
import { cn } from "@/lib/utils";

export type BoardEntry = { id: string; name: string; note?: string };

export function NameBoard({
  entries,
  className,
}: {
  entries: readonly BoardEntry[];
  className?: string;
}) {
  return (
    <Scene
      as="ul"
      variant="stagger"
      className={cn("grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex flex-col gap-1 border-t border-border py-5"
        >
          <span className="text-base font-semibold tracking-[-0.01em] text-ink">
            {entry.name}
          </span>
          {entry.note ? (
            <span className="text-sm leading-snug text-ink-muted">{entry.note}</span>
          ) : null}
        </li>
      ))}
    </Scene>
  );
}
