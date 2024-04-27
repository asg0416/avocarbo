"use client";

import { create } from "zustand";

type Msg = string | undefined;
interface AlertState {
  success: Msg;
  error: Msg;
  email: Msg;
  setSuccess: (msg: Msg) => void;
  setError: (msg: Msg) => void;
  setEmail: (email: Msg) => void;
  setClear: () => void;
}

export const useAlertState = create<AlertState>()((set) => ({
  success: undefined,
  error: undefined,
  email: undefined,
  setSuccess: (msg) =>
    set((state) => ({ ...state, success: msg, error: undefined })),
  setError: (msg) =>
    set((state) => ({ ...state, success: undefined, error: msg })),
  setEmail: (email) => set((state) => ({ ...state, email: email })),
  setClear: () =>
    set((state) => ({
      success: undefined,
      error: undefined,
      email: undefined,
    })),
}));
