import type { NextRequest } from "next/server";
import { blogApiOrigin } from "@/lib/blog/blog.server";

export async function GET(
  request: NextRequest,
  { params }: RouteContext<"/[locale]/blog/preview/media/[mediaId]/[variant]">,
) {
  const { mediaId, variant } = await params;
  const token = request.cookies.get("blog_preview")?.value;
  if (
    !token ||
    !/^[0-9a-f-]{36}$/i.test(mediaId) ||
    !["sm", "md", "lg"].includes(variant)
  ) {
    return new Response(null, { status: 404 });
  }
  const source = await fetch(
    new URL(
      `/public/blog/preview-media/${mediaId}/${variant}`,
      `${blogApiOrigin()}/`,
    ),
    {
      headers: { "x-blog-preview-token": token },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!source.ok) return new Response(null, { status: 404 });
  return new Response(source.body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
