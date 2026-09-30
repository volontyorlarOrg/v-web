import type { Locale } from "@/i18n/routing";

type TextNode = { type: string; text?: string; content?: TextNode[] };

const WORDS_PER_MINUTE = 200;

export function formatBlogDate(value: string | null, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tashkent",
  }).format(date);
}

export function blogWordCount(node: TextNode | undefined): number {
  if (!node) return 0;
  const own =
    node.type === "text" && node.text
      ? node.text.split(/\s+/u).filter(Boolean).length
      : 0;
  return (node.content ?? []).reduce((sum, child) => sum + blogWordCount(child), own);
}

export function blogReadingMinutes(node: TextNode | undefined): number {
  return Math.max(1, Math.round(blogWordCount(node) / WORDS_PER_MINUTE));
}
