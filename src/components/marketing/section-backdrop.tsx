import { cn } from "@/lib/utils";

export type BackdropVariant = "sourcing" | "channels" | "study";

const CARDS = [
  { x: "8%", width: 62, duration: "38s", delay: "-7s", tilt: "-4deg", drift: "18px" },
  { x: "46%", width: 78, duration: "45s", delay: "-24s", tilt: "3deg", drift: "-14px" },
  { x: "84%", width: 56, duration: "33s", delay: "-15s", tilt: "-2deg", drift: "12px" },
] as const;

const CHANNELS = [
  { from: "4%", duration: "9s", delay: "-1s" },
  { from: "26%", duration: "11s", delay: "-5s" },
  { from: "72%", duration: "10s", delay: "-3s" },
  { from: "96%", duration: "12s", delay: "-8s" },
] as const;

export function SectionBackdrop({
  variant,
  className,
}: {
  variant: BackdropVariant;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("section-backdrop -z-10", className)}>
      {variant === "sourcing" ? (
        <span className="backdrop-cards">
          {CARDS.map((card) => (
            <EventCard key={card.x} card={card} />
          ))}
        </span>
      ) : null}

      {variant === "channels" ? (
        <span className="backdrop-channels">
          {CHANNELS.map((channel) => (
            <span
              key={channel.from}
              className="backdrop-channel"
              style={
                {
                  "--channel-from": channel.from,
                  "--channel-duration": channel.duration,
                  "--channel-delay": channel.delay,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      ) : null}

      {variant === "study" ? (
        <>
          <span className="backdrop-rules" />
          <span className="backdrop-reading" />
        </>
      ) : null}
    </div>
  );
}

const CARD_ROWS = [
  { y: 34, length: 30 },
  { y: 48, length: 22 },
] as const;

function EventCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <svg
      viewBox="0 0 72 64"
      fill="none"
      style={
        {
          "--card-x": card.x,
          "--card-width": `${card.width}px`,
          "--card-duration": card.duration,
          "--card-delay": card.delay,
          "--card-tilt": card.tilt,
          "--card-drift": card.drift,
        } as React.CSSProperties
      }
    >
      <rect x="1.5" y="1.5" width="69" height="61" rx="6" stroke="currentColor" strokeWidth="2" />
      <line
        x1="1.5"
        y1="18"
        x2="70.5"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
      <circle cx="21" cy="10" r="2.5" fill="currentColor" />
      {CARD_ROWS.map((row) => (
        <line
          key={row.y}
          x1="11"
          y1={row.y}
          x2={11 + row.length}
          y2={row.y}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <path
        className="card-check"
        d="M 44 46 L 51 53 L 63 37"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
