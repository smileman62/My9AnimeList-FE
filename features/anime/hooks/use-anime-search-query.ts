import { useQuery } from "@tanstack/react-query";
import { searchAnime } from "@/features/anime/api/search-anime";
import { animeQueryKeys } from "@/features/anime/query-keys";

export function useAnimeSearchQuery(debouncedQuery: string) {
  const trimmed = debouncedQuery.trim();
  const enabled = trimmed.length >= 2;

  return useQuery({
    queryKey: animeQueryKeys.search(trimmed),
    queryFn: () => searchAnime(trimmed),
    enabled,
    staleTime: 60_000,
  });
}
