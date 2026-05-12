"use client";

import { useI18n } from "@/components/i18n/i18n-provider";

export function CommunityTrendIntro() {
  const { t } = useI18n();

  return (
    <header className="mb-6 max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {t("community.title")}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {t("community.description")}
      </p>
    </header>
  );
}
