import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import MealUnitForm from "@/components/\bcalculator/meal-unit-form";
import { Title } from "@/components/\bcalculator/title";
import {
  getDayExchangeUnit,
  getMealPlanIdWithUrl,
  getMealUnits,
} from "@/data/meal";
import { Fragment } from "react";
import UrlVerifyAlert from "../_components/url-verify-alert";
import { getTranslations } from "next-intl/server";

const MealUnitPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const t = await getTranslations("meal-unit-page")
  const verifiedMealPlanId = await getMealPlanIdWithUrl(searchParams);

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);
  const mealUnits = await getMealUnits(verifiedMealPlanId);

  if (!verifiedMealPlanId || !dayExchangeUnit) {
    return <UrlVerifyAlert />;
  } else {
    return (
      <Fragment>
        <Title
          title={t("title")}
          desc={t("desc")}
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
