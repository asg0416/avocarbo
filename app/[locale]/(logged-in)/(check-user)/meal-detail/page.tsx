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
import { getTranslations } from "next-intl/server";

const MealDetailPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const t = await getTranslations("meal-detail-page")
  const verifiedMealPlanId = await getMealPlanIdWithUrl(searchParams);

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);
  const mealUnits = await getMealUnits(verifiedMealPlanId);

  if (!verifiedMealPlanId || !dayExchangeUnit || !mealUnits) {
    return <UrlVerifyAlert />;
  } else {
    return (
      <Fragment>
        <Title
          title={t("title")}
          desc={t("desc")}
        />
        <div className="flex w-full justify-end items-center">
          <SaveAsImageButton targetId="meal-detail-table" />
          <PrintButton targetId="meal-detail-table" />
        </div>
        <CardWrapper className="flex w-full pt-0" id="meal-detail-table">
          <MealDetailResultPanel verifiedMealPlanId={verifiedMealPlanId} />
          <MealDetailContents
            dayExchangeUnitData={dayExchangeUnit}
            mealUnitsData={mealUnits}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default MealDetailPage;
