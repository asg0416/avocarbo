import {
  getBasicInfo,
  getMealPlanIdWithUrl,
  getNutrientRatio,
} from "@/data/meal";
import NutrientRatioForm from "@/components/\bcalculator/nutrient-ratio-form";
import UrlVerifyAlert from "../_components/url-verify-alert";
import KcalInfo from "@/components/\bcalculator/kcal-info";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";

const NutrientRatioPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  if (!verifiedMealPlanId) return null;

  const basicInfo = await getBasicInfo(verifiedMealPlanId);
  const kcal = basicInfo?.energy_requirement;
  const nutrientRatio = await getNutrientRatio(verifiedMealPlanId);

  if (!kcal) {
    return <UrlVerifyAlert />;
  } else {
    return (
      <Fragment>
        <Title
          title="Step 2. 열량 구성비 설정하기"
          desc="하루 필요 열량을 구성하는 탄수화물, 단백질, 지방의 섭취 비율을 설정합니다."
        />
        <KcalInfo kcal={kcal} />
        <CardWrapper className="flex w-full">
          <NutrientRatioForm
            verifiedMealPlanId={verifiedMealPlanId}
            kcal={kcal}
            nutrientRatioData={nutrientRatio}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default NutrientRatioPage;
