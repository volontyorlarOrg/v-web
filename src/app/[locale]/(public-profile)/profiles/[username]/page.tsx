import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PublicProfileCard } from "@/components/public-profile/public-profile-card";
import type { Locale } from "@/i18n/routing";
import {
  getPublicProfile,
  PublicProfileLoadError,
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
  let profile;
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

  const region = profile.region ? t(`regions.${profile.region}`) : null;
  return (
    <div className="container-page py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <PublicProfileCard
          profile={profile}
          locale={locale as Locale}
          labels={{
            level: t(`levels.${profile.level}`),
            events: t("stats.events"),
            hours: t("stats.hours"),
            xp: t("stats.xp"),
            region,
            openLink: t("openLink"),
          }}
        />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-ink-muted">
          {t("privacyNote")}
        </p>
      </div>
    </div>
  );
}
