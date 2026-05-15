import type { TmdbTvSearchResultItem } from "@/features/anime/types/tmdb-tv";

/** TMDB TV 장르 ID: Animation (애니메이션) — `discover/tv`의 `with_genres=16`과 동일 */
export const TMDB_GENRE_ID_ANIMATION = 16;

export function isTmdbTvAnimationShow(
  item: TmdbTvSearchResultItem,
): boolean {
  const ids = item.genre_ids;
  return Array.isArray(ids) && ids.includes(TMDB_GENRE_ID_ANIMATION);
}

export function filterTmdbTvResultsToAnimation(
  results: TmdbTvSearchResultItem[],
): TmdbTvSearchResultItem[] {
  return results.filter(isTmdbTvAnimationShow);
}
