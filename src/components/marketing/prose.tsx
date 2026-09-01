import type { ReactNode } from "react";

export type ProseSection = { id: string; title: string; body: string };

/**
 * Legal and explanatory pages. A single measure, generous leading, and headings
 * that stay in one logical order below the page `h1`.
 */
export function ProseSections({
  sections,
  children,
}: {
  sections: readonly ProseSection[];
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {children}
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} >
            <h2 className="text-xl font-bold tracking-[-0.02em]">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
