import Image from "next/image";

import { cn } from "@/lib/utils";

export type MarqueeEntry = {
  id: string;
  name: string;
  logo?: string;
  logoGrey?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export function Marquee({
  entries,
  label,
  reverse = false,
  seconds = 26,
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
    <ul
      className="marquee-track gap-14 py-5 pr-14 sm:gap-20 sm:py-6 sm:pr-20"
      aria-hidden={duplicate || undefined}
    >
      {entries.map((entry) => {
        const defaultLogo = entry.logoGrey ?? entry.logo;
        const colorLogo = entry.logoGrey ? entry.logo : undefined;
        const width = entry.logoWidth ?? 240;
        const height = entry.logoHeight ?? 100;

        return (
          <li
            key={entry.id}
            className="marquee-logo-item relative flex h-11 shrink-0 items-center sm:h-15"
            tabIndex={colorLogo && !duplicate ? 0 : undefined}
          >
            {defaultLogo ? (
              <>
                <Image
                  src={defaultLogo}
                  alt={entry.name}
                  width={width}
                  height={height}
                  className="marquee-logo-grey block h-11 w-auto object-contain sm:h-15"
                />
                {colorLogo ? (
                  <Image
                    src={colorLogo}
                    alt=""
                    aria-hidden="true"
                    width={width}
                    height={height}
                    className="marquee-logo-color absolute inset-0 block h-11 w-auto object-contain sm:h-15"
                  />
                ) : null}
              </>
            ) : (
              <span className="text-sm font-medium whitespace-nowrap text-ink-muted sm:text-base">
                {entry.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
