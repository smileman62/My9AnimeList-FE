"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { MOCK_RANKED_ANIMES, getDecadeStart } from "@/features/community/data/mock-ranked-animes";
import { RankedAnimeCard } from "@/features/community/components/ranked-anime-card";
import type { RankingCategory, RankedAnime } from "@/features/community/types/community";

const CATEGORY_IDS: { id: RankingCategory; labelKey: string }[] = [
  { id: "all", labelKey: "community.catAll" },
  { id: "genre", labelKey: "community.catGenre" },
  { id: "decade", labelKey: "community.catDecade" },
  { id: "year", labelKey: "community.catYear" },
];

function uniqueStrings(values: string[], collatorLocale: string) {
  return [...new Set(values)].sort((a, b) =>
    a.localeCompare(b, collatorLocale),
  );
}

function uniqueNumbers(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}

function filterAndSort(
  list: RankedAnime[],
  category: RankingCategory,
  genre: string | null,
  decade: number | null,
  year: number | null,
): RankedAnime[] {
  let next = [...list];
  if (category === "genre" && genre) {
    next = next.filter((a) => a.genres.includes(genre));
  }
  if (category === "decade" && decade !== null) {
    next = next.filter((a) => getDecadeStart(a.year) === decade);
  }
  if (category === "year" && year !== null) {
    next = next.filter((a) => a.year === year);
  }
  return next.sort((a, b) => b.pickCount - a.pickCount);
}

const tabButtonClass = (active: boolean) =>
  `shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition sm:px-4 ${
    active
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
  }`;

const chipClass = (active: boolean) =>
  `rounded-full px-3 py-1.5 text-xs font-medium transition ${
    active
      ? "bg-sky-600 text-white dark:bg-sky-500"
      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
  }`;

export function AnimeRankingSection() {
  const { t, tx, locale } = useI18n();
  const collatorLocale = locale === "en" ? "en" : "ko";
  const [category, setCategory] = useState<RankingCategory>("all");
  const [genre, setGenre] = useState<string | null>(null);
  const [decade, setDecade] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const allGenres = useMemo(() => {
    const g: string[] = [];
    for (const a of MOCK_RANKED_ANIMES) {
      g.push(...a.genres);
    }
    return uniqueStrings(g, collatorLocale);
  }, [collatorLocale]);

  const decades = useMemo(() => {
    const d = MOCK_RANKED_ANIMES.map((a) => getDecadeStart(a.year));
    return uniqueNumbers(d);
  }, []);

  const years = useMemo(() => {
    const y = MOCK_RANKED_ANIMES.map((a) => a.year);
    return uniqueNumbers(y);
  }, []);

  const ranked = useMemo(
    () => filterAndSort(MOCK_RANKED_ANIMES, category, genre, decade, year),
    [category, genre, decade, year],
  );

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl">
            {t("community.rankingTitle")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("community.rankingSubtitle")}
          </p>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {CATEGORY_IDS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCategory(item.id);
              if (item.id === "all") {
                setGenre(null);
                setDecade(null);
                setYear(null);
              }
            }}
            className={tabButtonClass(category === item.id)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      {category === "genre" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {allGenres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenre((prev) => (prev === g ? null : g))}
              className={chipClass(genre === g)}
            >
              {g}
            </button>
          ))}
        </div>
      ) : null}

      {category === "decade" ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {decades.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDecade((prev) => (prev === d ? null : d))}
              className={chipClass(decade === d)}
            >
              {tx("community.decadeChip", { year: d })}
            </button>
          ))}
        </div>
      ) : null}

      {category === "year" ? (
        <div className="mb-4">
          <label className="mb-2 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {t("community.releaseYear")}
          </label>
          <select
            value={year ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setYear(v === "" ? null : Number(v));
            }}
            className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          >
            <option value="">{t("community.selectYear")}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {tx("community.yearOption", { year: y })}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {ranked.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t("community.rankingEmpty")}
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {ranked.map((a, i) => (
            <li key={a.id}>
              <RankedAnimeCard anime={a} rank={i + 1} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
