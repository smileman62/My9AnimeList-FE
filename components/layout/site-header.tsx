"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LanguageSwitcher } from "./language-switcher";

const navLinkClass =
  "text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <nav
          className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2"
          aria-label={t("nav.mainMenu")}
        >
          <Link
            href="/"
            className="shrink-0 rounded-md px-2 py-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            {t("nav.home")}
          </Link>
          <span className="hidden text-zinc-300 dark:text-zinc-600 sm:inline" aria-hidden>
            |
          </span>
          <Link href="/posts/new" className={navLinkClass}>
            {t("nav.editor")}
          </Link>
          <Link
            href="/community/trend"
            className={`${navLinkClass} truncate sm:max-w-none`}
          >
            <span className="sm:hidden">{t("nav.communityTrendShort")}</span>
            <span className="hidden sm:inline">{t("nav.communityTrend")}</span>
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white sm:px-4 sm:text-sm"
          >
            {t("nav.pickAnime")}
          </Link>
        </div>
      </div>
    </header>
  );
}
