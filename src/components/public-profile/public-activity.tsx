import type { PublicActivity as PublicActivityEntry } from "@/lib/public-profiles/public-profile.server";

const LEAD = 6;

type Labels = {
  title: string;
  hours: string;
  notCounted: string;
  more: string;
  placements: Record<NonNullable<PublicActivityEntry["placement"]>, string>;
};

function ActivityList({
  entries,
  locale,
  labels,
}: {
  entries: readonly PublicActivityEntry[];
  locale: string;
  labels: Labels;
}) {
  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const number = new Intl.NumberFormat(locale);

  return (
    <ul className="divide-y divide-border">
      {entries.map((entry) => {
        const credited =
          entry.source === "attendance" || entry.countsTowardProgress;
        const facts = [
          entry.kind === "competition" && entry.placement
            ? labels.placements[entry.placement]
            : null,
          entry.hours === null
            ? null
            : `${number.format(entry.hours)} ${labels.hours}`,
          credited && entry.xpAwarded > 0
            ? `+${number.format(entry.xpAwarded)} XP`
            : null,
        ].filter((fact): fact is string => fact !== null);

        return (
          <li
            key={`${entry.source}-${entry.id}`}
            className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold [overflow-wrap:anywhere] text-ink">
                {entry.title}
              </p>
              <p className="text-sm text-ink-muted">
                {entry.organization} ·{" "}
                <time dateTime={entry.eventDate}>
                  {date.format(new Date(`${entry.eventDate}T00:00:00Z`))}
                </time>
                {credited ? null : ` · ${labels.notCounted}`}
              </p>
            </div>
            {facts.length > 0 ? (
              <p className="tabular text-sm text-ink">{facts.join(" · ")}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function PublicActivity({
  entries,
  locale,
  labels,
}: {
  entries: readonly PublicActivityEntry[];
  locale: string;
  labels: Labels;
}) {
  if (entries.length === 0) return null;
  const lead = entries.slice(0, LEAD);
  const rest = entries.slice(LEAD);

  return (
    <section
      aria-labelledby="public-activity"
      className="border-t border-border px-6 py-7 sm:px-10"
    >
      <h2 id="public-activity" className="text-section text-ink">
        {labels.title}
      </h2>
      <div className="mt-1">
        <ActivityList entries={lead} locale={locale} labels={labels} />
        {rest.length > 0 ? (
          <details className="group border-t border-border">
            <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-primary-ink underline-offset-4 group-open:hidden hover:underline">
              {labels.more}
            </summary>
            <ActivityList entries={rest} locale={locale} labels={labels} />
          </details>
        ) : null}
      </div>
    </section>
  );
}
