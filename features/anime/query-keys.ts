export const animeQueryKeys = {
  all: ["anime"] as const,
  search: (query: string) => [...animeQueryKeys.all, "search", query] as const,
};
