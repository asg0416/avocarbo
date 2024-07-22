"use client"

import { calcCreateMealPlan } from "@/actions/calc-creat-meal-plan";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const CreateMealPlanButton = () => {
  const t = useTranslations("home-page")
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createMealPlanHandler = () => {
    startTransition(() => {
      calcCreateMealPlan().then((data) => {
        if (data.error) {
          toast(data.error);
        }
        if (data.ok) {
          return router.push(`/basic-info?mealPlanId=${data.mealPlanId}`);
        }
      });
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={createMealPlanHandler}
      variant="mainBtn"
      className="rounded-full"
      size="lg"
    >
      {t("create-meal-plan-button-label")}
    </Button>
  );
}
 
export default CreateMealPlanButton;