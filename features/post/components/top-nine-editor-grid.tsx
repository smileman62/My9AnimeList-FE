"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n-provider";
import { AnimeSearchModal } from "@/features/anime/components/anime-search-modal";
import { NineCompleteChoiceModal } from "@/features/post/components/nine-complete-choice-modal";
import { PostMetaModal } from "@/features/post/components/post-meta-modal";
import { ShareNineModal } from "@/features/post/components/share-nine-modal";
import { usePostEditorStore } from "@/stores/post-editor-store";

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-7"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TopNineEditorGrid() {
  const { t, tx } = useI18n();
  const slots = usePostEditorStore((s) => s.slots);
  const modalSlotIndex = usePostEditorStore((s) => s.modalSlotIndex);
  const afterNineChoiceModalOpen = usePostEditorStore(
    (s) => s.afterNineChoiceModalOpen,
  );
  const shareModalOpen = usePostEditorStore((s) => s.shareModalOpen);
  const metaModalOpen = usePostEditorStore((s) => s.metaModalOpen);
  const postTitle = usePostEditorStore((s) => s.postTitle);
  const openPicker = usePostEditorStore((s) => s.openPicker);
  const closePicker = usePostEditorStore((s) => s.closePicker);
  const assignToSlot = usePostEditorStore((s) => s.assignToSlot);
  const clearSlot = usePostEditorStore((s) => s.clearSlot);
  const openAfterNineChoiceModal = usePostEditorStore(
    (s) => s.openAfterNineChoiceModal,
  );
  const closeAfterNineChoiceModal = usePostEditorStore(
    (s) => s.closeAfterNineChoiceModal,
  );
  const closeShareModal = usePostEditorStore((s) => s.closeShareModal);
  const closeMetaModal = usePostEditorStore((s) => s.closeMetaModal);

  const allFilled = slots.every((s) => s !== null);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {t("editor.title")}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {t("editor.intro")}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-2 sm:max-w-lg sm:gap-3">
        {slots.map((slot, index) => {
          const filled = slot !== null;
          return (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-900/40"
            >
              {filled ? (
                <>
                  <div className="absolute inset-0">
                    {slot.thumbnailUrl ? (
                      <Image
                        src={slot.thumbnailUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 33vw, 180px"
                        className="object-cover"
                        unoptimized={
                          !slot.thumbnailUrl.includes("cdn.myanimelist.net")
                        }
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-zinc-200 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {t("common.noImage")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5">
                    <p className="line-clamp-2 text-center text-[11px] font-semibold leading-snug text-white drop-shadow sm:text-xs">
                      {slot.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPicker(index)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm transition hover:bg-black/60 sm:text-xs"
                  >
                    {t("editor.change")}
                  </button>
                  <button
                    type="button"
                    onClick={() => clearSlot(index)}
                    className="absolute left-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/60"
                    aria-label={tx("editor.clearSlotAria", { n: index + 1 })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-3.5"
                      aria-hidden
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openPicker(index)}
                  className="flex size-full flex-col items-center justify-center gap-2 text-zinc-400 transition hover:bg-zinc-100/80 hover:text-zinc-700 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                  aria-label={tx("editor.addSlotAria", { n: index + 1 })}
                >
                  <span className="flex size-12 items-center justify-center rounded-full border border-zinc-300 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-950">
                    <PlusIcon />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500 sm:text-xs">
                    {t("editor.add")}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {allFilled ? (
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-4 text-center dark:border-emerald-900/60 dark:bg-emerald-950/30 sm:max-w-lg">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {t("editor.allNineTitle")}
          </p>
          <p className="text-xs text-emerald-800/90 dark:text-emerald-200/90">
            {postTitle ? t("editor.allNineHintSaved") : t("editor.allNineHintNew")}
          </p>
          <button
            type="button"
            onClick={openAfterNineChoiceModal}
            className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {t("editor.openNextStep")}
          </button>
        </div>
      ) : null}

      <AnimeSearchModal
        open={modalSlotIndex !== null}
        slotIndex={modalSlotIndex}
        onClose={closePicker}
        onSelect={(anime) => {
          if (modalSlotIndex === null) return false;
          return assignToSlot(modalSlotIndex, anime);
        }}
      />

      <NineCompleteChoiceModal
        open={afterNineChoiceModalOpen}
        onClose={closeAfterNineChoiceModal}
      />

      <ShareNineModal open={shareModalOpen} onClose={closeShareModal} />

      <PostMetaModal
        key={metaModalOpen ? "post-meta-open" : "post-meta-closed"}
        open={metaModalOpen}
        onClose={closeMetaModal}
      />
    </div>
  );
}
