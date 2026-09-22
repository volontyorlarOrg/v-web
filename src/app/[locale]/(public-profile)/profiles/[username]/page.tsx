import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import {
  PublicProfileLinks,
  PublicProfileNumber,
  PublicProfileSheet,
  type PublicProfileFigure,
  type PublicProfileRow,
  type PublicProfileSocialLink,
} from "@/components/public-profile/public-profile-sheet";
import {
  getPublicProfile,
  PublicProfileLoadError,
  type PublicProfile,
} from "@/lib/public-profiles/public-profile.server";
import { marketingUrl } from "@/lib/seo/origin";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/profiles/[username]">): Promise<Metadata> {
  const { locale, username } = await params;
  const t = await getTranslations({ locale, namespace: "publicProfile" });
  let name = username;
  try {
    name = (await getPublicProfile(username))?.displayName ?? username;
  } catch {}
  return {
    title: t("metaTitle", { name }),
    description: t("metaDescription", { name }),
    alternates: { canonical: marketingUrl(`/${username}`) },
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function PublicProfilePage({
  params,
}: PageProps<"/[locale]/profiles/[username]">) {
  const { locale, username } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "publicProfile" });
  let profile: PublicProfile | null;
  try {
    profile = await getPublicProfile(username);
  } catch (error) {
    if (!(error instanceof PublicProfileLoadError)) throw error;
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-14 text-center">
        <div className="max-w-lg">
          <h1 className="text-headline text-balance">
            {t("unavailable.title")}
          </h1>
          <p className="mt-4 text-lead text-pretty text-ink-muted">
            {t("unavailable.body")}
          </p>
        </div>
      </section>
    );
  }
  if (!profile) notFound();

  const format = new Intl.NumberFormat(locale);
  const number = (chunks: ReactNode) => <PublicProfileNumber chunks={chunks} />;
  const { attendedEvents, confirmedHours } = profile.stats;

  const figures: PublicProfileFigure[] =
    attendedEvents + confirmedHours + profile.xp > 0
      ? [
          {
            id: "events",
            content: t.rich("events", {
              count: attendedEvents,
              value: format.format(attendedEvents),
              n: number,
            }),
          },
          {
            id: "hours",
            content: t.rich("hours", {
              count: confirmedHours,
              value: format.format(confirmedHours),
              n: number,
            }),
          },
          {
            id: "xp",
            content: t.rich("xp", {
              value: format.format(profile.xp),
              n: number,
            }),
          },
        ]
      : [];

  const languages = languageList(profile.languages, locale);
  const socials = socialLinks(profile);
  const candidates: (PublicProfileRow | null)[] = [
    profile.region
      ? {
          id: "region",
          label: t("rows.region"),
          value: t(`regions.${profile.region}`),
        }
      : null,
    textRow("city", profile.city, t),
    textRow("school", profile.school, t),
    textRow("gradeYear", profile.gradeYear, t),
    languages
      ? { id: "languages", label: t("rows.languages"), value: languages }
      : null,
    textRow("phone", profile.phone, t),
    textRow("telegram", profile.telegram ? `@${profile.telegram}` : "", t),
    profile.links.length > 0
      ? {
          id: "links",
          label: t("rows.links"),
          value: (
            <PublicProfileLinks
              links={profile.links}
              openLabel={t("openLink")}
            />
          ),
        }
      : null,
    {
      id: "joined",
      label: t("rows.joined"),
      value: new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(new Date(profile.joinedAt)),
    },
  ];
  const rows = candidates.filter(
    (row): row is PublicProfileRow => row !== null,
  );

  return (
    <div className="container-page py-8 sm:py-14 lg:py-20">
      <PublicProfileSheet
        name={profile.displayName}
        username={profile.username}
        avatarUrl={profile.avatarUrl}
        level={t(`levels.${profile.level}`)}
        bio={profile.bio.trim()}
        socials={socials}
        figures={figures}
        rows={rows}
        figuresLabel={t("figures")}
        socialsLabel={t("socials")}
        platformLabels={{
          telegram: t("platforms.telegram"),
          instagram: t("platforms.instagram"),
          linkedin: t("platforms.linkedin"),
        }}
      />
      <p className="enter-rise mx-auto mt-6 max-w-[40rem] text-center text-sm leading-relaxed text-pretty text-ink-muted [--enter-delay:700ms]">
        {t("privacyNote")}
      </p>
    </div>
  );
}

function textRow(
  id: string,
  value: string,
  t: Awaited<ReturnType<typeof getTranslations>>,
): PublicProfileRow | null {
  const text = value.trim();
  return text ? { id, label: t(`rows.${id}`), value: text } : null;
}

function socialLinks(profile: PublicProfile): PublicProfileSocialLink[] {
  const telegram = profile.telegram.trim().replace(/^@+/, "");
  const instagram = profile.instagram.trim().replace(/^@+/, "");
  const linkedinHandle =
    profile.linkedin.split("/").filter(Boolean).at(-1) ?? "";
  return [
    telegram
      ? {
          platform: "telegram" as const,
          handle: telegram,
          href: `https://t.me/${encodeURIComponent(telegram)}`,
        }
      : null,
    instagram
      ? {
          platform: "instagram" as const,
          handle: instagram,
          href: `https://www.instagram.com/${encodeURIComponent(instagram)}/`,
        }
      : null,
    profile.linkedin && linkedinHandle
      ? {
          platform: "linkedin" as const,
          handle: linkedinHandle,
          href: profile.linkedin,
        }
      : null,
  ].filter((link): link is PublicProfileSocialLink => link !== null);
}

function languageList(languages: readonly string[], locale: string) {
  const names = new Intl.DisplayNames([locale], { type: "language" });
  return languages
    .map((language) => {
      try {
        return names.of(language) ?? language;
      } catch {
        return language;
      }
    })
    .join(", ");
}
