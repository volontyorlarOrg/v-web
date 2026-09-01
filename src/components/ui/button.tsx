import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-ink text-knockout hover:-translate-y-0.5 hover:bg-primary-deep",
        outline:
          "border border-border-control bg-transparent text-ink hover:border-primary-ink hover:bg-surface-soft hover:text-primary-ink",
        ghost: "text-primary-ink hover:bg-surface-soft",
        inverse:
          "bg-knockout text-primary-ink hover:-translate-y-0.5 hover:bg-primary-muted",
      },
      size: {
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
