"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Destination } from "@/lib/content/cta";

export type NavItem = { href: string; label: string };

export type NavAction = Destination & { label: string };

export function MobileNav({
  items,
  cta,
  secondary = null,
  openLabel,
  closeLabel,
  navigationLabel,
}: {
  items: readonly NavItem[];
  cta: NavAction | null;
  secondary?: NavAction | null;
  openLabel: string;
  closeLabel: string;
  navigationLabel: string;
}) {
  const [open, setOpen] = useState(false);

  function renderAction(action: NavAction, variant: "primary" | "outline") {
    const className =
      variant === "primary"
        ? "inline-flex h-12 items-center rounded-xl bg-orange-600 px-6 text-base font-bold text-knockout transition-colors hover:bg-orange-700"
        : "inline-flex h-12 items-center rounded-xl border-[1.5px] border-knockout/28 px-6 text-base font-semibold text-knockout transition-colors hover:border-knockout/60";

    if (action.external) {
      return (
        <a
          href={action.href}
          target={action.newTab ? "_blank" : undefined}
          rel={action.newTab ? "noopener noreferrer" : undefined}
          className={className}
        >
          {action.label}
        </a>
      );
    }

    return (
      <Link href={action.href} onClick={() => setOpen(false)} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border-[1.5px] border-knockout/28 bg-transparent text-knockout transition-colors hover:border-knockout/60 min-[981px]:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
          <span className="sr-only">{open ? closeLabel : openLabel}</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        portal={false}
        aria-describedby={undefined}
        className="absolute inset-x-0 top-full gap-0 border-y border-knockout/10 bg-navy-900 text-knockout shadow-[0_24px_40px_-24px_var(--color-mask-opaque)] min-[981px]:hidden"
      >
        <SheetTitle className="sr-only">{navigationLabel}</SheetTitle>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-5 py-4 min-[640px]:px-8">
          <nav aria-label={navigationLabel} className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-knockout/10 text-base font-semibold text-knockout last:border-b-0 hover:text-blue-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-wrap gap-2">
            {cta ? renderAction(cta, "primary") : null}
            {secondary ? renderAction(secondary, "outline") : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
