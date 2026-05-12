"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { usePostEditorStore } from "@/stores/post-editor-store";
import { toast } from "sonner";

type ShareNineModalProps = {
  open: boolean;
  onClose: () => void;
};

function buildShareText(params: {
  slots: { title: string }[];
  postTitle: string;
  postContent: string;
  defaultListTitle: string;
}) {
  const lines = params.slots.map((s, i) => `${i + 1}. ${s.title}`);
  const head =
    params.postTitle.trim().length > 0
      ? `「${params.postTitle.trim()}」\n\n`
      : `${params.defaultListTitle}\n\n`;
  const body = lines.join("\n");
  const tail =
    params.postContent.trim().length > 0
      ? `\n\n---\n${params.postContent.trim()}`
      : "";
  return `${head}${body}${tail}`;
}

export function ShareNineModal({ open, onClose }: ShareNineModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const slots = usePostEditorStore((s) => s.slots);
  const postTitle = usePostEditorStore((s) => s.postTitle);
  const postContent = usePostEditorStore((s) => s.postContent);
  const openMetaFromShare = usePostEditorStore((s) => s.openMetaFromShare);

  const filledSlots = useMemo(
    () => slots.filter((s): s is NonNullable<typeof s> => s !== null),
    [slots],
  );

  const shareText = useMemo(
    () =>
      buildShareText({
        slots: filledSlots,
        postTitle,
        postContent,
        defaultListTitle: t("editor.defaultShareListTitle"),
      }),
    [filledSlots, postTitle, postContent, t],
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

  const handleNativeShare = async () => {
    const title =
      postTitle.trim().length > 0
        ? postTitle.trim()
        : t("editor.defaultShareListTitle");
    if (typeof navigator === "undefined" || !navigator.share) {
      toast.error(t("editor.toastShareUnsupported"));
      return;
    }
    try {
      await navigator.share({ title, text: shareText });
      toast.success(t("editor.toastShareSent"));
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }
      toast.error(t("editor.toastShareFail"));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success(t("editor.toastCopyOk"));
    } catch {
      toast.error(t("editor.toastCopyFail"));
    }
  };

  if (!open) {
    return null;
  }

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
        className="relative flex max-h-[min(92vh,680px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-100 px-4 py-4 dark:border-zinc-800 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
              {t("editor.shareBadge")}
            </p>
            <h2
              id={titleId}
              className="truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {t("editor.shareTitle")}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("editor.shareHint")}
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

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
            {filledSlots.map((s) => (
              <li key={s.id} className="pl-1">
                {s.title}
              </li>
            ))}
          </ol>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {t("editor.shareTextLabel")}
            </p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              {shareText}
            </pre>
          </div>
        </div>

        <footer className="flex shrink-0 flex-col gap-2 border-t border-zinc-100 p-4 dark:border-zinc-800 sm:flex-row sm:flex-wrap sm:justify-end sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 sm:order-1"
          >
            {t("editor.backToSelection")}
          </button>
          <button
            type="button"
            onClick={openMetaFromShare}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:order-2"
          >
            {t("editor.writePost")}
          </button>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 sm:order-3"
          >
            {t("editor.copyText")}
          </button>
          <button
            type="button"
            onClick={() => void handleNativeShare()}
            className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white sm:order-4"
          >
            {t("editor.shareNative")}
          </button>
        </footer>
      </div>
    </div>
  );
}
