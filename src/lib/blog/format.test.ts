import { describe, expect, it } from "vitest";

import { blogReadingMinutes, blogWordCount, formatBlogDate } from "@/lib/blog/format";

function doc(...paragraphs: string[]) {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    })),
  };
}

describe("formatBlogDate", () => {
  it("returns nothing for a missing or unreadable date", () => {
    expect(formatBlogDate(null, "en")).toBeNull();
    expect(formatBlogDate("not a date", "en")).toBeNull();
  });

  it("dates an article by the Tashkent calendar day", () => {
    expect(formatBlogDate("2026-09-28T20:30:00.000Z", "en")).toBe(
      "September 29, 2026",
    );
  });

  it("formats in the reader's language", () => {
    expect(formatBlogDate("2026-09-28T08:00:00.000Z", "ru")).toMatch(/сентября/);
  });
});

describe("blogWordCount", () => {
  it("counts words across nested blocks and ignores extra whitespace", () => {
    const body = {
      type: "doc",
      content: [
        ...doc("  One two   three ").content,
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: doc("four five").content,
            },
          ],
        },
      ],
    };
    expect(blogWordCount(body)).toBe(5);
  });

  it("counts nothing for an empty or missing body", () => {
    expect(blogWordCount(undefined)).toBe(0);
    expect(blogWordCount({ type: "doc", content: [] })).toBe(0);
  });
});

describe("blogReadingMinutes", () => {
  it("never promises less than a minute", () => {
    expect(blogReadingMinutes(doc("Short."))).toBe(1);
    expect(blogReadingMinutes(undefined)).toBe(1);
  });

  it("reads at two hundred words a minute", () => {
    expect(blogReadingMinutes(doc(Array(1000).fill("word").join(" ")))).toBe(5);
  });
});
