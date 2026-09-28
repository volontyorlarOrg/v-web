"use client";

import { useTranslations } from "next-intl";

export default function BlogError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("blog");
  return (
    <div className="container-page py-24">
      <div className="max-w-xl rounded-lg border border-border bg-surface p-8">
        <h1 className="font-serif text-3xl text-ink">{t("error")}</h1>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-action px-5 font-semibold text-knockout hover:bg-action-hover"
        >
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
