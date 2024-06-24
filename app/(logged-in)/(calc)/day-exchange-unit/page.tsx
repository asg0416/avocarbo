import { getDayExchangeUnit, getMealPlanIdWithUrl } from "@/data/meal";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import DayExchangeUnitForm from "@/components/\bcalculator/day_exchange_unit_form";
import { calcDayExchangeUnitTableData } from "@/actions/calc-day-exchange-unit-table-data";

const DayExchangeUnitPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  const dayExchangeUnit = await getDayExchangeUnit(verifiedMealPlanId);

  if (!verifiedMealPlanId) {
    return null;
  } else {
    const tableData = await calcDayExchangeUnitTableData(verifiedMealPlanId);

    return (
      <Fragment>
        <Title
          title="Step 3. 식품교환단위수 설정하기"
          desc="하루 식품 교환 단위수를 설정합니다."
        />
        <CardWrapper>
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
