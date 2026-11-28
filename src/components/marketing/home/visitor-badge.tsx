"use client";

import { Camera } from "lucide-react";
import { useState, type ChangeEvent } from "react";

import { GlyphMark } from "@/components/marketing/home/marks";

export function VisitorBadge({
  labels,
}: {
  labels: { photoLabel: string; photoHint: string; nameLabel: string; namePlaceholder: string };
}) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label
        title={labels.photoHint}
        className="badge-photo relative mt-[26px] block size-[116px] cursor-pointer rounded-full"
      >
        <span className="sr-only">{labels.photoLabel}</span>
        <input type="file" accept="image/*" onChange={pick} className="sr-only" />
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-navy-600 shadow-[0_0_0_4px_var(--color-knockout),0_8px_18px_-8px_color-mix(in_srgb,var(--color-navy-900)_50%,transparent)]">
          {photo ? (
            <img src={photo} alt="" className="size-full object-cover" />
          ) : (
            <GlyphMark className="h-[69px] w-[78px] text-knockout" />
          )}
        </span>
        <span
          aria-hidden="true"
          className="absolute right-[-2px] bottom-0 flex size-8 items-center justify-center rounded-full bg-knockout text-navy-900 shadow-[0_0_0_1px_var(--color-fog-250),0_4px_10px_-4px_color-mix(in_srgb,var(--color-navy-900)_40%,transparent)]"
        >
          <Camera className="size-[15px]" strokeWidth={2.2} />
        </span>
      </label>

      <label className="mt-[26px] block">
        <span className="sr-only">{labels.nameLabel}</span>
        <textarea
          rows={2}
          maxLength={32}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={labels.namePlaceholder}
          className="badge-name block h-20 w-full resize-none overflow-hidden rounded-md border-0 bg-transparent p-0 text-left text-4xl leading-[1.06] font-extrabold tracking-[-0.035em] text-navy-900"
        />
      </label>
    </>
  );
}
