"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const styles = [
  { href: "/", label: "All" },
  { href: "/v1", label: "1 · Poster" },
  { href: "/v2", label: "2 · Record" },
  { href: "/v3", label: "3 · Night" },
];

/* Meta-tool for comparing the design versions — deliberately neutral so it
   doesn't belong to any of the three visual languages. */
export default function StyleSwitcher() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Switch design version"
      className="fixed bottom-[4.75rem] right-4 z-50 flex items-center gap-0.5 rounded-lg border border-white/15 bg-[#111417]/95 p-1 text-xs font-medium text-neutral-400 shadow-lg md:bottom-4"
    >
      {styles.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          aria-current={pathname === s.href ? "page" : undefined}
          className={`rounded-md px-2.5 py-1.5 transition-colors ${
            pathname === s.href
              ? "bg-white text-neutral-900"
              : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
