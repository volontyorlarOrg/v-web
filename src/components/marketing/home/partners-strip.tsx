import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { MARQUEE_COPIES, PARTNER_LOGOS } from "@/lib/content/home";

export function PartnersStrip() {
  const t = useTranslations("home.partners");

  return (
    <section id="hamkorlar" aria-label={t("label")} className="overflow-hidden bg-knockout pt-11 pb-[52px]">
      <div className="marquee-strip marquee-pause mt-7">
        <div className="marquee-run" style={{ "--run": "16s", "--copies": MARQUEE_COPIES } as CSSProperties}>
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
            <ul
              key={copy}
              aria-hidden={copy > 0 || undefined}
              className="m-0 flex list-none items-center gap-24 px-12 max-[980px]:gap-14"
            >
              {PARTNER_LOGOS.map((logo) => (
                <li key={logo.id} className="flex-none">
                  <Image
                    src={logo.src}
                    alt={copy > 0 ? "" : t(`logos.${logo.id}`)}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    loading="eager"
                    draggable={false}
                    className="partner-logo block w-auto"
                    style={{ height: logo.displayHeight }}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
