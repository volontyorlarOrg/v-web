"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 items-center transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        track:
          "h-7 w-12 rounded-full border data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=unchecked]:border-input data-[state=unchecked]:bg-muted",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "track",
    },
  },
);

function Switch({
  className,
  variant,
  children,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant }), className)}
      {...props}
    >
      {variant === "icon" ? (
        children
      ) : (
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className="pointer-events-none block size-5 rounded-full bg-knockout ring-1 ring-input/40 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5"
        />
      )}
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants };
