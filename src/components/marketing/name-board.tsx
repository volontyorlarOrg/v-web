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
    <ul
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-5"
        >
          <span className="text-base font-bold tracking-[-0.01em] text-ink">
            {entry.name}
          </span>
          {entry.note ? (
            <span className="text-sm leading-snug text-ink-muted">{entry.note}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
