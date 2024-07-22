import { mealTimes } from "./constants";

// interfaces.ts
export interface MealPlan {
  id: string;
  title: string;
  dayExchangeUnit: DayExchangeUnit;
  mealUnits: MealUnit[];
}

export interface DayExchangeUnit {
  [key: string]: number;
}

export interface MealUnit {
  id: string;
  sort: number;
  [key: string]: number | string;
}

export type MealTime = (typeof mealTimes)[number];

export type MealUnitField =
  | "sort"
  | "morning"
  | "morningSnack"
  | "lunch"
  | "afternoonSnack"
  | "dinner";

export type mealUnit = {
  sort: number;
  morning: number;
  morningSnack: number;
  lunch: number;
  afternoonSnack: number;
  dinner: number;
};
