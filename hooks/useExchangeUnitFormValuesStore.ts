"use client";

import { create } from "zustand";

interface ExchangeUnitFormValuesState {
  milk_whole: number;
  milk_low_fat: number;
  vegetables: number;
  fruits: number;
  grains: number;
  protein_low_fat: number;
  protein_medium_fat: number;
  protein_high_fat: number;
  fats: number;
}

interface ExchangeUnitFormValuesActions {
  setValues: (values: Partial<ExchangeUnitFormValuesState>) => void;
}

export const useExchangeUnitFormValuesStore = create<
  ExchangeUnitFormValuesState & ExchangeUnitFormValuesActions
>()((set) => ({
  milk_whole: 0,
  milk_low_fat: 0,
  vegetables: 0,
  fruits: 0,
  grains: 0,
  protein_low_fat: 0,
  protein_medium_fat: 0,
  protein_high_fat: 0,
  fats: 0,
  setValues: (values) => set((state) => ({ ...state, ...values })),
}));
