"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import { LOCALE_COOKIE_NAME, writePreferenceCookie } from "@/lib/preferences";
import { cn } from "@/lib/utils";

export function ProfileLocaleSwitcher({
  locale: active,
  username,
  label,
}: {
  locale: Locale;
  username: string;
  label: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${label}: ${localeNames[active]}`}
          className="group inline-flex h-10 items-center gap-1 rounded-full border border-border bg-surface pr-2 pl-3 text-xs font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:border-border-control hover:text-primary-ink"
        >
          <span>{active}</span>
          <ChevronDown
            aria-hidden="true"
            className="size-3.5 shrink-0 transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {locales.map((locale) => {
          const activeLocale = locale === active;
          return (
            <DropdownMenuItem
              key={locale}
              asChild
              className={cn(
                "min-h-11 gap-3 text-sm font-semibold",
                activeLocale
                  ? "bg-surface-soft text-primary-ink focus:bg-surface-soft"
                  : "text-ink hover:bg-surface-sunk hover:text-primary-ink",
              )}
            >
              <a
                href={`/${username}`}
                hrefLang={locale}
                lang={locale}
                aria-current={activeLocale ? "page" : undefined}
                onClick={() =>
                  writePreferenceCookie(LOCALE_COOKIE_NAME, locale)
                }
              >
                <span className="flex-1">{localeNames[locale]}</span>
                {activeLocale ? (
                  <Check
                    aria-hidden="true"
                    className="size-4 text-primary-ink"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="text-xs tracking-[0.08em] text-ink-muted uppercase"
                  >
                    {locale}
                  </span>
                )}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
