import {
  getBasicInfo,
  getDayExchangeUnit,
  getMealPlanIdWithUrl,
  getNutrientRatio,
} from "@/data/meal";
import NutrientRatioForm from "@/components/\bcalculator/nutrient-ratio-form";
import UrlVerifyAlert from "../_components/url-verify-alert";
import KcalInfo from "@/components/\bcalculator/kcal-info";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import DayExchangeUnitForm from "@/components/\bcalculator/day_exchange_unit_form";

// TODO: 하루 식품 교환 단위수 설정 페이지 만들기
const DayExchangeUnitPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);

  if (!verifiedMealPlanId) {
    return null;
  } else {
    return (
      <Fragment>
        <Title
          title="Step 3. 식품교환단위수 설정하기"
          desc="하루 식품 교환 단위수를 설정합니다."
        />
        <CardWrapper>
          <DayExchangeUnitForm
            verifiedMealPlanId={verifiedMealPlanId}
            dayExchangeUnitData={dayExchangeUnit}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default DayExchangeUnitPage;
