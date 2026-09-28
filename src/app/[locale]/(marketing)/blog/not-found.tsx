import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function BlogNotFound() {
  const t = await getTranslations("blog");
  return (
    <div className="container-page py-24">
      <h1 className="font-serif text-4xl text-ink">{t("notFound")}</h1>
      <Link
        href="/blog"
        className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary-ink hover:underline"
      >
        ← {t("back")}
      </Link>
    </div>
  );
}
