export const animeQueryKeys = {
  all: ["anime"] as const,
  search: (query: string) => [...animeQueryKeys.all, "search", query] as const,
};

export const tmdbQueryKeys = {
  all: ["tmdb"] as const,
  tvSearch: (query: string, page: number) =>
    [...tmdbQueryKeys.all, "tv", "search", query, page] as const,
};
