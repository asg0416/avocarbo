"use client";

import { create } from "zustand";

interface ConfirmAlertState {
  open: boolean;
  onOpenChangeHandler: (open: boolean) => void;
}

export const useConfirmAlertState = create<ConfirmAlertState>()((set) => ({
  open: false,
  onOpenChangeHandler: (open) => set((state) => ({ ...state, open: open })),
}));
