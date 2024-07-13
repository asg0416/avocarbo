import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import MealDetailContents from "@/components/\bcalculator/meal-detail-contents";
import { Title } from "@/components/\bcalculator/title";
import {
  getDayExchangeUnit,
  getMealPlanIdWithUrl,
  getMealUnits,
} from "@/data/meal";
import { Fragment } from "react";
import {
  PrintButton,
  SaveAsImageButton,
} from "./_components/save-image-and-print-button";
import MealDetailResultPanel from "./_components/meal-detail-result-panel";
import UrlVerifyAlert from "../(calc)/_components/url-verify-alert";

const MealDetailPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);
  const mealUnits = await getMealUnits(verifiedMealPlanId);

  if (!verifiedMealPlanId || !dayExchangeUnit || !mealUnits) {
    return <UrlVerifyAlert />;
  } else {
    return (
      <Fragment>
        <Title
          title="교환단위수 식단 작성하기 Complete! 🎉"
          desc="축하합니다! 완성된 식품 교환단위수 식단으로 건강한 한 끼를 시작해보세요!"
        />
        <div className="flex w-full justify-end items-center">
          <SaveAsImageButton targetId="meal-detail-table" />
          <PrintButton targetId="meal-detail-table" />
        </div>
        <CardWrapper className="flex w-full pt-0" id="meal-detail-table">
          <MealDetailResultPanel verifiedMealPlanId={verifiedMealPlanId} />
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
