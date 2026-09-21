import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Children, type CSSProperties, type ReactNode } from "react";

import { SplitWords } from "@/components/marketing/scene";
import { RollingNumber } from "@/components/public-profile/rolling-number";
import { Badge } from "@/components/ui/badge";

const LONG_WORD = 13;

export type PublicProfileRow = {
  id: string;
  label: string;
  value: ReactNode;
};

export type PublicProfileFigure = {
  id: string;
  content: ReactNode;
};

export function PublicProfileSheet({
  name,
  username,
  avatarUrl,
  level,
  bio,
  figures,
  rows,
  figuresLabel,
}: {
  name: string;
  username: string;
  avatarUrl: string | null;
  level: string;
  bio: string;
  figures: readonly PublicProfileFigure[];
  rows: readonly PublicProfileRow[];
  figuresLabel: string;
}) {
  const longName = name.split(/\s+/).some((word) => word.length > LONG_WORD);

  return (
    <article
      aria-labelledby="profile-name"
      className="profile-sheet mx-auto w-full max-w-[40rem] overflow-clip rounded-2xl border border-border bg-surface"
    >
      <header className="px-6 pt-7 sm:px-10 sm:pt-10">
        <div
          aria-hidden="true"
          className="profile-avatar grid size-24 place-items-center overflow-hidden rounded-full bg-surface-soft font-serif text-4xl tracking-[-0.02em] text-primary-ink sm:size-28"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              width={224}
              height={224}
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="size-full object-cover"
            />
          ) : (
            initials(name)
          )}
        </div>

        <h1
          id="profile-name"
          data-long={longName || undefined}
          className="profile-name enter-words mt-7 [--enter-delay:60ms]"
        >
          <SplitWords text={name} />
        </h1>

        <p className="enter-rise mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 [--enter-delay:220ms]">
          <span className="min-w-0 text-sm font-semibold [overflow-wrap:anywhere] text-ink">
            @{username}
          </span>
          <Badge variant="achievement">{level}</Badge>
        </p>

        {bio ? (
          <p className="profile-bio enter-rise mt-6 [--enter-delay:300ms]">
            {bio}
          </p>
        ) : null}

        {figures.length > 0 ? (
          <ul aria-label={figuresLabel} className="profile-figures mt-6">
            {figures.map((figure, index) => (
              <li
                key={figure.id}
                className="enter-rise"
                style={
                  { "--enter-delay": `${380 + index * 90}ms` } as CSSProperties
                }
              >
                {figure.content}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {rows.length > 0 ? (
        <dl className="profile-rows mt-8">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="profile-row"
              style={{ "--row": index } as CSSProperties}
            >
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="pb-7 sm:pb-10" />
      )}
    </article>
  );
}

export function PublicProfileNumber({ chunks }: { chunks: ReactNode }) {
  const value = Children.toArray(chunks)
    .filter((chunk) => typeof chunk === "string" || typeof chunk === "number")
    .join("");

  return <RollingNumber value={value} className="profile-figure-number" />;
}

export function PublicProfileLinks({
  links,
  openLabel,
}: {
  links: readonly string[];
  openLabel: string;
}) {
  return (
    <ul className="flex min-w-0 flex-col gap-1">
      {links.map((href) => (
        <li key={href} className="min-w-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={`${linkLabel(href)} — ${openLabel}`}
            className="profile-link inline-flex max-w-full items-center gap-1.5 font-semibold text-primary-ink underline-offset-4 hover:underline"
          >
            <span className="truncate">{linkLabel(href)}</span>
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </a>
        </li>
      ))}
    </ul>
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
    const url = new URL(href);
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
    return `${url.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return href;
  }
}
