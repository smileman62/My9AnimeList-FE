import { create } from "zustand";
import type { EditorAnime } from "@/features/anime/types/anime";

const SLOT_COUNT = 9;

function isDuplicate(
  slots: (EditorAnime | null)[],
  animeId: number,
  exceptIndex: number,
) {
  return slots.some(
    (slot, index) => index !== exceptIndex && slot?.id === animeId,
  );
}

function allSlotsFilled(slots: (EditorAnime | null)[]) {
  return slots.every((s) => s !== null);
}

type PostEditorState = {
  slots: (EditorAnime | null)[];
  modalSlotIndex: number | null;
  /** 9칸 완료 직후: 공유 / 글 작성 중 선택 */
  afterNineChoiceModalOpen: boolean;
  shareModalOpen: boolean;
  metaModalOpen: boolean;
  postTitle: string;
  postContent: string;
  openPicker: (slotIndex: number) => void;
  closePicker: () => void;
  assignToSlot: (slotIndex: number, anime: EditorAnime) => boolean;
  clearSlot: (slotIndex: number) => void;
  closeAfterNineChoiceModal: () => void;
  openAfterNineChoiceModal: () => void;
  pickShareFromNine: () => void;
  pickWriteFromNine: () => void;
  closeShareModal: () => void;
  openMetaFromShare: () => void;
  closeMetaModal: () => void;
  setPostTitle: (value: string) => void;
  setPostContent: (value: string) => void;
};

export const usePostEditorStore = create<PostEditorState>((set, get) => ({
  slots: Array.from({ length: SLOT_COUNT }, () => null),
  modalSlotIndex: null,
  afterNineChoiceModalOpen: false,
  shareModalOpen: false,
  metaModalOpen: false,
  postTitle: "",
  postContent: "",

  openPicker: (slotIndex) => {
    if (slotIndex < 0 || slotIndex >= SLOT_COUNT) return;
    set({ modalSlotIndex: slotIndex });
  },

  closePicker: () => set({ modalSlotIndex: null }),

  closeAfterNineChoiceModal: () => set({ afterNineChoiceModalOpen: false }),

  openAfterNineChoiceModal: () => {
    if (!allSlotsFilled(get().slots)) return;
    set({ afterNineChoiceModalOpen: true });
  },

  pickShareFromNine: () =>
    set({ afterNineChoiceModalOpen: false, shareModalOpen: true }),

  pickWriteFromNine: () =>
    set({ afterNineChoiceModalOpen: false, metaModalOpen: true }),

  closeShareModal: () => set({ shareModalOpen: false }),

  openMetaFromShare: () =>
    set({ shareModalOpen: false, metaModalOpen: true }),

  closeMetaModal: () => set({ metaModalOpen: false }),

  setPostTitle: (value) => set({ postTitle: value }),
  setPostContent: (value) => set({ postContent: value }),

  assignToSlot: (slotIndex, anime) => {
    const { slots } = get();
    if (isDuplicate(slots, anime.id, slotIndex)) {
      return false;
    }
    const wasAllFilled = allSlotsFilled(slots);
    const next = [...slots];
    next[slotIndex] = anime;
    const nowAllFilled = allSlotsFilled(next);
    const shouldOpenAfterNine = nowAllFilled && !wasAllFilled;

    set({
      slots: next,
      modalSlotIndex: null,
      ...(shouldOpenAfterNine ? { afterNineChoiceModalOpen: true } : {}),
    });
    return true;
  },

  clearSlot: (slotIndex) => {
    set((state) => {
      const next = [...state.slots];
      next[slotIndex] = null;
      const stillFull = allSlotsFilled(next);
      return {
        slots: next,
        afterNineChoiceModalOpen: stillFull
          ? state.afterNineChoiceModalOpen
          : false,
        shareModalOpen: stillFull ? state.shareModalOpen : false,
        metaModalOpen: stillFull ? state.metaModalOpen : false,
      };
    });
  },
}));
