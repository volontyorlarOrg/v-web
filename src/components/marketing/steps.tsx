import { cn } from "@/lib/utils";

export type StepActor = "organisation" | "volunteer";

export type Step = {
  id: string;
  title: string;
  description: string;
  actor: StepActor;
};

export function StepRail({
  steps,
  className,
}: {
  steps: readonly Step[];
  className?: string;
}) {
  return (
    <ol className={cn("relative grid gap-8 lg:grid-cols-4 lg:gap-6", className)}>
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-border lg:top-[0.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      />
      {steps.map((step, index) => {
        const byVolunteer = step.actor === "volunteer";
        return (
          <li key={step.id} className="relative pl-9 lg:pt-8 lg:pl-0">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 left-0 size-3.5 rounded-full ring-4 ring-paper lg:top-0 lg:left-0",
                byVolunteer ? "bg-accent" : "bg-primary",
              )}
            />
            <p
              className={cn(
                "tabular text-xs font-bold tracking-[0.14em] uppercase",
                byVolunteer ? "text-accent-ink" : "text-primary-ink",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-balance">
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-ink-muted text-pretty">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
