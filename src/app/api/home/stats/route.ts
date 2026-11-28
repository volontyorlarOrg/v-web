import { NextResponse } from "next/server";

import { fetchVolunteerTotal } from "@/lib/home/stats.server";

export const revalidate = 30;

export async function GET() {
  const volunteerTotal = await fetchVolunteerTotal();
  if (volunteerTotal === null) {
    return NextResponse.json(
      { volunteerTotal: null },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  return NextResponse.json(
    { volunteerTotal },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}
