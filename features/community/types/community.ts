export type RankedAnime = {
  id: number;
  title: string;
  thumbnailUrl: string;
  genres: string[];
  year: number;
  /** 사용자 탑9에 담긴 횟수(목업) */
  pickCount: number;
};

export type TrendPostAnimeSlot = {
  rankPosition: number;
  animeId: number;
  title: string;
  thumbnailUrl: string;
};

export type TrendPost = {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorHandle: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  animes: TrendPostAnimeSlot[];
};

export type PostSort = "popular" | "latest" | "comments";

export type RankingCategory = "all" | "genre" | "decade" | "year";
