"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

import type { Room } from "@/components/marketing/hero-map/framing";
import type { MapScene } from "@/components/marketing/hero-map/scene";
import { easeOut, span } from "@/components/marketing/hero-map/timeline";
import type { LocalisedRegion } from "@/lib/map/regions";
import { cn } from "@/lib/utils";

const SMOOTHING_MS = 90;
const LONGEST_FRAME_MS = 64;
const SETTLED = 0.0004;
const MAX_PIXEL_RATIO = 2;
const MAX_CANVAS_PIXELS = 2_600_000;
const PRELOAD_MARGIN = "120% 0px";
const PIN_GAP = 6;
const PIN_ROOM = 44;
const STAGE_ROOM_TOP = 40;
const STAGE_ROOM_BOTTOM = 32;
const CAPTION_GAP = 20;
const BACKDROP_GAP = 24;
const HIDDEN = 0.04;
const PIN_SLOTS: Array<readonly [number, number]> = [
  [0, 0],
  [-1.1, 0],
  [1.1, 0],
  [0, -1.1],
  [0, 1.1],
  [-1.1, -1.1],
  [1.1, -1.1],
  [-1.1, 1.1],
  [1.1, 1.1],
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
  const mapWindowRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef(new Map<string, HTMLSpanElement>());
  const [active, setActive] = useState(false);
  const [pinned, setPinned] = useState(false);

  const westToEast = useMemo(
    () => [...regions].sort((first, second) => first.anchor[0] - second.anchor[0]),
    [regions],
  );
  const numbering = useMemo(
    () => new Map(westToEast.map((region, position) => [region.id, position + 1])),
    [westToEast],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const stage = stageRef.current;
    const mapWindow = mapWindowRef.current;
    const handoff = handoffRef.current;
    const canvas = canvasRef.current;
    const heroLayer = heroRef.current;
    const captionLayer = captionRef.current;
    if (
      !section ||
      !panel ||
      !stage ||
      !mapWindow ||
      !handoff ||
      !canvas ||
      !heroLayer ||
      !captionLayer
    )
      return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pins = pinRefs.current;

    let scene: MapScene | null = null;
    let cancelled = false;
    let frame = 0;
    let visible = false;
    let runway = false;
    let target = 0;
    let current = 0;
    let lastTick = 0;
    let room: Room = { hero: 0, top: 0, bottom: 0, side: PIN_ROOM, caption: 0 };

    const sizes = new Map<string, { width: number; height: number }>();

    function measurePins() {
      for (const [id, pin] of pins) {
        if (pin.offsetWidth > 0) {
          sizes.set(id, { width: pin.offsetWidth, height: pin.offsetHeight });
        }
      }
    }

    function readProgress(): number {
      if (reduceMotion) return 1;
      if (!section || !panel) return 0;
      const stickyTop = Number.parseFloat(getComputedStyle(panel).top) || 0;
      const travel = section.offsetHeight - panel.offsetHeight;
      if (travel <= 0) return 0;
      const scrolled = stickyTop - section.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, scrolled / travel));
    }

    function measureRoom() {
      if (!runway || !heroLayer || !captionLayer) {
        room = { hero: 0, top: 0, bottom: 0, side: PIN_ROOM, caption: 0 };
        return;
      }
      const copy = heroLayer.firstElementChild as HTMLElement | null;
      const heroBottom = copy ? heroLayer.offsetTop + copy.offsetTop + copy.offsetHeight : 0;
      room = {
        hero: heroBottom > 0 ? heroBottom + BACKDROP_GAP : 0,
        top: STAGE_ROOM_TOP,
        bottom: STAGE_ROOM_BOTTOM,
        side: PIN_ROOM,
        caption: captionLayer.offsetHeight + CAPTION_GAP,
      };
    }

    function positionPins() {
      if (!scene || !stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const placed: Array<[number, number, number, number]> = [];

      const markers = scene
        .projectMarkers(width, height)
        .sort((first, second) => first.y - second.y);

      for (const marker of markers) {
        const pin = pins.get(marker.id);
        if (!pin) continue;

        const size = sizes.get(marker.id);
        const onScreen = marker.depth > -1 && marker.depth < 1 && marker.reveal > 0.02;
        let slot: readonly [number, number] | null = onScreen ? PIN_SLOTS[0] : null;

        if (onScreen && size) {
          slot = null;
          for (const candidate of PIN_SLOTS) {
            const dx = candidate[0] * (size.width + PIN_GAP);
            const dy = candidate[1] * (size.height + PIN_GAP);
            const left = marker.x + dx - size.width / 2;
            const top = marker.y + dy - size.height / 2;
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

        pin.style.opacity = slot === null ? "0" : String(Math.min(1, marker.reveal * 1.8));
        if (slot !== null) {
          const x = marker.x + slot[0];
          const y = marker.y + slot[1];
          pin.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }
      }
    }

    function layer(element: HTMLDivElement, opacity: number, shift: number, guard: boolean) {
      element.style.opacity = String(opacity);
      element.style.transform = shift === 0 ? "" : `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      const hidden = opacity < HIDDEN;
      if (guard && element.inert !== hidden) element.inert = hidden;
      element.style.pointerEvents = hidden ? "none" : "";
    }

    function paint() {
      if (!scene || !stage || !mapWindow || !handoff) return;
      const { emerge, settle } = scene.render(current, room);
      const handoffProgress = easeOut(span(emerge, 0, 0.82));
      const shutterTop = (1 - handoffProgress) * 72;
      mapWindow.style.clipPath = `inset(${shutterTop.toFixed(2)}% 0 0 0)`;
      mapWindow.style.opacity = String(0.48 + handoffProgress * 0.52);
      handoff.style.opacity = String(1 - span(emerge, 0.72, 1));
      handoff.style.transform = `translate3d(0, ${(stage.clientHeight * shutterTop) / 100}px, 0) scaleX(${(0.16 + handoffProgress * 0.84).toFixed(3)})`;
      if (!reduceMotion && heroLayer && captionLayer) {
        const heroOut = span(emerge, 0.16, 0.92);
        layer(heroLayer, 1 - heroOut, heroOut * -24, true);
        const captionIn = span(settle, 0.1, 0.85);
        layer(captionLayer, captionIn, (1 - captionIn) * 20, false);
      }
      positionPins();
    }

    function step(now: number) {
      frame = 0;
      const elapsed = lastTick ? Math.min(LONGEST_FRAME_MS, now - lastTick) : LONGEST_FRAME_MS / 4;
      lastTick = now;
      const distance = target - current;
      current =
        Math.abs(distance) < SETTLED
          ? target
          : current + distance * (1 - Math.exp(-elapsed / SMOOTHING_MS));
      paint();
      if (current !== target && visible) frame = requestAnimationFrame(step);
      else lastTick = 0;
    }

    function schedule() {
      if (!scene || frame !== 0) return;
      frame = requestAnimationFrame(step);
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
      measurePins();
      measureRoom();
      paint();
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
      } else {
        flushSync(() => setPinned(true));
        runway = true;
        target = readProgress();
      }
      current = target;

      applySize();
      setActive(true);
    }

    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(stage);
    resizeObserver.observe(captionLayer);
    if (heroLayer.firstElementChild) resizeObserver.observe(heroLayer.firstElementChild);

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
            ref={mapWindowRef}
            className="absolute inset-0"
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
                    const map = pinRefs.current;
                    if (node) map.set(region.id, node);
                    else map.delete(region.id);
                  }}
                  className="absolute top-0 left-0 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/35 bg-surface text-xs leading-none font-semibold tabular-nums text-primary-ink opacity-0 shadow-[0_1px_3px_rgb(0_0_0/0.14)]"
                >
                  {numbering.get(region.id)}
                </span>
              ))}
            </div>
          </div>

          <span
            ref={handoffRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-center bg-primary opacity-0"
          />
        </div>

        <div
          ref={captionRef}
          className={cn(
            "z-10",
            pinned ? "absolute inset-x-0 bottom-0 pb-10 sm:pb-14" : "relative pt-10 pb-10 sm:pb-14",
          )}
        >
          <div className="container-page lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
            {caption}
            <div>
              <h2 id="regions-index-heading" className="sr-only">
                {regionsHeading}
              </h2>
              <ol
                aria-labelledby="regions-index-heading"
                className="mt-7 grid grid-flow-col grid-cols-2 [grid-template-rows:repeat(7,auto)] gap-x-5 gap-y-1.5 lg:mt-0 lg:gap-x-10"
              >
                {westToEast.map((region, position) => (
                  <li
                    key={region.id}
                    className="flex items-baseline gap-2 text-xs leading-snug text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="w-4 shrink-0 text-right font-semibold tabular-nums text-primary"
                    >
                      {position + 1}
                    </span>
                    <span className="text-pretty">{region.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
