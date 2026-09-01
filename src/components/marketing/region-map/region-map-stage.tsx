"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import type { MapScene } from "@/components/marketing/region-map/scene";
import type { LocalisedRegion } from "@/lib/map/regions";
import { cn } from "@/lib/utils";

const STATIC_PROGRESS = 1;
const SMOOTHING = 0.14;
const SETTLED = 0.0004;
const MAX_PIXEL_RATIO = 2;
const PRELOAD_MARGIN = "120% 0px";
const LABEL_GAP = 8;

type Props = {
  regions: readonly LocalisedRegion[];
  fallback: ReactNode;
  children: ReactNode;
  regionsHeading: string;
};

export function RegionMapStage({ regions, fallback, children, regionsHeading }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !panel || !stage || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const labels = labelRefs.current;

    let scene: MapScene | null = null;
    let cancelled = false;
    let frame = 0;
    let visible = false;
    let target = reduceMotion ? STATIC_PROGRESS : 0;
    let current = target;

    function readProgress(): number {
      if (!section || !panel) return 0;
      const stickyTop = Number.parseFloat(getComputedStyle(panel).top) || 0;
      const travel = section.offsetHeight - panel.offsetHeight;
      if (travel <= 0) return 0;
      const scrolled = stickyTop - section.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, scrolled / travel));
    }

    const sizes = new Map<string, { width: number; height: number }>();

    function measureLabels() {
      for (const [id, label] of labels) {
        if (label.offsetWidth > 0) sizes.set(id, { width: label.offsetWidth, height: label.offsetHeight });
      }
    }

    function positionLabels() {
      if (!scene || !stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;

      const placed: Array<[number, number, number, number]> = [];

      for (const pin of scene.projectPins(width, height)) {
        const label = labels.get(pin.id);
        if (!label) continue;

        const size = sizes.get(pin.id);
        const visible = pin.depth > -1 && pin.depth < 1 && pin.reveal > 0.02;
        let show = visible;

        if (visible && size) {
          const left = pin.x - size.width / 2;
          const top = pin.y - size.height - LABEL_GAP;
          const box: [number, number, number, number] = [
            left,
            top,
            left + size.width,
            top + size.height,
          ];
          const clashes = placed.some(
            ([l, t, r, b]) => box[0] < r && box[2] > l && box[1] < b && box[3] > t,
          );
          if (clashes) show = false;
          else placed.push(box);
        }

        label.style.opacity = show ? String(Math.min(1, pin.reveal * 1.6)) : "0";
        if (!show) continue;
        label.style.transform = `translate3d(${pin.x.toFixed(1)}px, ${pin.y.toFixed(1)}px, 0)`;
      }
    }

    function draw() {
      frame = 0;
      if (!scene) return;
      const distance = target - current;
      current = Math.abs(distance) < SETTLED ? target : current + distance * SMOOTHING;
      scene.render(current);
      positionLabels();
      if (current !== target && visible) frame = requestAnimationFrame(draw);
    }

    function schedule() {
      if (!scene || frame !== 0) return;
      frame = requestAnimationFrame(draw);
    }

    function onScroll() {
      if (reduceMotion || !visible) return;
      target = readProgress();
      schedule();
    }

    function applySize() {
      if (!scene || !stage || !canvas) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width === 0 || height === 0) return;
      scene.resize(width, height, Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      measureLabels();
      scene.render(current);
      positionLabels();
    }

    async function start() {
      if (scene || cancelled || !canvas) return;
      try {
        const { createMapScene, readPalette } = await import(
          "@/components/marketing/region-map/scene"
        );
        if (cancelled) return;
        scene = createMapScene(canvas, readPalette(document.documentElement));
      } catch {
        return;
      }
      target = reduceMotion ? STATIC_PROGRESS : readProgress();
      current = target;
      applySize();
      setActive(true);
    }

    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(stage);

    const preload = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          preload.disconnect();
          void start();
        }
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    preload.observe(section);

    const visibility = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) onScroll();
    });
    visibility.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelled = true;
      preload.disconnect();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      scene?.dispose();
      scene = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="regions-map"
      aria-labelledby="regions-map-heading"
      className="relative border-b border-border bg-surface-sunk h-[240svh] sm:h-[260svh] lg:h-[300svh]"
    >
      <div
        ref={panelRef}
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden lg:top-20 lg:h-[calc(100svh-5rem)]"
      >
        <div className="container-page flex h-full flex-col justify-center gap-6 py-8 sm:gap-8 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div className="shrink-0 lg:self-center">{children}</div>

          <div
            ref={stageRef}
            className="relative min-h-56 flex-1 max-h-[36svh] lg:h-full lg:max-h-none"
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                active && "opacity-0",
              )}
            >
              {fallback}
            </div>

            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className={cn(
                "absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-700",
                active && "opacity-100",
              )}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {regions.map((region) => (
                <span
                  key={region.id}
                  ref={(node) => {
                    const labels = labelRefs.current;
                    if (node) labels.set(region.id, node);
                    else labels.delete(region.id);
                  }}
                  className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] rounded-full border border-border bg-surface/90 px-2 py-0.5 text-xs leading-tight font-semibold whitespace-nowrap text-primary-ink opacity-0"
                  style={{ willChange: "transform, opacity" }}
                >
                  {region.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h3 className="sr-only">{regionsHeading}</h3>
      <ul className="sr-only">
        {regions.map((region) => (
          <li key={region.id}>{region.name}</li>
        ))}
      </ul>
    </section>
  );
}
