"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n-provider";
import type { RankedAnime } from "@/features/community/types/community";

type RankedAnimeCardProps = {
  anime: RankedAnime;
  rank: number;
};

export function RankedAnimeCard({ anime, rank }: RankedAnimeCardProps) {
  const { locale, tx } = useI18n();
  const numLocale = locale === "en" ? "en-US" : "ko-KR";

  return (
    <article className="group flex gap-3 rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600">
      <div className="relative flex w-9 shrink-0 flex-col items-center justify-start pt-1">
        <span className="text-lg font-black tabular-nums text-zinc-400 dark:text-zinc-500">
          {rank}
        </span>
      </div>
      <div className="relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:w-24">
        <Image
          src={anime.thumbnailUrl}
          alt=""
          fill
          sizes="96px"
          className="object-cover transition group-hover:scale-[1.03]"
          unoptimized={!anime.thumbnailUrl.includes("cdn.myanimelist.net")}
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-base">
          {anime.title}
        </h3>
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          {tx("rankingCard.pickMeta", {
            year: anime.year,
            count: anime.pickCount.toLocaleString(numLocale),
          })}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {anime.genres.map((g) => (
            <li
              key={g}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {g}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
