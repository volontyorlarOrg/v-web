"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ENTER_MARGIN = "0px 0px -12% 0px";

export function SceneObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.dataset.motion === undefined) return;

    const enter = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-in", "");
        observer.unobserve(entry.target);
      }
    };

    const onEnter = new IntersectionObserver(enter, { rootMargin: ENTER_MARGIN });
    const onFullyVisible = new IntersectionObserver(enter, { threshold: 1 });

    for (const scene of document.querySelectorAll<HTMLElement>("[data-scene]:not([data-in])")) {
      const box = scene.getBoundingClientRect();
      if (box.bottom < 0) {
        scene.setAttribute("data-in", "");
        continue;
      }
      const fitsViewport = box.height <= window.innerHeight;
      (scene.dataset.scene === "full" && fitsViewport ? onFullyVisible : onEnter).observe(scene);
    }

    return () => {
      onEnter.disconnect();
      onFullyVisible.disconnect();
    };
  }, [pathname]);

  return null;
}
