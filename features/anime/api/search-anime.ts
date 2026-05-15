import axios from "axios";
import { getTmdbTvSearch } from "@/features/anime/api/get-tmdb-tv-search";
import type { EditorAnime } from "@/features/anime/types/anime";
import { mapTmdbTvToEditorAnime } from "@/features/anime/utils/map-tmdb-tv-to-editor-anime";

export async function searchAnime(query: string): Promise<EditorAnime[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  try {
    const data = await getTmdbTvSearch(trimmed, 1);
    return data.results.map(mapTmdbTvToEditorAnime);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      const status = e.response?.status;
      if (status === 503) {
        throw new Error(
          "TMDB 액세스 토큰이 서버에 없습니다. .env에 VITE_TMDB_ACCESS_TOKEN을 설정했는지 확인하세요.",
        );
      }
      throw new Error("애니메이션 검색 요청에 실패했습니다.");
    }
    throw e;
  }
}
