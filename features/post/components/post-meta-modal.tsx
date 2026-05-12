"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { usePostEditorStore } from "@/stores/post-editor-store";
import { toast } from "sonner";

type PostMetaModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PostMetaModal({ open, onClose }: PostMetaModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const setPostTitle = usePostEditorStore((s) => s.setPostTitle);
  const setPostContent = usePostEditorStore((s) => s.setPostContent);

  const [localTitle, setLocalTitle] = useState(
    () => usePostEditorStore.getState().postTitle,
  );
  const [localContent, setLocalContent] = useState(
    () => usePostEditorStore.getState().postContent,
  );

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

  const handleSave = () => {
    const trimmed = localTitle.trim();
    if (trimmed.length === 0) {
      toast.error(t("editor.toastTitleRequired"));
      return;
    }
    setPostTitle(trimmed);
    setPostContent(localContent.trimEnd());
    toast.success(t("editor.toastMetaSaved"));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-110 flex items-end justify-center p-0 sm:items-center sm:p-4"
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
        className="relative flex max-h-[min(92vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-800 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {t("editor.metaBadge")}
            </p>
            <h2
              id={titleId}
              className="truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {t("editor.metaTitle")}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("editor.metaHint")}
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

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
          <div>
            <label
              htmlFor="post-title-input"
              className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              {t("editor.fieldTitle")}
            </label>
            <input
              id="post-title-input"
              value={localTitle}
              onChange={(e) => {
                setLocalTitle(e.target.value);
              }}
              placeholder={t("editor.titlePlaceholder")}
              maxLength={120}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-4 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-white/10"
            />
          </div>
          <div>
            <label
              htmlFor="post-content-input"
              className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
            >
              {t("editor.fieldContent")}
            </label>
            <textarea
              id="post-content-input"
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              placeholder={t("editor.contentPlaceholder")}
              rows={8}
              maxLength={4000}
              className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-900 outline-none ring-zinc-900/10 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-4 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-white/10"
            />
            <p className="mt-1 text-right text-xs text-zinc-400">
              {localContent.length} / 4000
            </p>
          </div>
        </div>

        <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:justify-end sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            {t("editor.backToSelection")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {t("editor.save")}
          </button>
        </footer>
      </div>
    </div>
  );
}
