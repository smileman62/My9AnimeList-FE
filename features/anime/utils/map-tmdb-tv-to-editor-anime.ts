import type { EditorAnime } from "@/features/anime/types/anime";
import type { TmdbTvSearchResultItem } from "@/features/anime/types/tmdb-tv";

const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export function mapTmdbTvToEditorAnime(tv: TmdbTvSearchResultItem): EditorAnime {
  const title =
    tv.name?.trim() ||
    tv.original_name?.trim() ||
    `TMDB #${tv.id}`;

  return {
    id: tv.id,
    title,
    thumbnailUrl: tv.poster_path ? `${TMDB_POSTER_BASE}${tv.poster_path}` : "",
    synopsis: tv.overview?.trim() ?? "",
    airedLabel: tv.first_air_date || "—",
  };
}
