"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";

export function PostNotFoundView() {
  const { t } = useI18n();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        {t("postNotFound.title")}
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {t("postNotFound.description")}
      </p>
      <Link
        href="/community/trend"
        className="mt-6 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {t("postNotFound.back")}
      </Link>
    </main>
  );
}
