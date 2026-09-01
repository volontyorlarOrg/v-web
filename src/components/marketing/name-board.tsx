import { cn } from "@/lib/utils";

export type BoardEntry = { id: string; name: string; note?: string };

/**
 * A plain board of organisation names. No logos are shown: this repository
 * holds no partner artwork and no permission to reproduce any.
 */
export function NameBoard({
  entries,
  className,
}: {
  entries: readonly BoardEntry[];
  className?: string;
}) {
  return (
    <ul
      // Gapped cards rather than a hairline grid: these lists have an odd
      // number of entries, and an empty cell in a gap-filled grid reads as a
      // rendering fault.
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
