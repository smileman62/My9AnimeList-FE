import { NextRequest, NextResponse } from "next/server";

const MIN_QUERY_LENGTH = 2;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ data: [] });
  }

  const upstream = new URL("https://api.jikan.moe/v4/anime");
  upstream.searchParams.set("q", q);
  upstream.searchParams.set("limit", "15");
  upstream.searchParams.set("order_by", "popularity");

  const res = await fetch(upstream.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "upstream_error", status: res.status },
      { status: res.status === 429 ? 429 : 502 },
    );
  }

  return NextResponse.json(await res.json());
}
