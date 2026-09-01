"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { localeNames, locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Language is part of the URL, never browser storage, so switching is a plain
 * set of links to the same route in another locale. `usePathname` returns the
 * path without the locale prefix, which is what keeps the equivalent route.
 */
export function LocaleSwitcher({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const active = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface p-0.5",
        className,
      )}
    >
      {locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "true" : undefined}
            title={localeNames[locale]}
            className={cn(
              "inline-flex min-h-9 min-w-10 items-center justify-center rounded-md px-1.5 text-xs font-bold tracking-[0.06em] uppercase transition-colors sm:min-w-11 sm:px-2",
              isActive
                ? "bg-primary-ink text-primary-fg"
                : "text-ink-muted hover:bg-surface-soft hover:text-primary-ink",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
