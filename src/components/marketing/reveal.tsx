import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "rise" | "wipe" | "sequence";

const variantClass: Record<Variant, string> = {
  rise: "reveal",
  wipe: "reveal-wipe",
  sequence: "reveal-sequence",
};

type Props<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Reveal<T extends ElementType = "div">({
  as,
  variant = "rise",
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn(variantClass[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
