import { describe, expect, it } from "vitest";

import { proseBlocks } from "./prose";

describe("proseBlocks", () => {
  it("splits a legal body into paragraphs and bullet lists", () => {
    expect(
      proseBlocks("Lead sentence:\n\n- first\n- second\n\nClosing."),
    ).toEqual([
      { kind: "paragraph", text: "Lead sentence:" },
      { kind: "list", items: ["first", "second"] },
      { kind: "paragraph", text: "Closing." },
    ]);
  });

  it("keeps a single paragraph as it is", () => {
    expect(proseBlocks("One paragraph only.")).toEqual([
      { kind: "paragraph", text: "One paragraph only." },
    ]);
  });
});
