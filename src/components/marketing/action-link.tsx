import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import type { Destination } from "@/lib/content/cta";

/**
 * Renders a destination as a locale-aware internal link or a safe external
 * anchor. Components should never branch on this themselves.
 */
export function ActionLink({
  destination,
  className,
  children,
  ariaLabel,
}: {
  destination: Destination;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (destination.external) {
    return (
      <a
        href={destination.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={destination.href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
