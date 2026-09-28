import type { BlogNode } from "@/lib/blog/blog.server";
import { blogMediaSrc } from "@/lib/blog/blog.server";
import type { Locale } from "@/i18n/routing";

function children(
  node: BlogNode,
  preview: boolean,
  locale?: Locale,
): React.ReactNode {
  return (
    node.content?.map((child, index) => (
      <BlogBlock key={index} node={child} preview={preview} locale={locale} />
    )) ?? null
  );
}

function safeHref(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? value : null;
  } catch {
    return null;
  }
}

function BlogBlock({
  node,
  preview,
  locale,
}: {
  node: BlogNode;
  preview: boolean;
  locale?: Locale;
}): React.ReactNode {
  const content = children(node, preview, locale);
  switch (node.type) {
    case "doc":
      return <>{content}</>;
    case "paragraph":
      if (!node.content?.length) return null;
      return (
        <p className="mb-5 text-[1.0625rem] leading-[1.85] text-ink">
          {content}
        </p>
      );
    case "heading":
      return node.attrs?.level === 3 ? (
        <h3 className="mb-4 mt-10 font-serif text-2xl leading-tight text-ink">
          {content}
        </h3>
      ) : (
        <h2 className="mb-4 mt-12 font-serif text-3xl leading-tight text-ink">
          {content}
        </h2>
      );
    case "bulletList":
      return (
        <ul className="mb-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.8]">
          {content}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="mb-6 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.8]">
          {content}
        </ol>
      );
    case "listItem":
      return <li>{content}</li>;
    case "blockquote":
      return (
        <blockquote className="my-9 border-l-4 border-primary-ink pl-6 font-serif text-xl italic leading-relaxed text-ink-muted">
          {content}
        </blockquote>
      );
    case "hardBreak":
      return <br />;
    case "text": {
      let text: React.ReactNode = node.text ?? "";
      for (const mark of node.marks ?? []) {
        if (mark.type === "bold") text = <strong>{text}</strong>;
        if (mark.type === "italic") text = <em>{text}</em>;
        if (mark.type === "link") {
          const href = safeHref(mark.attrs?.href);
          if (href)
            text = (
              <a
                href={href}
                rel="noopener noreferrer"
                className="text-primary-ink underline underline-offset-4"
              >
                {text}
              </a>
            );
        }
      }
      return text;
    }
    case "image": {
      const mediaId =
        typeof node.attrs?.mediaId === "string" ? node.attrs.mediaId : "";
      const media = (variant: string) =>
        blogMediaSrc(`/public/blog/media/${mediaId}/${variant}`, preview, locale);
      const src = media("lg");
      if (!src) return null;
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      const caption =
        typeof node.attrs?.caption === "string" ? node.attrs.caption : "";
      const credit =
        typeof node.attrs?.credit === "string" ? node.attrs.credit : "";
      const width = Number(node.attrs?.width) || undefined;
      const height = Number(node.attrs?.height) || undefined;
      return (
        <figure className="my-10">
          <img
            src={src}
            srcSet={["sm", "md", "lg"]
              .map((variant, index) => `${media(variant)} ${[480, 960, 1600][index]}w`)
              .join(", ")}
            sizes="(max-width: 760px) 100vw, 760px"
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg bg-surface-soft"
          />
          {caption || credit ? (
            <figcaption className="mt-3 text-sm leading-relaxed text-ink-muted">
              {caption}
              {caption && credit ? " · " : ""}
              {credit}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    default:
      return null;
  }
}

export function BlogBody({
  body,
  preview = false,
  locale,
}: {
  body: BlogNode;
  preview?: boolean;
  locale?: Locale;
}) {
  return (
    <div className="blog-body">
      <BlogBlock node={body} preview={preview} locale={locale} />
    </div>
  );
}

export function hasBlogContent(node: BlogNode | undefined): boolean {
  if (!node) return false;
  if (node.type === "image") return typeof node.attrs?.mediaId === "string";
  if (node.type === "text") return !!node.text?.trim();
  return node.content?.some(hasBlogContent) ?? false;
}
