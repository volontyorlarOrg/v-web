import type { ReactNode } from "react";

import { BlogBody, hasBlogContent } from "@/components/blog/blog-body";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { BlogArticle } from "@/lib/blog/blog.server";
import { blogMediaSrc } from "@/lib/blog/blog.server";
import { cn } from "@/lib/utils";

export type ArticleLabels = {
  eyebrow: string;
  back: string;
  fallback: string;
  preview: string;
  previewNotice: string;
  author: string;
  published: string;
  credit: string;
  availableIn: string;
  languages: Record<Locale, string>;
  missingTitle?: string;
  missingSummary?: string;
  missingBody?: string;
};

const LONG_TITLE = 70;

function Missing({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-lg border border-dashed border-border-control px-4 py-3 text-sm text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function ArticleView({
  article,
  locale,
  labels,
  preview = false,
}: {
  article: BlogArticle;
  locale: Locale;
  labels: ArticleLabels;
  preview?: boolean;
}) {
  const date = article.publishedAt
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(article.publishedAt))
    : null;
  const cover = blogMediaSrc(article.coverUrl, preview, locale);
  const title = article.title.trim();
  const summary = article.summary.trim();
  const author = article.authorName.trim();
  const hasBody = hasBlogContent(article.body);
  const coverVariant = (variant: string) =>
    blogMediaSrc(
      article.coverUrl?.replace(/\/(sm|md|lg)$/, `/${variant}`) ?? null,
      preview,
      locale,
    );

  return (
    <div className="container-page pt-10 pb-20 sm:pt-14">
      <div className="mx-auto max-w-[760px]">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-primary-ink hover:underline"
        >
          ← {labels.back}
        </Link>
        {preview ? (
          <div className="mt-7 rounded-lg border border-primary-ink bg-surface-soft px-5 py-4 text-sm text-ink">
            <strong>{labels.preview}</strong>
            <p className="mt-1 text-ink-muted">{labels.previewNotice}</p>
          </div>
        ) : null}
        {article.contentLocale !== locale ? (
          <p
            role="status"
            className="mt-7 border-l-2 border-primary-ink bg-surface-soft px-4 py-3 text-sm text-ink"
          >
            {labels.fallback}
          </p>
        ) : null}
        {article.availableLocales.length > 1 ? (
          <nav
            aria-label={labels.availableIn}
            className="mt-5 flex flex-wrap items-center gap-2 text-sm"
          >
            <span className="mr-1 text-ink-muted">{labels.availableIn}</span>
            {article.availableLocales.map((candidate) => (
              <Link
                key={candidate}
                href={`/blog/${article.slug}`}
                locale={candidate}
                hrefLang={candidate}
                lang={candidate}
                aria-current={candidate === article.contentLocale ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-full border px-3 font-semibold",
                  candidate === article.contentLocale
                    ? "border-primary-ink text-primary-ink"
                    : "border-border text-ink hover:border-primary-ink",
                )}
              >
                {labels.languages[candidate]}
              </Link>
            ))}
          </nav>
        ) : null}
        <article lang={article.contentLocale} className="mt-8">
          <header className={cn(cover ? "pb-2" : "border-b border-border pb-8")}>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-primary-ink uppercase before:h-px before:w-6 before:bg-current">
              {labels.eyebrow}
            </p>
            {title ? (
              <h1
                className={cn(
                  "font-serif text-balance break-words text-ink",
                  title.length > LONG_TITLE ? "text-headline" : "text-display",
                )}
              >
                {title}
              </h1>
            ) : preview && labels.missingTitle ? (
              <h1 className="font-serif text-headline text-ink-muted/70 italic">
                {labels.missingTitle}
              </h1>
            ) : null}
            {summary ? (
              <p className="mt-6 max-w-2xl text-lead text-pretty text-ink-muted">
                {summary}
              </p>
            ) : preview && labels.missingSummary ? (
              <Missing className="mt-6">{labels.missingSummary}</Missing>
            ) : null}
            {date || author ? (
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                {date ? (
                  <time dateTime={article.publishedAt ?? undefined} lang={locale}>
                    {labels.published.replace("{date}", date)}
                  </time>
                ) : null}
                {author ? <span>{labels.author.replace("{name}", author)}</span> : null}
              </div>
            ) : null}
          </header>
          {cover ? (
            <figure className="mt-7 mb-9 border-b border-border pb-9">
              <img
                src={cover}
                srcSet={["sm", "md", "lg"]
                  .map((variant, index) => `${coverVariant(variant)} ${[480, 960, 1600][index]}w`)
                  .join(", ")}
                sizes="(max-width: 760px) 100vw, 760px"
                alt={article.coverAlt}
                fetchPriority="high"
                className="aspect-[16/9] w-full rounded-lg bg-surface-soft object-cover"
              />
              {article.coverCaption || article.coverCredit ? (
                <figcaption className="mt-3 text-sm text-ink-muted">
                  {article.coverCaption}
                  {article.coverCaption && article.coverCredit ? " · " : ""}
                  {article.coverCredit
                    ? labels.credit.replace("{name}", article.coverCredit)
                    : ""}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
          {hasBody ? (
            <div className={cover ? undefined : "pt-8"}>
              <BlogBody body={article.body} preview={preview} locale={locale} />
            </div>
          ) : preview && labels.missingBody ? (
            <Missing className={cover ? undefined : "mt-8"}>{labels.missingBody}</Missing>
          ) : null}
        </article>
        <div className="mt-14 border-t border-border pt-6">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center font-semibold text-primary-ink hover:underline"
          >
            ← {labels.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
