import type { PublicPastEvent } from "@/lib/public-profiles/public-profile.server";

export function PublicPastEvents({
  events,
  locale,
  labels,
}: {
  events: readonly PublicPastEvent[];
  locale: string;
  labels: {
    title: string;
    hours: string;
    adminAdded: string;
    counted: string;
    notCounted: string;
  };
}) {
  if (events.length === 0) return null;
  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const number = new Intl.NumberFormat(locale);

  return (
    <section
      aria-labelledby="public-past-events"
      className="border-t border-border px-6 py-7 sm:px-10"
    >
      <h2 id="public-past-events" className="text-section text-ink">
        {labels.title}
      </h2>
      <ul className="mt-4 divide-y divide-border">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink">{event.title}</p>
              <p className="text-sm text-ink-muted">
                {event.organization} ·{" "}
                <time dateTime={event.eventDate}>
                  {date.format(new Date(`${event.eventDate}T00:00:00Z`))}
                </time>
              </p>
            </div>
            <p className="tabular text-sm text-ink">
              {number.format(event.hours)} {labels.hours}
              {event.countsTowardProgress
                ? ` · +${number.format(event.xpAwarded)} XP`
                : ""}
            </p>
            <p className="w-full text-xs text-ink-muted">
              {labels.adminAdded} ·{" "}
              {event.countsTowardProgress ? labels.counted : labels.notCounted}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
