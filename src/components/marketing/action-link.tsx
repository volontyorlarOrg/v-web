import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import type { Destination } from "@/lib/content/cta";

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
        target={destination.newTab ? "_blank" : undefined}
        rel={destination.newTab ? "noopener noreferrer" : undefined}
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
