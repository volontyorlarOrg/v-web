"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";

export type NavItem = { href: string; label: string };

export function MobileNav({
  items,
  cta,
  openLabel,
  closeLabel,
  navigationLabel,
}: {
  items: readonly NavItem[];
  cta: { href: string; label: string; external: boolean } | null;
  openLabel: string;
  closeLabel: string;
  navigationLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-border-control lg:hidden"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-paper shadow-[0_18px_40px_-32px_rgb(28_36_43/0.45)] lg:hidden"
      >
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

          <div className="mt-4">
            {cta ? (
              cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ size: "sm" })}
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className={buttonClass({ size: "sm" })}
                >
                  {cta.label}
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
