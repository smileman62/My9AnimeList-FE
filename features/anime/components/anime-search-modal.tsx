"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useAnimeSearchQuery } from "@/features/anime/hooks/use-anime-search-query";
import type { EditorAnime } from "@/features/anime/types/anime";
import { useI18n } from "@/components/i18n/i18n-provider";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { toast } from "sonner";

type AnimeSearchModalProps = {
  open: boolean;
  slotIndex: number | null;
  onClose: () => void;
  onSelect: (anime: EditorAnime) => boolean;
};

export function AnimeSearchModal({
  open,
  slotIndex,
  onClose,
  onSelect,
}: AnimeSearchModalProps) {
  const { t, tx } = useI18n();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 550);
  const { data, isFetching, isError, error, refetch } = useAnimeSearchQuery(
    debouncedQuery,
    { enabled: open },
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open, slotIndex]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [open, onClose]);

  if (!open || slotIndex === null) {
    return null;
  }

  const results = data ?? [];

  const handlePick = (anime: EditorAnime) => {
    const ok = onSelect(anime);
    if (!ok) {
      toast.error(t("editor.toastDuplicate"));
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px]"
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-800 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {tx("editor.slotLabel", { n: slotIndex + 1 })}
            </p>
            <h2
              id={titleId}
              className="truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {t("editor.searchTitle")}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("editor.searchHint")}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            aria-label={t("common.close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="shrink-0 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800 sm:px-5">
          <label className="sr-only" htmlFor="anime-search-input">
            {t("editor.queryLabel")}
          </label>
          <input
            id="anime-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("editor.searchPlaceholder")}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-4 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-white/10"
            autoComplete="off"
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
          {query.trim().length < 2 ? (
            <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {t("editor.minQuery")}
            </p>
          ) : isError ? (
            <div className="py-10 text-center">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error instanceof Error ? error.message : t("editor.searchError")}
              </p>
              <button
                type="button"
                onClick={() => {
                  void (async () => {
                    const r = await refetch();
                    if (r.isSuccess) {
                      toast.success(t("editor.toastRefetchOk"));
                    } else if (r.isError) {
                      toast.error(t("editor.toastRefetchFail"));
                    }
                  })();
                }}
                className="mt-3 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
              >
                {t("editor.retry")}
              </button>
            </div>
          ) : isFetching ? (
            <ul className="space-y-3 py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <div className="size-16 shrink-0 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="min-w-0 flex-1 space-y-2 py-0.5">
                    <div className="h-4 w-3/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-2/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {t("editor.searchEmpty")}
            </p>
          ) : (
            <ul className="space-y-3 pb-4">
              {results.map((anime) => (
                <li key={anime.id}>
                  <button
                    type="button"
                    onClick={() => handlePick(anime)}
                    className="flex w-full gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-left transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      {anime.thumbnailUrl ? (
                        <Image
                          src={anime.thumbnailUrl}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-xs text-zinc-400">
                          {t("common.noImage")}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-semibold text-zinc-900 dark:text-zinc-50">
                        {anime.title}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {t("editor.airedPrefix")} {anime.airedLabel}
                      </p>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {anime.synopsis}
                      </p>
                      <span className="mt-2 inline-flex text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {t("editor.pickThis")}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
