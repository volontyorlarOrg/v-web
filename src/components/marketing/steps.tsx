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
    <ol className={cn("process relative grid gap-10 lg:grid-cols-4 lg:gap-6", className)}>
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-border lg:top-[0.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      />
      <span
        aria-hidden="true"
        className="rail-line absolute top-2 bottom-2 left-[0.4375rem] w-px bg-primary lg:top-[0.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      />
      <span
        aria-hidden="true"
        className="rail-head absolute top-0 left-[0.4375rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:top-[0.4375rem] lg:left-0"
      />

      {steps.map((step, index) => {
        const byVolunteer = step.actor === "volunteer";
        return (
          <li key={step.id} className="process-step relative pl-9 lg:pt-8 lg:pl-0">
            <span
              aria-hidden="true"
              className={cn(
                "process-node absolute top-1.5 left-0 size-3.5 rounded-full ring-4 ring-paper lg:top-0 lg:left-0",
                byVolunteer ? "bg-accent" : "bg-primary",
              )}
            />
            <div className="process-content">
              <p
                className={cn(
                  "tabular text-xs font-semibold tracking-[0.14em] uppercase",
                  byVolunteer ? "text-accent-ink" : "text-primary-ink",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-title font-semibold text-balance">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
