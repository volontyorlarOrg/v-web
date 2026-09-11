import { Send, type LucideIcon } from "lucide-react";

import { Linkedin } from "@/components/brand/channel-icons";
import { Scene } from "@/components/marketing/scene";
import type { FounderProfileId } from "@/lib/content/org";
import { cn } from "@/lib/utils";

const profileIcon: Record<FounderProfileId, LucideIcon> = {
  telegram: Send,
  linkedin: Linkedin,
};

export type FounderProfile = {
  id: FounderProfileId;
  label: string;
  url: string;
  ariaLabel: string;
};

export type FounderEntry = {
  id: string;
  name: string;
  role: string;
  profilesLabel: string;
  profiles: readonly FounderProfile[];
};

export function FounderBoard({
  founders,
  className,
}: {
  founders: readonly FounderEntry[];
  className?: string;
}) {
  return (
    <Scene
      as="ul"
      variant="stagger"
      className={cn("grid gap-x-10 sm:grid-cols-2", className)}
    >
      {founders.map((founder) => (
        <li key={founder.id} className="border-t border-border py-6">
          <p className="text-title font-semibold tracking-[-0.01em] text-ink">{founder.name}</p>
          <p className="mt-1 text-sm leading-snug text-ink-muted">{founder.role}</p>
          <ul
            role="list"
            aria-label={founder.profilesLabel}
            className="mt-3 -ml-3 flex flex-wrap gap-1"
          >
            {founder.profiles.map((profile) => {
              const Icon = profileIcon[profile.id];
              return (
                <li key={profile.id}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.ariaLabel}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-surface hover:text-primary-ink"
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                    {profile.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </Scene>
  );
}
