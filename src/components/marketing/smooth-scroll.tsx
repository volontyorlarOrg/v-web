"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const HEADER_OFFSET = -80;

export function SmoothScroll() {
  useEffect(() => {
    if (document.documentElement.dataset.motion === undefined) return;

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: HEADER_OFFSET } });
    return () => lenis.destroy();
  }, []);

  return null;
}
