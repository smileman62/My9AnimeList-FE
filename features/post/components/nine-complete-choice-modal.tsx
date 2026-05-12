"use client";

import { useEffect, useId, useRef } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { usePostEditorStore } from "@/stores/post-editor-store";

type NineCompleteChoiceModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NineCompleteChoiceModal({
  open,
  onClose,
}: NineCompleteChoiceModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pickShareFromNine = usePostEditorStore((s) => s.pickShareFromNine);
  const pickWriteFromNine = usePostEditorStore((s) => s.pickWriteFromNine);

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
  }, [open]);

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

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-105 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-zinc-950/65 backdrop-blur-[2px]"
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-800 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {t("editor.nineDoneBadge")}
            </p>
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {t("editor.nineDoneTitle")}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("editor.nineDoneHint")}
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

        <div className="flex flex-col gap-2 p-4 sm:px-5 sm:pb-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            {t("editor.backToSelection")}
          </button>
          <button
            type="button"
            onClick={pickShareFromNine}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            {t("editor.shareAction")}
          </button>
          <button
            type="button"
            onClick={pickWriteFromNine}
            className="w-full rounded-xl bg-zinc-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {t("editor.writePost")}
          </button>
        </div>
      </div>
    </div>
  );
}
