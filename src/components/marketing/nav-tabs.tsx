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
              "rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface-soft hover:text-primary-ink",
              active ? "bg-surface-soft text-primary-ink" : "text-ink-muted",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
