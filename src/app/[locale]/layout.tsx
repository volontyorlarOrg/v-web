import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Onest } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { marketingOrigin } from "@/lib/seo/origin";
import "../globals.css";

/**
 * One typeface for the whole site. Onest is the face the delivered logo
 * specification verified for U+02BB (the ʻ in oʻ/gʻ), and it carries Cyrillic,
 * so Uzbek, Russian, and English all render in the same voice. Keeping it to a
 * single variable family also keeps the mobile payload small.
 */
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

  // Only the namespaces a Client Component can reach are serialised into the
  // HTML. Handing the provider the whole catalog would ship every page's copy,
  // in every locale-specific document, for no benefit: the marketing pages are
  // Server Components and the two client components take their labels as props.
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
