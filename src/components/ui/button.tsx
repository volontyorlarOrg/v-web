import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-200 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary-ink text-knockout hover:bg-primary-deep",
        outline:
          "border border-border-control bg-transparent text-ink hover:border-primary-ink hover:bg-surface-soft hover:text-primary-ink",
        ghost: "text-primary-ink hover:bg-surface-soft",
        inverse: "bg-knockout text-primary-ink hover:bg-primary-muted",
      },
      size: {
        sm: "min-h-11 px-5 text-sm",
        md: "min-h-13 px-7 text-base",
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
