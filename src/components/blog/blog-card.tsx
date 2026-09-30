import { ArrowRight } from "lucide-react";

import { BrandHeart } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  blogMediaSrc,
  blogMediaSrcSet,
  type BlogListItem,
} from "@/lib/blog/blog.server";
import { formatBlogDate } from "@/lib/blog/format";
import { cn } from "@/lib/utils";

const LONG_FEATURE_TITLE = 70;

const CARD_FRAME =
  "group relative isolate overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-border-control has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-primary-ink";

const STRETCHED_LINK =
  "transition-colors duration-200 group-hover:text-primary-ink after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none";

export function BlogPlate({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-slot="blog-plate"
      className={cn(
        "blog-plate relative flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <BrandHeart className="w-[clamp(4.5rem,30%,9rem)] text-primary/25 transition-transform duration-700 ease-scene group-hover:-translate-y-1 group-hover:scale-105" />
    </div>
  );
}

function BlogCover({
  item,
  sizes,
  eager = false,
  className,
  plateClassName,
}: {
  item: BlogListItem;
  sizes: string;
  eager?: boolean;
  className?: string;
  plateClassName?: string;
}) {
  const src = blogMediaSrc(item.coverUrl);
  if (!src) return <BlogPlate className={cn(className, plateClassName)} />;
  return (
    <div className={cn("relative overflow-hidden bg-surface-soft", className)}>
      <img
        src={src}
        srcSet={blogMediaSrcSet(item.coverUrl)}
        sizes={sizes}
        alt=""
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-[scale] duration-700 ease-scene group-hover:scale-[1.035]"
      />
    </div>
  );
}

function BlogMeta({
  item,
  locale,
  writtenIn,
}: {
  item: BlogListItem;
  locale: Locale;
  writtenIn: string | null;
}) {
  const date = formatBlogDate(item.publishedAt, locale);
  if (!date && !writtenIn) return null;
  return (
    <p
      lang={locale}
      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-ink-muted"
    >
      {date ? (
        <time dateTime={item.publishedAt ?? undefined} className="tabular">
          {date}
        </time>
      ) : null}
      {writtenIn ? <Badge variant="outline">{writtenIn}</Badge> : null}
    </p>
  );
}

export function BlogCard({
  item,
  locale,
  writtenIn,
  heading: Heading = "h2",
  className,
}: {
  item: BlogListItem;
  locale: Locale;
  writtenIn: string | null;
  heading?: "h2" | "h3";
  className?: string;
}) {
  const summary = item.summary.trim();
  return (
    <article
      lang={item.contentLocale}
      className={cn(CARD_FRAME, "flex flex-col rounded-xl", className)}
    >
      <BlogCover
        item={item}
        sizes="(min-width: 1024px) 23rem, (min-width: 640px) 50vw, 100vw"
        className="aspect-[3/2] border-b border-border"
        plateClassName="aspect-[3/1] sm:aspect-[3/2]"
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <BlogMeta item={item} locale={locale} writtenIn={writtenIn} />
        <Heading className="font-sans text-title font-semibold break-words text-balance text-ink">
          <Link href={`/blog/${item.slug}`} className={STRETCHED_LINK}>
            {item.title.trim()}
          </Link>
        </Heading>
        {summary ? (
          <p className="line-clamp-3 leading-relaxed text-pretty text-ink-muted">
            {summary}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function BlogFeature({
  item,
  locale,
  writtenIn,
  readLabel,
}: {
  item: BlogListItem;
  locale: Locale;
  writtenIn: string | null;
  readLabel: string;
}) {
  const title = item.title.trim();
  const summary = item.summary.trim();
  return (
    <article
      lang={item.contentLocale}
      className={cn(
        CARD_FRAME,
        "grid rounded-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
      )}
    >
      <BlogCover
        item={item}
        eager
        sizes="(min-width: 1024px) 40rem, 100vw"
        className="aspect-[16/10] border-b border-border lg:aspect-auto lg:min-h-[26rem] lg:border-r lg:border-b-0"
        plateClassName="aspect-[5/2] sm:aspect-[16/10]"
      />
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-10 lg:p-12">
        <BlogMeta item={item} locale={locale} writtenIn={writtenIn} />
        <h2
          className={cn(
            "break-words text-balance text-ink",
            title.length > LONG_FEATURE_TITLE
              ? "text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.14] tracking-[-0.02em]"
              : "text-[clamp(2rem,3.4vw,2.875rem)] leading-[1.08] tracking-[-0.024em]",
          )}
        >
          <Link href={`/blog/${item.slug}`} className={STRETCHED_LINK}>
            {title}
          </Link>
        </h2>
        {summary ? (
          <p className="line-clamp-4 text-lead text-pretty text-ink-muted">{summary}</p>
        ) : null}
        <span
          aria-hidden="true"
          lang={locale}
          className={buttonClass({
            variant: "outline",
            size: "sm",
            className:
              "mt-2 self-start group-hover:border-primary-ink group-hover:bg-surface-soft group-hover:text-primary-ink [&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:translate-x-0.5",
          })}
        >
          {readLabel}
          <ArrowRight />
        </span>
      </div>
    </article>
  );
}
