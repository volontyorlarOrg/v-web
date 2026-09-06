"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { Switch } from "@/components/ui/switch";
import {
  applyTheme,
  readTheme,
  restorePreferences,
  subscribeToTheme,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const SERVER_THEME: Theme = "light";

function useTheme(): Theme {
  return useSyncExternalStore(subscribeToTheme, readTheme, () => SERVER_THEME);
}

export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  const dark = useTheme() === "dark";

  useLayoutEffect(() => {
    restorePreferences();
  }, []);

  return (
    <Switch
      variant="icon"
      checked={dark}
      onCheckedChange={(next) => applyTheme(next ? "dark" : "light")}
      aria-label={label}
      className={cn(
        "theme-toggle inline-grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-border-control hover:text-primary-ink",
        className,
      )}
    >
      <Sun aria-hidden="true" className="theme-toggle-icon theme-toggle-sun size-4" />
      <Moon aria-hidden="true" className="theme-toggle-icon theme-toggle-moon size-4" />
    </Switch>
  );
}
