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
import { getTranslations } from "next-intl/server";

const NutrientRatioPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const t = await getTranslations("nutrient-ratio-page")
  const verifiedMealPlanId = await getMealPlanIdWithUrl(searchParams);

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
          title={t("title")}
          desc={t("desc")}
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
