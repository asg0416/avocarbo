import { getDayExchangeUnit, getMealPlanIdWithUrl } from "@/data/meal";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";
import DayExchangeUnitForm from "@/components/\bcalculator/day_exchange_unit_form";
import { calcDayExchangeUnitTableData } from "@/actions/calc-day-exchange-unit-table-data";

// TODO: 여기서 실제로 설정한 값의 영양 데이터를 최종 결과 화면 MealDetailResultPanel 에 보여줄수있도록 DB에 저장하고 화면 수정하기
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
