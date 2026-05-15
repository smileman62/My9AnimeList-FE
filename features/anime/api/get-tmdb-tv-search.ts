import type { TmdbTvSearchResponse } from "@/features/anime/types/tmdb-tv";
import { internalApiClient } from "@/shared/api/internal-api-client";

function internalApiOrigin(): string | undefined {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
}

export async function getTmdbTvSearch(
  query: string,
  page = 1,
): Promise<TmdbTvSearchResponse> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const { data } = await internalApiClient.get<TmdbTvSearchResponse>(
    "/api/tmdb/tv/search",
    {
      params: { q: trimmed, page },
      baseURL: internalApiOrigin(),
    },
  );
  return data;
}
