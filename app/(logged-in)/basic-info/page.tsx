import { BasicInfoForm } from "@/components/\bcalculator/basic-info-form";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { Title } from "@/components/\bcalculator/title";
import { getBasicInfo, getMealPlan } from "@/data/meal";
import { headers } from "next/headers";
import { Fragment } from "react";
import Alert from "./_components";
import { getSearchParams } from "@/data/searchParams";

const BasicInfoPage = async () => {
  const searchParams = getSearchParams()
  const mealPlanId = searchParams.get("mealPlanId");

  const existingMealPlan = await getMealPlan(mealPlanId);
  const basicInfo = await getBasicInfo(existingMealPlan?.id);

  // 올바른 주소로 접근했는지 확인 후 접근 막음
  if (!existingMealPlan?.id) {
    return <Alert />;
  } else {
    return (
      <Fragment>
        <Title
          title="Step 1. 기본 정보 입력하기"
          desc="하루 필요 열량 및 비만도 계산을 위해 필요한 기본 정보 입력"
        />
        <CardWrapper>
          <BasicInfoForm
            verifiedMealPlanId={existingMealPlan.id}
            basicInfo={basicInfo}
          />
        </CardWrapper>
      </Fragment>
    );
  }
};

export default BasicInfoPage;
