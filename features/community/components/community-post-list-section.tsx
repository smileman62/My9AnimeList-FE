"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { MOCK_TREND_POSTS } from "@/features/community/data/mock-trend-posts";
import { TrendPostCard } from "@/features/community/components/trend-post-card";
import type { PostSort, TrendPost } from "@/features/community/types/community";

const SORT_IDS: { id: PostSort; labelKey: string }[] = [
  { id: "popular", labelKey: "community.sortPopular" },
  { id: "latest", labelKey: "community.sortLatest" },
  { id: "comments", labelKey: "community.sortComments" },
];

function sortPosts(posts: TrendPost[], sort: PostSort): TrendPost[] {
  const copy = [...posts];
  if (sort === "latest") {
    copy.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (sort === "comments") {
    copy.sort((a, b) => b.commentCount - a.commentCount);
  } else {
    copy.sort((a, b) => {
      const scoreA = a.likeCount * 10 + a.commentCount;
      const scoreB = b.likeCount * 10 + b.commentCount;
      return scoreB - scoreA;
    });
  }
  return copy;
}

const tabClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    active
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
  }`;

export function CommunityPostListSection() {
  const { t } = useI18n();
  const [sort, setSort] = useState<PostSort>("popular");
  const sorted = useMemo(() => sortPosts(MOCK_TREND_POSTS, sort), [sort]);

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl">
            {t("community.postsTitle")}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("community.postsSubtitle")}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
          {SORT_IDS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setSort(o.id)}
              className={tabClass(sort === o.id)}
            >
              {t(o.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <li key={post.id}>
            <TrendPostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
