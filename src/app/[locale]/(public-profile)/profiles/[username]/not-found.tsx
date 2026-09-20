import { getLocale, getTranslations } from "next-intl/server";

export default async function PublicProfileNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "publicProfile" });
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-14 text-center">
      <div className="max-w-lg">
        <h1 className="text-headline text-balance">{t("notFound.title")}</h1>
        <p className="mt-4 text-lead text-pretty text-ink-muted">
          {t("notFound.body")}
        </p>
        <a
          href={`/${locale}`}
          className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-action px-5 text-sm font-semibold text-knockout transition-colors hover:bg-action-hover"
        >
          {t("notFound.home")}
        </a>
      </div>
    </section>
  );
}
