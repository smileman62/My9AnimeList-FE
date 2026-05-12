"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n-provider";

export function HomePageView() {
  const { t } = useI18n();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-16 sm:py-24">
        <section className="space-y-4 text-center sm:text-left">
          <p className="text-sm font-medium uppercase tracking-wide text-violet-600 dark:text-violet-400">
            {t("home.brand")}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {t("home.title")}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("home.introStart")}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              {t("home.introStrong")}
            </strong>
            {t("home.introEnd")}
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {t("home.howTitle")}
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>{t("home.step1")}</li>
            <li>{t("home.step2")}</li>
            <li>{t("home.step3")}</li>
          </ol>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {t("home.ruleNote")}
          </p>
        </section>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/search"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {t("home.ctaPick")}
          </Link>
          <Link
            href="/community/trend"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            {t("home.ctaCommunity")}
          </Link>
        </div>
      </main>
    </div>
  );
}
