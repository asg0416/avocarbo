"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export const checkUser = async (mealPlanId: string) => {
  const t = await getTranslations("error");

  const user = await currentUser();
  if (!user) return { error: t("unauthorized-error") };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: t("unauthorized-error") };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: t("invalid-access-error") };

  if (mealPlan.userId !== dbUser.id) return { error: t("unauthorized-access-error") };
  return { ok: true };
};
