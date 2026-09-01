import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Onest } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { marketingOrigin } from "@/lib/seo/origin";
import "../globals.css";

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "common" });

  return {
    metadataBase: new URL(marketingOrigin()),
    title: {
      default: t("organizationName"),
      template: `%s · ${t("organizationShortName")}`,
    },
    applicationName: t("organizationName"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${onest.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={{ nav: messages.nav }}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
