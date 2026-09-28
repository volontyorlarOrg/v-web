import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleView } from "@/components/blog/article-view";
import type { Locale } from "@/i18n/routing";
import { getBlogArticle, blogMediaUrl } from "@/lib/blog/blog.server";
import { hasVerifiedMarketingOrigin, marketingUrl } from "@/lib/seo/origin";

function articleUrl(locale: Locale, slug: string) {
  return marketingUrl(`/${locale}/blog/${encodeURIComponent(slug)}`);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getBlogArticle(slug, locale as Locale);
  if (!article) {
    const t = await getTranslations({ locale, namespace: "blog" });
    return { title: t("notFound"), robots: { index: false, follow: false } };
  }
  const sourceLocale = article.contentLocale;
  const canonical = articleUrl(sourceLocale, slug);
  const images = blogMediaUrl(article.coverUrl);
  return {
    title: article.title,
    description: article.seoDescription || article.summary,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        article.availableLocales.map((candidate) => [
          candidate,
          articleUrl(candidate, slug),
        ]),
      ),
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: canonical,
      locale:
        sourceLocale === "uz"
          ? "uz_UZ"
          : sourceLocale === "ru"
            ? "ru_RU"
            : "en_US",
      publishedTime: article.publishedAt ?? undefined,
      images: images ? [{ url: images, alt: article.coverAlt }] : undefined,
    },
    robots: {
      index: hasVerifiedMarketingOrigin() && sourceLocale === locale,
      follow: true,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getBlogArticle(slug, locale as Locale);
  if (!article) notFound();
  const t = await getTranslations("blog");
  const labels = {
    eyebrow: t("eyebrow"),
    back: t("back"),
    fallback: t("fallback", {
      language: t(`languages.${article.contentLocale}`),
    }),
    preview: t("preview"),
    previewNotice: t("previewNotice"),
    author: t.raw("author") as string,
    published: t.raw("published") as string,
    credit: t.raw("credit") as string,
    availableIn: t("availableIn"),
    languages: {
      uz: t("languageNames.uz"),
      ru: t("languageNames.ru"),
      en: t("languageNames.en"),
    },
  };
  const url = articleUrl(article.contentLocale, slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    inLanguage: article.contentLocale,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: url,
    url,
    publisher: { "@type": "Organization", name: "Volontyorlar" },
    ...(article.authorName
      ? { author: { "@type": "Person", name: article.authorName } }
      : {}),
    ...(blogMediaUrl(article.coverUrl) ? { image: [blogMediaUrl(article.coverUrl)] } : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticleView
        article={article}
        locale={locale as Locale}
        labels={labels}
      />
    </>
  );
}
