import { ICON_GLYPH, ICON_HEART } from "@/components/brand/logo-paths";
import { cn } from "@/lib/utils";

export function GlyphMark({ className }: { className?: string }) {
  return (
    <svg viewBox="150 250 700 620" aria-hidden="true" focusable="false" className={cn("shrink-0", className)}>
      <path d={ICON_GLYPH} fillRule="evenodd" fill="currentColor" />
      <path d={ICON_HEART} fillRule="evenodd" fill="currentColor" />
    </svg>
  );
}

export function HeartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="330 610 340 230" aria-hidden="true" focusable="false" className={cn("shrink-0", className)}>
      <path d={ICON_HEART} fill="currentColor" />
    </svg>
  );
}
