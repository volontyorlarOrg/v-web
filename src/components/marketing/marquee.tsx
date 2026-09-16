import { cn } from "@/lib/utils";

export type MarqueeEntry = { id: string; name: string; note?: string };

export function Marquee({
  entries,
  label,
  reverse = false,
  seconds = 46,
  className,
}: {
  entries: readonly MarqueeEntry[];
  label: string;
  reverse?: boolean;
  seconds?: number;
  className?: string;
}) {
  if (entries.length === 0) return null;

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("marquee", reverse && "marquee-reverse", className)}
      style={{ "--marquee-duration": `${seconds}s` } as React.CSSProperties}
    >
      <MarqueeTrack entries={entries} />
      <MarqueeTrack entries={entries} duplicate />
    </div>
  );
}

function MarqueeTrack({
  entries,
  duplicate = false,
}: {
  entries: readonly MarqueeEntry[];
  duplicate?: boolean;
}) {
  return (
    <ul className="marquee-track" aria-hidden={duplicate || undefined}>
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex shrink-0 flex-col justify-center gap-1 border-l border-border py-4 pr-10 pl-6 sm:pr-14 sm:pl-8"
        >
          <span className="text-base font-semibold tracking-[-0.01em] whitespace-nowrap text-ink sm:text-lg">
            {entry.name}
          </span>
          {entry.note ? (
            <span className="text-sm leading-snug whitespace-nowrap text-ink-muted">
              {entry.note}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
