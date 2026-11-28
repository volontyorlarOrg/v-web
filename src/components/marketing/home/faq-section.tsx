import { useTranslations } from "next-intl";

import { OFFICIAL_LINKS } from "@/lib/constants/channels";
import { FAQ_IDS } from "@/lib/content/home";

export function FaqSection() {
  const t = useTranslations("home.faq");

  return (
    <section
      id="savollar"
      aria-labelledby="faq-title"
      className="overflow-hidden bg-fog-50 pt-28 text-navy-900 max-[980px]:pt-20"
    >
      <div className="px-5 text-center">
        <h2 id="faq-title" className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] min-[981px]:text-[56px]">
          {t("title")}
        </h2>
        <p className="mt-4 mb-0 text-[19px] leading-[1.5] text-fog-600">
          {t.rich("lead", {
            link: (chunks) => (
              <a
                href={OFFICIAL_LINKS.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[860px] px-5">
        {FAQ_IDS.map((id, index) => (
          <details key={id} className="faq-item" open={index === 0}>
            <summary className="flex items-center justify-between gap-6 py-6 text-xl font-bold tracking-[-0.01em] transition-colors hover:text-blue-600">
              <span>{t(`items.${id}.question`)}</span>
              <span aria-hidden="true" className="faq-toggle" />
            </summary>
            <p className="m-0 pr-16 pb-[26px] text-[17px] leading-[1.6] text-fog-600 max-[600px]:pr-2">
              {t(`items.${id}.answer`)}
            </p>
          </details>
        ))}
      </div>

      <div aria-hidden="true" className="mt-[88px]">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/pattern/islimi-wave-static.svg" />
          <img
            src="/pattern/islimi-wave.svg"
            alt=""
            width={1440}
            height={240}
            loading="lazy"
            className="block h-40 w-full object-cover min-[981px]:h-60"
          />
        </picture>
      </div>
    </section>
  );
}
