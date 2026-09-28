import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleView } from "@/components/blog/article-view";
import type { Locale } from "@/i18n/routing";
import { getBlogPreview } from "@/lib/blog/blog.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BlogPreviewPage({
  params,
}: PageProps<"/[locale]/blog/preview/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const token = (await cookies()).get("blog_preview")?.value;
  const article = token ? await getBlogPreview(slug, locale as Locale, token) : null;
  if (!article)
    return (
      <div className="container-page py-24">
        <div className="max-w-xl rounded-lg border border-border bg-surface p-8">
          <h1 className="font-serif text-3xl text-ink">{t("previewExpiredTitle")}</h1>
          <p className="mt-3 leading-relaxed text-ink-muted">{t("previewExpiredBody")}</p>
        </div>
      </div>
    );
  return (
    <ArticleView
      article={article}
      locale={locale as Locale}
      preview
      labels={{
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
        missingTitle: t("missingTitle"),
        missingSummary: t("missingSummary"),
        missingBody: t("missingBody"),
      }}
    />
  );
}
