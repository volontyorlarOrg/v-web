import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getBlogList,
  blogMediaSrc,
  type BlogListItem,
} from "@/lib/blog/blog.server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    route: "blog",
    namespace: "blog",
  });
}

function Story({
  item,
  lead,
  read,
  writtenIn,
  locale,
}: {
  item: BlogListItem;
  lead: boolean;
  read: string;
  writtenIn: string | null;
  locale: Locale;
}) {
  const cover = blogMediaSrc(item.coverUrl);
  const title = item.title.trim();
  const summary = item.summary.trim();
  const href = `/blog/${item.slug}`;
  const date = item.publishedAt
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(item.publishedAt))
    : "";
  const text = (
    <div className="min-w-0">
      {date || writtenIn ? (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
          {date ? (
            <time dateTime={item.publishedAt ?? undefined} lang={locale}>
              {date}
            </time>
          ) : null}
          {writtenIn ? (
            <span
              lang={locale}
              className="rounded-full border border-border px-2 py-0.5 tracking-normal normal-case"
            >
              {writtenIn}
            </span>
          ) : null}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-balance break-words text-ink",
          lead ? "mt-3 text-headline" : "mt-2 text-[1.65rem] leading-tight",
        )}
      >
        <Link
          href={href}
          className="hover:text-primary-ink hover:underline hover:underline-offset-4"
        >
          {title}
        </Link>
      </h2>
      {summary ? (
        <p
          className={cn(
            "mt-3 max-w-[60ch] text-pretty text-ink-muted",
            lead ? "text-lead" : "leading-relaxed",
          )}
        >
          {summary}
        </p>
      ) : null}
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary-ink hover:underline"
      >
        <span lang={locale}>{read}</span>
        <span className="ml-2">→</span>
      </Link>
    </div>
  );
  const picture = cover ? (
    <Link
      href={href}
      tabIndex={-1}
      aria-hidden="true"
      className="block overflow-hidden rounded-lg bg-surface-soft"
    >
      <img
        src={cover}
        srcSet={["sm", "md", "lg"]
          .map(
            (variant, index) =>
              `${blogMediaSrc(item.coverUrl?.replace(/\/(sm|md|lg)$/, `/${variant}`) ?? null)} ${[480, 960, 1600][index]}w`,
          )
          .join(", ")}
        sizes={lead ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 640px) 100vw, 180px"}
        alt=""
        loading={lead ? "eager" : "lazy"}
        className={cn("w-full object-cover", lead ? "aspect-[16/10]" : "aspect-[3/2]")}
      />
    </Link>
  ) : null;

  if (lead)
    return (
      <article
        lang={item.contentLocale}
        className={
          picture
            ? "grid gap-7 border-b border-border pb-10 md:grid-cols-[1.15fr_1fr] md:items-center"
            : "mb-3 rounded-lg border border-border bg-surface px-6 py-8 sm:px-10 sm:py-12"
        }
      >
        {picture}
        <div className={picture ? undefined : "max-w-3xl"}>{text}</div>
      </article>
    );
  return (
    <article
      lang={item.contentLocale}
      className={cn(
        "border-b border-border py-7",
        picture ? "grid gap-6 sm:grid-cols-[180px_1fr] sm:items-start" : null,
      )}
    >
      {picture}
      <div className={picture ? undefined : "max-w-3xl"}>{text}</div>
    </article>
  );
}

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const query = await searchParams;
  const rawPage = Number(query.page ?? 1);
  const page = Number.isSafeInteger(rawPage) ? Math.max(1, rawPage) : 1;
  const list = await getBlogList(locale as Locale, page);
  if (page > 1 && !list.items.length) notFound();
  return (
    <div className="container-page pb-24 pt-12 sm:pt-20">
      <header className="mb-12 max-w-3xl border-b border-border pb-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-ink">
          {t("eyebrow")}
        </p>
        <h1 className="font-serif text-page leading-tight text-ink">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-muted">{t("lead")}</p>
      </header>
      {list.items.length ? (
        <div className="mx-auto max-w-6xl">
          {list.items.map((item, index) => (
            <Story
              key={item.slug}
              item={item}
              lead={page === 1 && index === 0}
              read={t("read")}
              writtenIn={
                item.contentLocale === locale
                  ? null
                  : t("writtenIn", { language: t(`languages.${item.contentLocale}`) })
              }
              locale={locale as Locale}
            />
          ))}
          {page > 1 || page * list.pageSize < list.total ? (
            <nav
              aria-label={t("pagination")}
              className="mt-9 flex justify-between gap-4"
            >
              {page > 1 ? (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="inline-flex min-h-11 items-center font-semibold text-primary-ink hover:underline"
                >
                  ← {t("previous")}
                </Link>
              ) : (
                <span />
              )}
              {page * list.pageSize < list.total ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="inline-flex min-h-11 items-center font-semibold text-primary-ink hover:underline"
                >
                  {t("next")} →
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      ) : (
        <div className="max-w-3xl rounded-lg border border-border bg-surface px-7 py-12">
          <p className="font-serif text-2xl text-ink">{t("empty")}</p>
        </div>
      )}
    </div>
  );
}
