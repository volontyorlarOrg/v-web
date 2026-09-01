import { Onest } from "next/font/google";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { BrandMark } from "@/components/brand/logo";
import { defaultLocale, localeNames, locales } from "@/i18n/routing";
import { ORGANIZATION_NAME } from "@/lib/content/org";
import { localePath } from "@/lib/routing/routes";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: defaultLocale, namespace: "notFound" });
  return {
    title: `${t("metaTitle")} · ${ORGANIZATION_NAME}`,
    robots: { index: false, follow: false },
  };
}

export default async function GlobalNotFound() {
  const messages = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      t: await getTranslations({ locale, namespace: "notFound" }),
    })),
  );

  return (
    <html lang={defaultLocale} className={`${onest.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <main className="container-page flex flex-1 flex-col justify-center py-20">
          <BrandMark className="size-12 text-primary" />
          <p className="mt-8 text-xs font-bold tracking-[0.14em] text-ink-muted uppercase">
            404
          </p>
          <ul className="mt-6 space-y-8">
            {messages.map(({ locale, t }) => (
              <li key={locale} lang={locale}>
                <h1 className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                  {t("title")}
                </h1>
                <p className="mt-2 text-ink-muted">{t("description")}</p>
                <a
                  href={localePath(locale, "home")}
                  hrefLang={locale}
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary-ink underline underline-offset-4"
                >
                  {t("action")}
                  <span className="ml-2 text-sm font-normal text-ink-muted">
                    ({localeNames[locale]})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
