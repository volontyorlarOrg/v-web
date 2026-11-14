import type { ReactNode } from "react";

export type ProseSection = { id: string; title: string; body: string };

type Block =
  { kind: "paragraph"; text: string } | { kind: "list"; items: string[] };

export function proseBlocks(body: string): Block[] {
  return body.split(/\n{2,}/).map((chunk) => {
    const lines = chunk.split("\n");
    return lines.every((line) => line.startsWith("- "))
      ? { kind: "list", items: lines.map((line) => line.slice(2)) }
      : { kind: "paragraph", text: chunk };
  });
}

export function ProseSections({
  sections,
  children,
}: {
  sections: readonly ProseSection[];
  children?: ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="font-sans text-title font-semibold">
              {section.title}
            </h2>
            {proseBlocks(section.body).map((block, index) =>
              block.kind === "list" ? (
                <ul
                  key={index}
                  className="mt-4 list-disc space-y-2 ps-6 text-lg leading-relaxed text-ink-muted"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={index} className="mt-4 text-lg leading-relaxed text-ink-muted">
                  {block.text}
                </p>
              ),
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
