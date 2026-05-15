/** TMDB `GET /search/tv` 결과 항목 (필요 필드만) */
export type TmdbTvSearchResultItem = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
};

export type TmdbTvSearchResponse = {
  page: number;
  results: TmdbTvSearchResultItem[];
  total_pages: number;
  total_results: number;
};
