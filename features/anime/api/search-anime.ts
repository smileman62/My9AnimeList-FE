import { filterMockEditorAnimes } from "@/features/anime/data/mock-editor-animes";
import type { EditorAnime } from "@/features/anime/types/anime";

const MOCK_SEARCH_DELAY_MS = 220;

export async function searchAnime(query: string): Promise<EditorAnime[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  await new Promise((resolve) =>
    setTimeout(resolve, MOCK_SEARCH_DELAY_MS),
  );

  return filterMockEditorAnimes(trimmed);
}
