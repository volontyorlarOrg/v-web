import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

import { ActionLink } from "@/components/marketing/action-link";
import type { Locale } from "@/i18n/routing";
import { joinDestination, signupDestination } from "@/lib/content/cta";
import { TEAM_ROWS, type TeamPhoto } from "@/lib/content/home";

const ROW_DURATION = ["80s", "90s"] as const;

function PhotoList({ photos, hidden, alt }: { photos: readonly TeamPhoto[]; hidden: boolean; alt: (photo: TeamPhoto) => string }) {
  return (
    <ul aria-hidden={hidden || undefined} className="m-0 flex list-none gap-4 px-2">
      {photos.map((photo, index) => (
        <li
          key={`${photo.id}-${index}`}
          className="h-[150px] flex-none overflow-hidden rounded-[18px] bg-fog-150 min-[981px]:h-[230px]"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Image
            src={photo.src}
            alt={hidden ? "" : alt(photo)}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 980px) 200px, 410px"
            className="block size-full object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

export function TeamSection({ locale }: { locale: Locale }) {
  const t = useTranslations("home.team");
  const signup = signupDestination(locale) ?? joinDestination();
  const alt = (photo: TeamPhoto) => t(`photos.${photo.id}`);

  return (
    <section
      id="jamoa"
      aria-labelledby="team-title"
      className="overflow-hidden bg-knockout pt-28 pb-[120px] text-navy-900 max-[980px]:pt-20 max-[980px]:pb-20"
    >
      <div className="px-5 text-center">
        <h2
          id="team-title"
          className="m-0 text-[48px] leading-[0.98] font-extrabold tracking-[-0.045em] min-[981px]:text-[72px]"
        >
          {t("title")} <span className="text-orange-600">{t("titleAccent")}</span>
        </h2>
        <p className="mx-auto mt-5 mb-0 max-w-[560px] text-xl leading-[1.5] text-fog-600">{t("lead")}</p>
        <ActionLink
          destination={signup}
          className="orange-lift mt-9 inline-flex h-16 items-center gap-4 rounded-full bg-orange-600 pr-2 pl-[30px] text-lg font-bold text-knockout"
        >
          {t("cta")}
          <span className="lift-arrow flex size-12 items-center justify-center rounded-full bg-knockout text-orange-600">
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.6} />
          </span>
        </ActionLink>
      </div>

      <div className="marquee-pause mt-16 grid gap-4">
        {TEAM_ROWS.map((row, index) => (
          <div
            key={ROW_DURATION[index]}
            className="marquee-run"
            data-reverse={index === 1 ? "" : undefined}
            style={{ "--run": ROW_DURATION[index] } as CSSProperties}
          >
            <PhotoList photos={row} hidden={false} alt={alt} />
            <PhotoList photos={row} hidden alt={alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
