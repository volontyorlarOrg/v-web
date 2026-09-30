import { render, screen, within } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import { BlogCard, BlogFeature } from "@/components/blog/blog-card";
import type { BlogListItem } from "@/lib/blog/blog.server";

vi.mock("server-only", () => ({}));
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const MEDIA_ID = "5cb6dab6-dfba-480b-8f88-e78301aebe21";

function item(overrides: Partial<BlogListItem> = {}): BlogListItem {
  return {
    slug: "riverbank-clean-up",
    requestedLocale: "en",
    contentLocale: "en",
    availableLocales: ["en"],
    title: "A day at the riverbank clean-up",
    summary: "Forty volunteers and one very muddy afternoon.",
    coverUrl: `/public/blog/media/${MEDIA_ID}/lg`,
    coverAlt: "Volunteers on the riverbank",
    publishedAt: "2026-09-28T08:00:00.000Z",
    ...overrides,
  };
}

describe("BlogCard", () => {
  it("is one link, named by the title, to the article", () => {
    render(<BlogCard item={item()} locale="en" writtenIn={null} />);
    const card = screen.getByRole("article");
    const links = within(card).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("A day at the riverbank clean-up");
    expect(links[0]).toHaveAttribute("href", "/blog/riverbank-clean-up");
    expect(
      within(card).getByRole("heading", { level: 2, name: "A day at the riverbank clean-up" }),
    ).toBeInTheDocument();
  });

  it("serves the cover through the site's media proxy in three widths", () => {
    const { container } = render(<BlogCard item={item()} locale="en" writtenIn={null} />);
    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", `/api/blog/media/${MEDIA_ID}/lg`);
    expect(image).toHaveAttribute("alt", "");
    expect(image?.getAttribute("srcset")).toBe(
      [
        `/api/blog/media/${MEDIA_ID}/sm 480w`,
        `/api/blog/media/${MEDIA_ID}/md 960w`,
        `/api/blog/media/${MEDIA_ID}/lg 1600w`,
      ].join(", "),
    );
  });

  it("draws the brand plate when there is no cover", () => {
    const { container } = render(
      <BlogCard item={item({ coverUrl: null })} locale="en" writtenIn={null} />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector('[data-slot="blog-plate"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("names the language when the article is not in the reader's", () => {
    render(
      <BlogCard
        item={item({ contentLocale: "uz" })}
        locale="en"
        writtenIn="In Uzbek"
      />,
    );
    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("lang", "uz");
    expect(within(card).getByText("In Uzbek").closest("[lang]")).toHaveAttribute(
      "lang",
      "en",
    );
  });

  it("leaves out the summary and date when the article has none", () => {
    render(
      <BlogCard
        item={item({ summary: "  ", publishedAt: null })}
        locale="en"
        writtenIn={null}
      />,
    );
    const card = screen.getByRole("article");
    expect(card.querySelector("time")).toBeNull();
    expect(card.querySelectorAll("p")).toHaveLength(0);
  });

  it("can sit under a section heading", () => {
    render(<BlogCard item={item()} locale="en" writtenIn={null} heading="h3" />);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });
});

describe("BlogFeature", () => {
  it("keeps its read label out of the link's name", () => {
    render(
      <BlogFeature item={item()} locale="en" writtenIn={null} readLabel="Read article" />,
    );
    const card = screen.getByRole("article");
    const links = within(card).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("A day at the riverbank clean-up");
    expect(within(card).getByText("Read article").closest("[aria-hidden]")).not.toBeNull();
  });

  it("loads its cover first", () => {
    const { container } = render(
      <BlogFeature item={item()} locale="en" writtenIn={null} readLabel="Read article" />,
    );
    expect(container.querySelector("img")).toHaveAttribute("loading", "eager");
  });
});
