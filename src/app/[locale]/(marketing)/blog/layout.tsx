import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function BlogLayout({ children, params }: LayoutProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <NextIntlClientProvider locale={locale} messages={{ blog: { error: t("error"), retry: t("retry") } }}>
      {children}
    </NextIntlClientProvider>
  );
}
