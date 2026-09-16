"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const HEADER_OFFSET = -80;

export function SmoothScroll() {
  useEffect(() => {
    if (document.documentElement.dataset.motion === undefined) return;

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: HEADER_OFFSET } });
    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
