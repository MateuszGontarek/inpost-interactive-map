import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = new URLSearchParams({
    country: searchParams.get("country") ?? "PL",
    type: searchParams.get("type") ?? "parcel_locker",
    page: searchParams.get("page") ?? "1",
    per_page: searchParams.get("per_page") ?? "100",
  });

  const city = searchParams.get("city");
  if (city) params.set("city", city);

  const res = await fetch(
    `https://api-global-points.easypack24.net/v1/points?${params}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "InPost API error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
