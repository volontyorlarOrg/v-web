import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.BLOG_REVALIDATION_SECRET;
  const timestamp = request.headers.get("x-blog-timestamp") ?? "";
  const signature = request.headers.get("x-blog-signature") ?? "";
  if (
    !secret ||
    secret.length < 32 ||
    !/^\d{13}$/.test(timestamp) ||
    Math.abs(Date.now() - Number(timestamp)) > 300_000 ||
    !/^[a-f0-9]{64}$/.test(signature)
  ) {
    return new Response(null, { status: 403 });
  }
  const body = await request.text();
  if (body.length > 2_000) return new Response(null, { status: 413 });
  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest();
  const supplied = Buffer.from(signature, "hex");
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(expected, supplied)
  ) {
    return new Response(null, { status: 403 });
  }
  let value: unknown;
  try {
    value = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (
    !value ||
    typeof value !== "object" ||
    !("slug" in value) ||
    typeof value.slug !== "string" ||
    !/^[a-z0-9-]{1,100}$/.test(value.slug)
  ) {
    return new Response(null, { status: 400 });
  }
  revalidateTag("blog", { expire: 0 });
  revalidatePath("/sitemap.xml");
  for (const locale of ["uz", "ru", "en"]) {
    revalidatePath(`/${locale}/blog`);
    revalidatePath(`/${locale}/blog/${value.slug}`);
  }
  return Response.json({ revalidated: true });
}
