"use client";

import { Share } from "lucide-react";
import { useState } from "react";

export function ShareButton({ url, title, labels }: { url: string; title: string; labels: { share: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? labels.copied : labels.share}
      title={copied ? labels.copied : labels.share}
      className="flex size-[50px] flex-none items-center justify-center rounded-xl border-[1.5px] border-fog-300 bg-knockout text-navy-900 transition-colors hover:bg-fog-100"
    >
      <Share aria-hidden="true" className="size-[19px]" strokeWidth={2} />
      <span aria-live="polite" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
    </button>
  );
}
