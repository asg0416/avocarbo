"use client";

import {create} from "zustand";

type ResponseHandler<T> = (value: T | PromiseLike<T>) => void;
export type DialogType = "alert" | "confirm" | "prompt";

interface DialogStore<T> {
  title: string;
  setTitle(text: string): void;
  description: string;
  setDescription(description: string): void;
  type: DialogType;
  setType(state: DialogType): void;
  revealed: boolean;
  setRevealed: (show: boolean) => void;
  children?: React.ReactNode;
  setChildren: (children: React.ReactNode) => void;
  responseHandler?: ResponseHandler<T>; // promise의 resolve 함수임.
  setResponseHandler: (responseHandler: ResponseHandler<T>) => void;
}

/**
 * alert, confirm, prompt 알림창을 사용하기 위한 Store Hook
 */
export const useDialogStore = create<DialogStore<any>>()((set) => ({
  title: "",
  setTitle(title) {
    set((prev) => ({ ...prev, title }));
  },
  description: "",
  setDescription(description) {
    set((prev) => ({ ...prev, description }));
  },
  type: "alert",
  setType(type) {
    set((prev) => ({ ...prev, type }));
  },
  revealed: false,
  setRevealed(revealed) {
    set((prev) => ({ ...prev, revealed }));
  },
  setChildren(children) {
    set((prev) => ({ ...prev, children }));
  },
  setResponseHandler(responseHandler) {
    set((prev) => ({ ...prev, responseHandler }));
  },
}));
