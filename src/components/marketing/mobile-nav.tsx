"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";
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
    const className = buttonClass({ variant, size: "sm" });

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
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-border-control lg:hidden"
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
        className="absolute inset-x-0 top-full gap-0 border-b border-border bg-paper shadow-[0_18px_40px_-32px_rgb(28_36_43/0.45)] lg:hidden"
      >
        <SheetTitle className="sr-only">{navigationLabel}</SheetTitle>
        <div className="container-page flex flex-col gap-1 py-4">
          <nav aria-label={navigationLabel} className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border text-base font-semibold text-ink last:border-b-0 hover:text-primary-ink"
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
