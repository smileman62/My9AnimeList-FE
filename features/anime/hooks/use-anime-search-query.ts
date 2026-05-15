import { useQuery } from "@tanstack/react-query";
import { searchAnime } from "@/features/anime/api/search-anime";
import { animeQueryKeys } from "@/features/anime/query-keys";

const SEARCH_STALE_MS = 5 * 60_000;
const SEARCH_GC_MS = 30 * 60_000;

type UseAnimeSearchQueryOptions = {
  /** false면 쿼리 비활성(모달 닫힘 등). 디바운스 지연 중 불필요한 호출 방지에 사용 */
  enabled?: boolean;
};

export function useAnimeSearchQuery(
  debouncedQuery: string,
  { enabled: enabledFromProps = true }: UseAnimeSearchQueryOptions = {},
) {
  const trimmed = debouncedQuery.trim();
  const enabled = enabledFromProps && trimmed.length >= 2;

  return useQuery({
    queryKey: animeQueryKeys.search(trimmed),
    queryFn: () => searchAnime(trimmed),
    enabled,
    staleTime: SEARCH_STALE_MS,
    gcTime: SEARCH_GC_MS,
  });
}
