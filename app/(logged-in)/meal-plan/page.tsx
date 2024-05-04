import MealPlanCard from "./_components/meal-plan-card";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import CreateMealPlanButton from "./_components/create-meal-plan-button";

const MealPlanPage = () => {
  return (
    <Fragment>
      <div className="w-full flex items-center justify-between">
        <Title title="끼니별 식품 교환단위수" />
        <CreateMealPlanButton/>
      </div>

      <div className="grow border shadow-md rounded-md w-full">
        <MealPlanCard />
      </div>
    </Fragment>
  );
};

export default MealPlanPage;
