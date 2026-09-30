import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogBody, hasBlogContent } from "@/components/blog/blog-body";
import { Scene } from "@/components/marketing/scene";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { BlogArticle, BlogListItem } from "@/lib/blog/blog.server";
import { blogMediaSrc, blogMediaSrcSet } from "@/lib/blog/blog.server";
import { blogReadingMinutes, formatBlogDate } from "@/lib/blog/format";
import { cn } from "@/lib/utils";

export type ArticleLabels = {
  back: string;
  fallback: string;
  preview: string;
  previewNotice: string;
  author: string;
  published: string;
  readingTime: string;
  credit: string;
  availableIn: string;
  more: string;
  languages: Record<Locale, string>;
  missingTitle?: string;
  missingSummary?: string;
  missingBody?: string;
};

export type MoreArticle = { item: BlogListItem; writtenIn: string | null };

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
  more = [],
  preview = false,
}: {
  article: BlogArticle;
  locale: Locale;
  labels: ArticleLabels;
  more?: MoreArticle[];
  preview?: boolean;
}) {
  const date = formatBlogDate(article.publishedAt, locale);
  const cover = blogMediaSrc(article.coverUrl, preview, locale);
  const title = article.title.trim();
  const summary = article.summary.trim();
  const author = article.authorName.trim();
  const hasBody = hasBlogContent(article.body);
  const minutes = blogReadingMinutes(article.body);

  return (
    <>
      <div className="container-page pt-8 pb-20 sm:pt-12 sm:pb-24">
        <div className="mx-auto max-w-[42rem]">
          <Link
            href="/blog"
            className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-sm font-semibold text-primary-ink hover:underline hover:underline-offset-4 [&>svg]:size-4"
          >
            <ArrowLeft aria-hidden="true" />
            {labels.back}
          </Link>
          {preview ? (
            <div className="mt-6 rounded-lg border border-primary-ink bg-surface-soft px-5 py-4 text-sm text-ink">
              <strong>{labels.preview}</strong>
              <p className="mt-1 text-ink-muted">{labels.previewNotice}</p>
            </div>
          ) : null}
          {article.contentLocale !== locale ? (
            <p
              role="status"
              className="mt-6 border-l-2 border-primary-ink bg-surface-soft px-4 py-3 text-sm text-ink"
            >
              {labels.fallback}
            </p>
          ) : null}
        </div>

        <article lang={article.contentLocale} className="mt-8 sm:mt-12">
          <header className="mx-auto max-w-[42rem]">
            {title ? (
              <h1
                className={cn(
                  "break-words text-balance text-ink",
                  title.length > LONG_TITLE
                    ? "text-headline"
                    : "text-[clamp(2.5rem,5.4vw,4rem)] leading-[1.04] tracking-[-0.028em]",
                )}
              >
                {title}
              </h1>
            ) : preview && labels.missingTitle ? (
              <h1 className="text-headline text-ink-muted/70 italic">
                {labels.missingTitle}
              </h1>
            ) : null}
            {summary ? (
              <p className="mt-6 text-lead text-pretty text-ink-muted">{summary}</p>
            ) : preview && labels.missingSummary ? (
              <Missing className="mt-6">{labels.missingSummary}</Missing>
            ) : null}
            <div
              lang={locale}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 text-sm"
            >
              {author ? (
                <span className="font-semibold text-ink">
                  {labels.author.replace("{name}", author)}
                </span>
              ) : null}
              {date ? (
                <time dateTime={article.publishedAt ?? undefined} className="text-ink-muted">
                  {labels.published.replace("{date}", date)}
                </time>
              ) : null}
              {hasBody ? (
                <span className="tabular text-ink-muted">
                  {labels.readingTime.replace("{minutes}", String(minutes))}
                </span>
              ) : null}
            </div>
            {article.availableLocales.length > 1 ? (
              <nav
                aria-label={labels.availableIn}
                lang={locale}
                className="mt-4 flex flex-wrap items-center gap-2 text-sm"
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
                      "inline-flex min-h-9 items-center rounded-full border px-3 font-semibold transition-colors",
                      candidate === article.contentLocale
                        ? "border-primary-ink bg-surface-soft text-primary-ink"
                        : "border-border text-ink hover:border-primary-ink hover:text-primary-ink",
                    )}
                  >
                    {labels.languages[candidate]}
                  </Link>
                ))}
              </nav>
            ) : null}
          </header>

          {cover ? (
            <figure className="mx-auto mt-10 max-w-5xl sm:mt-12">
              <img
                src={cover}
                srcSet={blogMediaSrcSet(article.coverUrl, preview, locale)}
                sizes="(min-width: 1088px) 64rem, 100vw"
                alt={article.coverAlt}
                fetchPriority="high"
                className="aspect-[16/9] w-full rounded-xl bg-surface-soft object-cover sm:rounded-2xl"
              />
              {article.coverCaption || article.coverCredit ? (
                <figcaption className="mx-auto mt-3 max-w-[42rem] text-sm leading-relaxed text-ink-muted">
                  {article.coverCaption}
                  {article.coverCaption && article.coverCredit ? " " : ""}
                  {article.coverCredit ? (
                    <span lang={locale}>
                      {labels.credit.replace("{name}", article.coverCredit)}
                    </span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="mx-auto mt-10 max-w-[42rem] sm:mt-12">
            {hasBody ? (
              <BlogBody body={article.body} preview={preview} locale={locale} />
            ) : preview && labels.missingBody ? (
              <Missing>{labels.missingBody}</Missing>
            ) : null}
          </div>
        </article>

        {more.length ? null : (
          <div className="mx-auto mt-14 max-w-[42rem] border-t border-border pt-6">
            <Link
              href="/blog"
              className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-md px-1 font-semibold text-primary-ink hover:underline hover:underline-offset-4 [&>svg]:size-4"
            >
              <ArrowLeft aria-hidden="true" />
              {labels.back}
            </Link>
          </div>
        )}
      </div>

      {more.length ? (
        <section
          aria-labelledby="more-articles"
          className="border-t border-border bg-surface-sunk py-16 sm:py-24"
        >
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-articles" className="text-headline text-balance text-ink">
                {labels.more}
              </h2>
              <Link href="/blog" className={buttonClass({ variant: "outline", size: "sm" })}>
                {labels.back}
              </Link>
            </div>
            <Scene
              as="ul"
              variant="stagger"
              className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
            >
              {more.map(({ item, writtenIn }) => (
                <li key={item.slug} className="flex">
                  <BlogCard
                    item={item}
                    locale={locale}
                    writtenIn={writtenIn}
                    heading="h3"
                    className="w-full"
                  />
                </li>
              ))}
            </Scene>
          </div>
        </section>
      ) : null}
    </>
  );
}
