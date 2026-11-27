"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Script from "next/script";

export function GoogleTag({ containerId }: { containerId: string }) {
  const [section, page] = useSelectedLayoutSegments();
  if (section === "blog" && page === "preview") return null;

  return (
    <>
      <Script id="google-tag-init">
        {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`} />
    </>
  );
}
