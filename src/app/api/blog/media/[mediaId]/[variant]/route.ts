import { blogApiOrigin } from "@/lib/blog/blog.server";

const MEDIA_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function missing(status = 404) {
  return new Response(null, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/blog/media/[mediaId]/[variant]">,
) {
  const { mediaId, variant } = await params;
  if (!MEDIA_ID.test(mediaId) || !["sm", "md", "lg"].includes(variant)) return missing();
  let source: Response;
  try {
    source = await fetch(
      new URL(`/public/blog/media/${mediaId}/${variant}`, `${blogApiOrigin()}/`),
      {
        next: { revalidate: 3600, tags: ["blog"] },
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch {
    return missing(502);
  }
  if (!source.ok) return missing(source.status === 404 ? 404 : 502);
  return new Response(await source.arrayBuffer(), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
