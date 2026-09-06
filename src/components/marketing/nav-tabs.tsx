"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NavTabItem = { href: string; path: string; label: string };

export function NavTabs({
  items,
  label,
  className,
}: {
  items: readonly NavTabItem[];
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={cn("items-center gap-1", className)}>
      {items.map((item) => {
        const active = item.path !== "/" && pathname === item.path;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface-sunk hover:text-ink",
              active ? "bg-accent-soft text-primary-ink" : "text-ink-muted",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
