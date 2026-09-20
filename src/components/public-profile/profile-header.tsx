import { BrandLockup } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { ProfileLocaleSwitcher } from "@/components/public-profile/profile-locale-switcher";
import type { Locale } from "@/i18n/routing";
import { ORGANIZATION_NAME } from "@/lib/content/org";

export function ProfileHeader({
  locale,
  username,
  labels,
}: {
  locale: Locale;
  username: string;
  labels: { home: string; language: string; theme: string };
}) {
  return (
    <header className="border-b border-border bg-paper">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 lg:min-h-20">
        <a
          href={`/${locale}`}
          className="-m-1 rounded-lg p-1"
          aria-label={`${ORGANIZATION_NAME} — ${labels.home}`}
        >
          <BrandLockup name={ORGANIZATION_NAME} />
        </a>
        <div className="flex items-center gap-2">
          <ProfileLocaleSwitcher
            locale={locale}
            username={username}
            label={labels.language}
          />
          <ThemeToggle label={labels.theme} />
        </div>
      </div>
    </header>
  );
}
