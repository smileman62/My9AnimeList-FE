"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { AnimeRankingSection } from "@/features/community/components/anime-ranking-section";
import { CommunityPostListSection } from "@/features/community/components/community-post-list-section";

type TabId = "posts" | "anime";

const TAB_DEFS: { id: TabId; labelKey: string; hintKey: string }[] = [
  { id: "posts", labelKey: "community.tabPosts", hintKey: "community.tabPostsHint" },
  { id: "anime", labelKey: "community.tabAnime", hintKey: "community.tabAnimeHint" },
];

export function CommunityTrendTabs() {
  const { t } = useI18n();
  const [tab, setTab] = useState<TabId>("posts");

  return (
    <div>
      <div
        className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        role="tablist"
        aria-label={t("community.tabsAria")}
      >
        <div className="flex gap-1 rounded-2xl border border-zinc-200/90 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-900/60">
          {TAB_DEFS.map((def) => {
            const active = tab === def.id;
            return (
              <button
                key={def.id}
                type="button"
                role="tab"
                id={`trend-tab-${def.id}`}
                aria-selected={active}
                aria-controls={`trend-panel-${def.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(def.id)}
                className={`min-w-0 flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-6 ${
                  active
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {t(def.labelKey)}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-right sm:max-w-xs">
          {t(TAB_DEFS.find((d) => d.id === tab)!.hintKey)}
        </p>
      </div>

      <div
        role="tabpanel"
        id="trend-panel-posts"
        aria-labelledby="trend-tab-posts"
        hidden={tab !== "posts"}
      >
        <CommunityPostListSection />
      </div>
      <div
        role="tabpanel"
        id="trend-panel-anime"
        aria-labelledby="trend-tab-anime"
        hidden={tab !== "anime"}
      >
        <AnimeRankingSection />
      </div>
    </div>
  );
}
