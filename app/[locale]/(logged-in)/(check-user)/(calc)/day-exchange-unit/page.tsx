import { getDayExchangeUnit, getMealPlanIdWithUrl } from "@/data/meal";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import DayExchangeUnitForm from "@/components/\bcalculator/day_exchange_unit_form";
import { calcDayExchangeUnitTableData } from "@/actions/calc-day-exchange-unit-table-data";
import UrlVerifyAlert from "../_components/url-verify-alert";
import { getTranslations } from "next-intl/server";

const DayExchangeUnitPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const t = await getTranslations("day-exchange-unit-page");
  const verifiedMealPlanId = await getMealPlanIdWithUrl(searchParams);

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);

  if (!verifiedMealPlanId) {
    return null;
  } else {
    const tableData = await calcDayExchangeUnitTableData(verifiedMealPlanId);

    if (tableData.error) return <UrlVerifyAlert />;

    return (
      <Fragment>
        <Title
          title={t("title")}
          desc={t("desc")}
        />
        <CardWrapper className="flex w-full">
          <DayExchangeUnitForm
            tableData={tableData}
            verifiedMealPlanId={verifiedMealPlanId}
            dayExchangeUnitData={dayExchangeUnit}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default DayExchangeUnitPage;
