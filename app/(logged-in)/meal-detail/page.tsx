import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import MealDetailContents from "@/components/\bcalculator/meal-detail-contents";
import { Title } from "@/components/\bcalculator/title";
import {
  getDayExchangeUnit,
  getMealPlanIdWithUrl,
  getMealUnits,
} from "@/data/meal";
import { Fragment } from "react";

const MealDetailPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);
  const mealUnits = await getMealUnits(verifiedMealPlanId);

  if (!verifiedMealPlanId) {
    return null;
  } else {
    return (
      <Fragment>
        <Title
          title="식품 교환 단위수 식단"
          desc="축하합니다! 완성된 식품 교환 단위수 식단으로 건강한 한 끼를 시작해보세요!"
        />
        <CardWrapper className="flex w-full">
          <MealDetailContents
            verifiedMealPlanId={verifiedMealPlanId}
            dayExchangeUnitData={dayExchangeUnit}
            mealUnitsData={mealUnits}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default MealDetailPage;
