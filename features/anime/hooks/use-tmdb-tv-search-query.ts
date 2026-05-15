import { useQuery } from "@tanstack/react-query";
import { getTmdbTvSearch } from "@/features/anime/api/get-tmdb-tv-search";
import { tmdbQueryKeys } from "@/features/anime/query-keys";

const SEARCH_STALE_MS = 5 * 60_000;
const SEARCH_GC_MS = 30 * 60_000;

type UseTmdbTvSearchQueryOptions = {
  page?: number;
  enabled?: boolean;
};

/**
 * TMDB TV 검색 원본 응답(페이지네이션 포함). 무한 스크롤 등에 활용할 수 있습니다.
 */
export function useTmdbTvSearchQuery(
  debouncedQuery: string,
  { page = 1, enabled: enabledFromProps = true }: UseTmdbTvSearchQueryOptions = {},
) {
  const trimmed = debouncedQuery.trim();
  const enabled = enabledFromProps && trimmed.length >= 2;

  return useQuery({
    queryKey: tmdbQueryKeys.tvSearch(trimmed, page),
    queryFn: () => getTmdbTvSearch(trimmed, page),
    enabled,
    staleTime: SEARCH_STALE_MS,
    gcTime: SEARCH_GC_MS,
  });
}
