import { getTranslations } from "next-intl/server";

import { legalContact, LEGAL_OPERATORS } from "@/lib/legal/document";

export async function LegalContact() {
  const t = await getTranslations("legal");
  const { email, address } = legalContact();
  return (
    <section id="contact" className="mt-10 border-t border-border pt-6">
      <h2 className="font-sans text-xl font-semibold text-ink">
        {t("contact")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {t("responsible")}: {LEGAL_OPERATORS.join(" · ")}
      </p>
      {email ? (
        <a
          className="mt-2 block break-all text-primary-ink underline underline-offset-4"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      ) : null}
      {address ? (
        <p className="mt-2 whitespace-pre-line text-sm text-ink-muted">
          {address}
        </p>
      ) : null}
      {!email || !address ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("pending")}
        </p>
      ) : null}
    </section>
  );
}
