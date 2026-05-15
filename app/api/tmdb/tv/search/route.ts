import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import type { TmdbTvSearchResponse } from "@/features/anime/types/tmdb-tv";
import { filterTmdbTvResultsToAnimation } from "@/features/anime/utils/filter-tmdb-tv-animation";
import {
  getTmdbServerClient,
  resolveTmdbAccessToken,
} from "@/shared/api/tmdb-server-client";

const MIN_QUERY_LENGTH = 2;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const pageParam = request.nextUrl.searchParams.get("page");
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  if (q.length < MIN_QUERY_LENGTH) {
    const empty: TmdbTvSearchResponse = {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    return NextResponse.json(empty);
  }

  if (!resolveTmdbAccessToken()) {
    return NextResponse.json(
      {
        error: "tmdb_not_configured",
        message:
          "VITE_TMDB_ACCESS_TOKEN 또는 TMDB_READ_ACCESS_TOKEN이 없습니다.",
      },
      { status: 503 },
    );
  }

  try {
    const client = getTmdbServerClient();
    const { data } = await client.get<TmdbTvSearchResponse>("/search/tv", {
      params: {
        query: q,
        page,
        include_adult: false,
        language: process.env.TMDB_API_LANGUAGE ?? "ko-KR",
      },
    });

    const animationOnly = filterTmdbTvResultsToAnimation(data.results);

    return NextResponse.json({
      ...data,
      results: animationOnly,
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 502;
      return NextResponse.json(
        { error: "tmdb_upstream_error", status },
        { status: status >= 400 && status < 600 ? status : 502 },
      );
    }
    return NextResponse.json(
      { error: "tmdb_upstream_error", status: 502 },
      { status: 502 },
    );
  }
}
