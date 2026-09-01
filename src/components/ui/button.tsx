import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Shared action styling. Solid actions use `primary-ink` rather than the
 * lighter brand blue because white label text needs the 4.5:1 floor, which
 * `#007FC2` does not reach. See docs/brand/BRAND_ASSETS.md.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-ink text-primary-fg hover:-translate-y-0.5 hover:bg-primary-deep",
        outline:
          "border border-border-control bg-transparent text-ink hover:border-primary-ink hover:bg-surface-soft hover:text-primary-ink",
        ghost: "text-primary-ink hover:bg-surface-soft",
        inverse:
          "bg-primary-fg text-primary-ink hover:-translate-y-0.5 hover:bg-primary-muted",
      },
      size: {
        // 44px and 52px keep every control inside the mobile touch-target floor.
        sm: "min-h-11 px-4 text-sm",
        md: "min-h-13 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function buttonClass(
  props: ButtonVariantProps & { className?: string } = {},
) {
  const { className, ...variants } = props;
  return cn(buttonVariants(variants), className);
}
