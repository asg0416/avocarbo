import MealPlanCard from "./_components/meal-plan-card";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import CreateMealPlanButton from "./_components/create-meal-plan-button";
import { getTranslations } from "next-intl/server";

const MealPlanPage = async () => {
  const t = await getTranslations("meal-plan-page");
  return (
    <Fragment>
      <div className="w-full flex items-center justify-between">
        <Title title={t("title")} desc={t("desc")} />
      </div>
      <div className="w-full flex justify-end ">
        <CreateMealPlanButton />
      </div>

      <div className="grow border shadow-md rounded-md w-full">
        <MealPlanCard />
      </div>
    </Fragment>
  );
};

export default MealPlanPage;
