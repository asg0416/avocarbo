"use client";

import { create } from "zustand";

interface PendingStore {
  isHrefPending: boolean;
  setIsHrefPending: (isHrefPending: boolean) => void;
}

export const usePendingStore = create<PendingStore>()((set) => ({
  isHrefPending: false,
  setIsHrefPending(isHrefPending) {
    set(() => ({ isHrefPending }));
  },
}));
