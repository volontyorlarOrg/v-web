"use client";

import type { ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const overlay = usePathname() === "/";

  return (
    <header
      data-overlay={overlay ? "" : undefined}
      className="sticky top-0 z-40 bg-navy-900 text-knockout data-[overlay]:absolute data-[overlay]:inset-x-0 data-[overlay]:bg-transparent"
    >
      {children}
    </header>
  );
}
