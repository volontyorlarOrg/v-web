import { ExternalLink, Languages, MapPin } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import type { PublicProfile } from "@/lib/public-profiles/public-profile.server";

export function PublicProfileCard({
  profile,
  locale,
  labels,
}: {
  profile: PublicProfile;
  locale: Locale;
  labels: {
    level: string;
    events: string;
    hours: string;
    xp: string;
    region: string | null;
    openLink: string;
  };
}) {
  const format = new Intl.NumberFormat(locale);
  const languageNames = new Intl.DisplayNames([locale], { type: "language" });
  const languages = profile.languages
    .map((language) => languageLabel(languageNames, language))
    .join(", ");

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_18px_48px_-36px_var(--color-ink-muted)]">
      <div aria-hidden="true" className="h-28 bg-band sm:h-36" />
      <div className="-mt-12 px-5 sm:-mt-14 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-soft text-2xl font-bold text-primary-ink ring-4 ring-surface sm:size-28 sm:text-3xl">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt=""
                width={224}
                height={224}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              initials(profile.displayName)
            )}
          </div>
          <div className="min-w-0 pb-1">
            <h1 className="text-3xl tracking-[-0.025em] text-balance sm:text-5xl">
              {profile.displayName}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-ink">
                @{profile.username}
              </span>
              <Badge>{labels.level}</Badge>
            </div>
          </div>
        </div>
      </div>

      <dl className="mt-7 grid grid-cols-3 border-y border-border bg-surface-sunk/70 px-5 py-5 sm:px-8">
        <ProfileStat
          label={labels.events}
          value={format.format(profile.stats.attendedEvents)}
        />
        <ProfileStat
          label={labels.hours}
          value={format.format(profile.stats.confirmedHours)}
        />
        <ProfileStat label={labels.xp} value={format.format(profile.xp)} />
      </dl>

      <div className="flex flex-col gap-6 px-5 py-7 sm:px-8 sm:py-8">
        {profile.bio.trim() ? (
          <p className="max-w-[70ch] text-base leading-relaxed text-pretty text-ink sm:text-lg">
            {profile.bio}
          </p>
        ) : null}

        {labels.region || languages ? (
          <ul className="flex flex-col gap-3 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-7">
            {labels.region ? (
              <li className="flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                {labels.region}
              </li>
            ) : null}
            {languages ? (
              <li className="flex items-center gap-2">
                <Languages
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
                {languages}
              </li>
            ) : null}
          </ul>
        ) : null}

        {profile.links.length > 0 ? (
          <ul className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {profile.links.map((href) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`${linkLabel(href)} — ${labels.openLink}`}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 text-sm font-semibold text-primary-ink underline-offset-4 hover:underline"
                >
                  <ExternalLink
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                  <span className="truncate">{linkLabel(href)}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 border-l border-border px-3 first:border-l-0 first:pl-0 last:pr-0 sm:px-6">
      <dt className="row-start-2 mt-1 text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
        {label}
      </dt>
      <dd className="display-face tabular row-start-1 text-2xl leading-none text-accent-ink sm:text-3xl">
        {value}
      </dd>
    </div>
  );
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function linkLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function languageLabel(names: Intl.DisplayNames, language: string) {
  try {
    return names.of(language) ?? language;
  } catch {
    return language;
  }
}
