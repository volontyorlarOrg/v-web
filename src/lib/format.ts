import type { Locale } from "@/i18n/routing";

const NO_BREAK_SPACE = "\u00a0";

const GROUP_SEPARATOR: Record<Locale, string> = {
  uz: NO_BREAK_SPACE,
  ru: NO_BREAK_SPACE,
  en: ",",
};

export function formatCount(amount: number, locale: Locale): string {
  const rounded = Math.round(amount);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+$)/g, GROUP_SEPARATOR[locale]);

  return rounded < 0 ? `-${grouped}` : grouped;
}
