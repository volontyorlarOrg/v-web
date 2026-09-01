import { cn } from "@/lib/utils";

/**
 * The YVC mark, inlined from the delivered geometry in docs/brand/LOGO_SPEC.md
 * (arc centre 100,72 · radius 59 · stroke 13 · dot centre 100,76 · radius 20).
 *
 * It is inlined rather than loaded through `next/image` so it inherits
 * `currentColor` and costs no extra request. The wordmark is real HTML text in
 * the site typeface: `public/logo/lockup-horizontal.svg` sets its wordmark as
 * SVG `<text>` in a font an isolated SVG cannot load, so it renders differently
 * on every platform. See .agent-memory/gotchas/svg-lockup-wordmark-font.md.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <circle cx="100" cy="76" r="20" fill="currentColor" />
      <path
        d="M 41.74 81.30 A 59 59 0 0 0 158.26 81.30"
        fill="none"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The arc alone — a graphic device derived from the mark, not the mark itself.
 * Used for large decorative shapes so the logo is never cropped, tinted, or
 * rendered below its 16px minimum size (docs/brand/LOGO_SPEC.md).
 */
export function BrandArc({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M 41.74 81.30 A 59 59 0 0 0 158.26 81.30"
        fill="none"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLockup({
  name,
  shortName,
  className,
  tone = "primary",
}: {
  name: string;
  shortName: string;
  className?: string;
  tone?: "primary" | "inverse";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark
        className={cn(
          "size-8",
          tone === "primary" ? "text-primary" : "text-primary-fg",
        )}
      />
      <span
        className={cn(
          "text-[1.0625rem] leading-none font-bold tracking-[-0.02em]",
          tone === "primary" ? "text-ink" : "text-primary-fg",
        )}
      >
        {/* The full name needs room; narrow screens get the abbreviation. */}
        <span className="hidden sm:inline">{name}</span>
        <span className="sm:hidden">{shortName}</span>
      </span>
    </span>
  );
}
