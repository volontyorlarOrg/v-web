import { NextRequest, NextResponse } from "next/server";
import { getBlogPreview } from "@/lib/blog/blog.server";
import type { Locale } from "@/i18n/routing";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const token = form.get("token");
  const slug = form.get("slug");
  const locale = form.get("locale");
  if (
    typeof slug !== "string" ||
    !/^[a-z0-9-]{1,100}$/.test(slug) ||
    (locale !== "uz" && locale !== "ru" && locale !== "en")
  ) {
    return new Response(null, { status: 400 });
  }
  const destination = new URL(`/${locale}/blog/preview/${slug}`, request.url);
  const response = NextResponse.redirect(destination, 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  const allowedOrigin = process.env.BLOG_ADMIN_ORIGIN?.trim();
  if (
    !allowedOrigin ||
    request.headers.get("origin") !== allowedOrigin ||
    typeof token !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(token)
  ) {
    return response;
  }
  const article = await getBlogPreview(slug, locale as Locale, token).catch(() => null);
  if (!article) return response;
  response.cookies.set("blog_preview", token, {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    maxAge: 600,
    path: `/${locale}/blog/preview`,
  });
  return response;
}
