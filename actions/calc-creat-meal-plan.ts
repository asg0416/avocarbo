"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const calcCreateMealPlan = async () => {
  const user = await currentUser();
  if (!user) return { error: "로그인이 필요한 기능입니다. 🚨" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  try {
    const mealPlan = await db.mealPlan.create({
      data: {
        userId: dbUser.id,
      },
    });
    return { ok: true, mealPlanId: mealPlan.id };
  } catch (error) {
    console.log("calcCreateMealPlan Error ::", { error });

    return { error: "Something went wrong!" };
  }
};
