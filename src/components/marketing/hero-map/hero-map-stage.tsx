"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import type { MapScene } from "@/components/marketing/hero-map/scene";
import type { LocalisedRegion } from "@/lib/map/regions";
import { cn } from "@/lib/utils";

const SMOOTHING = 0.14;
const SETTLED = 0.0004;
const MAX_PIXEL_RATIO = 2;
const MAX_CANVAS_PIXELS = 2_600_000;
const PRELOAD_MARGIN = "120% 0px";
const LABEL_GAP = 10;
const HIDDEN = 0.04;
const LABEL_SLOTS: Array<readonly [number, number]> = [
  [0, 0],
  [-0.62, 0],
  [0.62, 0],
  [0, -1.15],
  [-0.62, -1.15],
  [0.62, -1.15],
  [-1.18, 0],
  [1.18, 0],
  [0, -2.3],
];

type Props = {
  regions: readonly LocalisedRegion[];
  fallback: ReactNode;
  hero: ReactNode;
  caption: ReactNode;
  regionsHeading: string;
};

export function HeroMapStage({ regions, fallback, hero, caption, regionsHeading }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const [active, setActive] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const heroLayer = heroRef.current;
    const captionLayer = captionRef.current;
    if (!section || !panel || !stage || !canvas || !heroLayer || !captionLayer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const labels = labelRefs.current;

    let scene: MapScene | null = null;
    let cancelled = false;
    let frame = 0;
    let visible = false;
    let target = 0;
    let current = 0;

    const sizes = new Map<string, { width: number; height: number }>();

    function measureLabels() {
      for (const [id, label] of labels) {
        if (label.offsetWidth > 0) {
          sizes.set(id, { width: label.offsetWidth, height: label.offsetHeight });
        }
      }
    }

    function readProgress(): number {
      if (!section || !panel || reduceMotion) return 0;
      const stickyTop = Number.parseFloat(getComputedStyle(panel).top) || 0;
      const travel = section.offsetHeight - panel.offsetHeight;
      if (travel <= 0) return 0;
      const scrolled = stickyTop - section.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, scrolled / travel));
    }

    function positionLabels() {
      if (!scene || !stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const placed: Array<[number, number, number, number]> = [];

      const markers = scene
        .projectMarkers(width, height)
        .sort((first, second) => first.y - second.y);

      for (const marker of markers) {
        const label = labels.get(marker.id);
        if (!label) continue;

        const size = sizes.get(marker.id);
        const onScreen = marker.depth > -1 && marker.depth < 1 && marker.reveal > 0.02;
        let slot: readonly [number, number] | null = onScreen ? LABEL_SLOTS[0] : null;

        if (onScreen && size) {
          slot = null;
          for (const candidate of LABEL_SLOTS) {
            const dx = candidate[0] * size.width;
            const dy = candidate[1] * (size.height + LABEL_GAP);
            const left = marker.x + dx - size.width / 2;
            const top = marker.y + dy - size.height - LABEL_GAP;
            const box: [number, number, number, number] = [
              left,
              top,
              left + size.width,
              top + size.height,
            ];
            const clash = placed.some(
              ([l, t, r, b]) => box[0] < r && box[2] > l && box[1] < b && box[3] > t,
            );
            if (!clash) {
              placed.push(box);
              slot = [dx, dy];
              break;
            }
          }
        }

        label.style.opacity = slot === null ? "0" : String(Math.min(1, marker.reveal * 1.8));
        if (slot !== null) {
          const x = marker.x + slot[0];
          const y = marker.y + slot[1];
          label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }
      }
    }

    function layer(element: HTMLDivElement, opacity: number, shift: number) {
      element.style.opacity = String(opacity);
      element.style.transform = shift === 0 ? "" : `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      const hidden = opacity < HIDDEN;
      if (element.inert !== hidden) element.inert = hidden;
      element.style.pointerEvents = hidden ? "none" : "";
    }

    function draw() {
      frame = 0;
      if (!scene) return;
      const distance = target - current;
      current = Math.abs(distance) < SETTLED ? target : current + distance * SMOOTHING;

      const { emerge } = scene.render(current);
      if (!reduceMotion && heroLayer && captionLayer) {
        const heroOut = Math.min(1, emerge * 1.5);
        layer(heroLayer, 1 - heroOut, heroOut * -28);
        const captionIn = Math.max(0, (emerge - 0.45) / 0.55);
        layer(captionLayer, captionIn, (1 - captionIn) * 16);
      }
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
      if (!scene || !stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width === 0 || height === 0) return;
      const budget = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
      const ratio = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO, budget));
      scene.resize(width, height, ratio);
      measureLabels();
      draw();
    }

    async function start() {
      if (scene || cancelled || !canvas) return;
      try {
        const { createMapScene, readPalette } = await import(
          "@/components/marketing/hero-map/scene"
        );
        if (cancelled) return;
        scene = createMapScene(canvas, readPalette(document.documentElement));
      } catch {
        return;
      }

      if (reduceMotion) {
        target = 1;
        current = 1;
      } else {
        setPinned(true);
        target = readProgress();
        current = target;
      }

      applySize();
      setActive(true);
      requestAnimationFrame(() => {
        target = readProgress();
        applySize();
      });
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
      id="hero-map"
      className={cn(
        "relative border-b border-border bg-paper",
        pinned && "h-[280svh] sm:h-[300svh] lg:h-[340svh]",
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          "overflow-hidden",
          pinned
            ? "sticky top-16 h-[calc(100svh-4rem)] lg:top-20 lg:h-[calc(100svh-5rem)]"
            : "relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)]",
        )}
      >
        <div
          ref={heroRef}
          className={cn(
            "z-10",
            pinned
              ? "pointer-events-none absolute inset-x-0 top-0 flex h-[84%] items-center"
              : "relative pt-14 sm:pt-20",
          )}
        >
          <div className="pointer-events-auto container-page w-full">{hero}</div>
        </div>

        <div
          ref={stageRef}
          className={cn(pinned ? "absolute inset-0" : "relative min-h-[46svh] w-full")}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center px-6 opacity-40 transition-opacity duration-700",
              active && "opacity-0",
            )}
          >
            {fallback}
          </div>

          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {regions.map((region) => (
              <span
                key={region.id}
                ref={(node) => {
                  const map = labelRefs.current;
                  if (node) map.set(region.id, node);
                  else map.delete(region.id);
                }}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[calc(100%+0.625rem)] rounded-full border border-border bg-surface/90 px-2 py-0.5 text-xs leading-tight font-semibold whitespace-nowrap text-primary-ink opacity-0"
              >
                {region.name}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={captionRef}
          className={cn(
            "z-10",
            pinned
              ? "absolute inset-x-0 bottom-0 pb-10 sm:pb-14"
              : "relative pt-10 pb-10 sm:pb-14",
          )}
        >
          <div className="container-page">{caption}</div>
        </div>
      </div>

      <h2 className="sr-only">{regionsHeading}</h2>
      <ul className="sr-only">
        {regions.map((region) => (
          <li key={region.id}>{region.name}</li>
        ))}
      </ul>
    </section>
  );
}
