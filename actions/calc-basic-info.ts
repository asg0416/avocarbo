"use server";

import { getMealPlan } from "@/data/meal";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import {
  classifyActiveLevelWithBMI,
  pregnancyPeriodRequiredEnergy,
} from "@/lib/calc";
import { db } from "@/lib/db";
import { roundToDecimal, roundToNearestTen } from "@/lib/utils";
import { BasicInfoSchema } from "@/schemas/calc-index";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const calcBasicInfo = async (
  values: z.infer<typeof BasicInfoSchema>,
  mealPlanId: string,
  basicInfoId?: string
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) return { error: "Unauthorized" };

  const mealPlan = await getMealPlan(mealPlanId);
  if (!mealPlan) return { error: "올바른 접근이 아닙니다." };

  const validatedFields = BasicInfoSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { height, weight, pregnancy_period, active_level } =
    validatedFields.data;

  const standard_weight = roundToDecimal(Math.pow(height / 100, 2) * 21, 1);
  const bmi = roundToDecimal(weight / Math.pow(height / 100, 2), 1);
  const { adjustValue, obesity_degree } = classifyActiveLevelWithBMI(
    bmi,
    active_level
  );

  if (!adjustValue) return { error: "값이 유효하지 않습니다." };

  // 임신 아닌 사람 하루 필요 열량
  const energy_requirement = roundToNearestTen(standard_weight * adjustValue);
  if (!pregnancy_period) return { error: "임신 기간을 설정해주세요." };
  const pregnancy_energy_requirement =
    energy_requirement + pregnancyPeriodRequiredEnergy[pregnancy_period];

  console.log("calcBasicInfo Data ::: ", {
    standard_weight,
    bmi,
    obesity_degree,
    energy_requirement,
    pregnancy_energy_requirement,
    adjustValue,
  });

  const formData = {
    mealPlanId: mealPlan.id,
    ...validatedFields.data,
    standard_weight,
    bmi,
    obesity_degree,
    energy_requirement: pregnancy_energy_requirement,
    created_at: new Date(),
  };

  if (basicInfoId) {
    try {
      await db.calcBasicInfo.update({
        where: { id: basicInfoId },
        data: formData,
      });
      revalidatePath("/basic-info");
      return { ok: true };
    } catch (error) {
      console.log("calcBasicInfo Error ::", { error });

      return { error: "Something went wrong!" };
    }
  } else {
    try {
      await db.calcBasicInfo.create({
        data: formData,
      });
      revalidatePath("/basic-info");

      return { ok: true };
    } catch (error) {
      console.log("calcBasicInfo Error ::", { error });

      return { error: "Something went wrong!" };
    }
  }
};
