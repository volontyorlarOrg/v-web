import { useTranslations } from "next-intl";

import { JsonLd } from "@/components/marketing/json-ld";
import type { Locale } from "@/i18n/routing";
import type { RouteKey } from "@/lib/routing/routes";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";

export function PageBreadcrumbJsonLd({
  locale,
  route,
}: {
  locale: Locale;
  route: Exclude<RouteKey, "home">;
}) {
  const t = useTranslations("nav");

  return (
    <JsonLd
      data={breadcrumbJsonLd({
        locale,
        trail: [
          { name: t("home"), route: "home" },
          { name: t(route), route },
        ],
      })}
    />
  );
}
