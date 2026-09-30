import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlogCard, BlogFeature, BlogPlate } from "@/components/blog/blog-card";
import { PageBreadcrumbJsonLd } from "@/components/marketing/page-breadcrumb-json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { Scene } from "@/components/marketing/scene";
import { buttonClass } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getBlogList } from "@/lib/blog/blog.server";
import { navHref } from "@/lib/routing/routes";
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
  const pages = Math.max(1, Math.ceil(list.total / list.pageSize));
  const writtenIn = (contentLocale: Locale) =>
    contentLocale === locale
      ? null
      : t("writtenIn", { language: t(`languages.${contentLocale}`) });
  const feature = page === 1 ? list.items[0] : undefined;
  const rest = feature ? list.items.slice(1) : list.items;

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale as Locale} route="blog" />
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <div className="container-page pt-10 pb-24 sm:pt-14 sm:pb-32">
        {list.items.length ? (
          <>
            {feature ? (
              <BlogFeature
                item={feature}
                locale={locale as Locale}
                writtenIn={writtenIn(feature.contentLocale)}
                readLabel={t("read")}
              />
            ) : null}
            {rest.length ? (
              <Scene
                as="ul"
                variant="stagger"
                className={cn(
                  "grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3",
                  feature && "mt-6 sm:mt-8",
                )}
              >
                {rest.map((item) => (
                  <li key={item.slug} className="flex">
                    <BlogCard
                      item={item}
                      locale={locale as Locale}
                      writtenIn={writtenIn(item.contentLocale)}
                      className="w-full"
                    />
                  </li>
                ))}
              </Scene>
            ) : null}
            {pages > 1 ? (
              <nav
                aria-label={t("pagination")}
                className="mt-14 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-border pt-8"
              >
                <span>
                  {page > 1 ? (
                    <Link
                      href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                      rel="prev"
                      className={buttonClass({
                        variant: "outline",
                        size: "sm",
                        className: "[&>svg]:size-4",
                      })}
                    >
                      <ArrowLeft aria-hidden="true" />
                      {t("previous")}
                    </Link>
                  ) : null}
                </span>
                <p className="tabular text-sm text-ink-muted">
                  {t("pageOf", { page, pages })}
                </p>
                <span className="flex justify-end">
                  {page < pages ? (
                    <Link
                      href={`/blog?page=${page + 1}`}
                      rel="next"
                      className={buttonClass({
                        variant: "outline",
                        size: "sm",
                        className: "[&>svg]:size-4",
                      })}
                    >
                      {t("next")}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  ) : null}
                </span>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="grid overflow-hidden rounded-2xl border border-border bg-surface sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <BlogPlate className="aspect-[16/9] border-b border-border sm:aspect-auto sm:min-h-64 sm:border-r sm:border-b-0" />
            <div className="flex flex-col items-start justify-center gap-5 p-7 sm:p-10">
              <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl">
                {t("empty")}
              </p>
              <Link
                href={navHref("volunteering")}
                className={buttonClass({ variant: "outline", size: "sm" })}
              >
                {t("emptyAction")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
