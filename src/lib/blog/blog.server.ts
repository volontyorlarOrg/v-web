import "server-only";

import { cache } from "react";
import type { Locale } from "@/i18n/routing";
import { marketingUrl } from "@/lib/seo/origin";

export type BlogNode = {
  type: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: BlogNode[];
};

export type BlogListItem = {
  slug: string;
  requestedLocale: Locale;
  contentLocale: Locale;
  availableLocales: Locale[];
  title: string;
  summary: string;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt: string | null;
};

export type BlogArticle = BlogListItem & {
  body: BlogNode;
  coverMediaId: string | null;
  coverCaption: string;
  coverCredit: string;
  seoDescription: string;
  authorName: string;
  preview?: boolean;
};

export type BlogList = {
  items: BlogListItem[];
  page: number;
  pageSize: number;
  total: number;
};

export class BlogLoadError extends Error {}

export function blogApiOrigin() {
  const value = process.env.VOLONTYORLAR_API_URL?.trim();
  if (!value) throw new BlogLoadError("notConfigured");
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    return url.origin;
  } catch {
    throw new BlogLoadError("notConfigured");
  }
}

async function getJson(
  path: string,
  previewToken?: string,
): Promise<unknown | null> {
  let response: Response;
  try {
    response = await fetch(new URL(path, `${blogApiOrigin()}/`), {
      ...(previewToken
        ? {
            cache: "no-store" as const,
            headers: { "x-blog-preview-token": previewToken },
          }
        : { next: { revalidate: 60, tags: ["blog"] } }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    throw new BlogLoadError("unavailable", { cause });
  }
  if (response.status === 404) return null;
  if (!response.ok) throw new BlogLoadError("unavailable");
  return response.json() as Promise<unknown>;
}

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function locale(value: unknown): value is Locale {
  return value === "uz" || value === "ru" || value === "en";
}

function parseItem(value: unknown): BlogListItem {
  if (
    !record(value) ||
    typeof value.slug !== "string" ||
    !locale(value.requestedLocale) ||
    !locale(value.contentLocale) ||
    !Array.isArray(value.availableLocales) ||
    !value.availableLocales.every(locale) ||
    typeof value.title !== "string" ||
    typeof value.summary !== "string" ||
    (value.coverUrl !== null && typeof value.coverUrl !== "string") ||
    typeof value.coverAlt !== "string" ||
    (value.publishedAt !== null && typeof value.publishedAt !== "string")
  )
    throw new BlogLoadError("invalidResponse");
  return value as BlogListItem;
}

function parseArticle(value: unknown): BlogArticle {
  const item = parseItem(value);
  if (
    !record(value) ||
    !record(value.body) ||
    value.body.type !== "doc" ||
    (value.coverMediaId !== null && typeof value.coverMediaId !== "string") ||
    typeof value.coverCaption !== "string" ||
    typeof value.coverCredit !== "string" ||
    typeof value.seoDescription !== "string" ||
    typeof value.authorName !== "string"
  ) {
    throw new BlogLoadError("invalidResponse");
  }
  return {
    ...item,
    body: value.body as BlogNode,
    coverMediaId: value.coverMediaId as string | null,
    coverCaption: value.coverCaption as string,
    coverCredit: value.coverCredit as string,
    seoDescription: value.seoDescription as string,
    authorName: value.authorName as string,
    preview: value.preview === true,
  };
}

export const getBlogList = cache(
  async (
    selectedLocale: Locale,
    page = 1,
    pageSize = 12,
  ): Promise<BlogList> => {
    const query = new URLSearchParams({
      locale: selectedLocale,
      page: String(page),
      pageSize: String(pageSize),
    });
    const value = await getJson(`/public/blog?${query}`);
    if (
      !record(value) ||
      !Array.isArray(value.items) ||
      typeof value.total !== "number" ||
      typeof value.page !== "number" ||
      typeof value.pageSize !== "number"
    ) {
      throw new BlogLoadError("invalidResponse");
    }
    return {
      items: value.items.map(parseItem),
      total: value.total,
      page: value.page,
      pageSize: value.pageSize,
    };
  },
);

export const getBlogArticle = cache(
  async (slug: string, selectedLocale: Locale): Promise<BlogArticle | null> => {
    const query = new URLSearchParams({ locale: selectedLocale });
    const value = await getJson(
      `/public/blog/${encodeURIComponent(slug)}?${query}`,
    );
    return value ? parseArticle(value) : null;
  },
);

export async function getBlogPreview(
  slug: string,
  selectedLocale: Locale,
  token: string,
): Promise<BlogArticle | null> {
  const query = new URLSearchParams({ locale: selectedLocale });
  const value = await getJson(
    `/public/blog/preview/${encodeURIComponent(slug)}?${query}`,
    token,
  );
  return value ? parseArticle(value) : null;
}

const MEDIA_PATH = /^\/public\/blog\/media\/([a-f0-9-]{36})\/(sm|md|lg)$/;

export function blogMediaSrc(
  path: string | null,
  preview = false,
  previewLocale?: Locale,
): string | null {
  const match = MEDIA_PATH.exec(path ?? "");
  if (!match) return null;
  const [, mediaId, variant] = match;
  return preview && previewLocale
    ? `/${previewLocale}/blog/preview/media/${mediaId}/${variant}`
    : `/api/blog/media/${mediaId}/${variant}`;
}

export function blogMediaUrl(path: string | null): string | null {
  const src = blogMediaSrc(path);
  return src ? marketingUrl(src) : null;
}
