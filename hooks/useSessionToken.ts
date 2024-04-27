"use client";

import { create } from "zustand";

interface TriggerState {
  isTriggered: boolean;
  setTrigger: (value: boolean) => void;
}

export const useTriggerState = create<TriggerState>()((set) => ({
  isTriggered: false,
  setTrigger: (value) => set((state) => ({ isTriggered: value })),
}));
