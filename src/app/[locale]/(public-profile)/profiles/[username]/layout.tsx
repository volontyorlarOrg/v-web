import { getTranslations, setRequestLocale } from "next-intl/server";

import { BrandLockup } from "@/components/brand/logo";
import { ProfileHeader } from "@/components/public-profile/profile-header";
import type { Locale } from "@/i18n/routing";
import { ORGANIZATION_NAME } from "@/lib/content/org";

export default async function PublicProfileLayout({
  children,
  params,
}: LayoutProps<"/[locale]/profiles/[username]">) {
  const { locale, username } = await params;
  setRequestLocale(locale);
  const [nav, profile] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "publicProfile" }),
  ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-action focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-knockout"
      >
        {nav("skipToContent")}
      </a>
      <ProfileHeader
        locale={locale as Locale}
        username={username}
        labels={{
          home: nav("home"),
          language: nav("languageLabel"),
          theme: nav("themeLabel"),
        }}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <a href={`/${locale}`} className="rounded-lg">
            <BrandLockup name={ORGANIZATION_NAME} className="[--logo:2.2rem]" />
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              © {new Date().getFullYear()} {ORGANIZATION_NAME}
            </p>
            <a
              href={`/${locale}/privacy`}
              className="font-semibold text-primary-ink underline-offset-4 hover:underline"
            >
              {profile("privacy")}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
