import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import MealUnitForm from "@/components/\bcalculator/meal-unit-form";
import { Title } from "@/components/\bcalculator/title";
import {
  getDayExchangeUnit,
  getMealPlanIdWithUrl,
  getMealUnits,
} from "@/data/meal";
import { Fragment } from "react";

const MealUnitPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);
  const mealUnits = await getMealUnits(verifiedMealPlanId);

  if (!verifiedMealPlanId) {
    return null;
  } else {
    return (
      <Fragment>
        <Title
          title="Step 4. 끼니별 식품군 단위수 설정하기"
          desc="하루 식품 교환 단위수를 설정합니다."
        />
        <CardWrapper className="flex w-full">
          <MealUnitForm
            verifiedMealPlanId={verifiedMealPlanId}
            dayExchangeUnitData={dayExchangeUnit}
            mealUnitsData={mealUnits}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default MealUnitPage;
