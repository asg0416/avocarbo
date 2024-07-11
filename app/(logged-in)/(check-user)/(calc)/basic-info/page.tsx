import { BasicInfoForm } from "@/components/\bcalculator/basic-info-form";
import { getBasicInfo, getMealPlanIdWithUrl } from "@/data/meal";
import { Fragment } from "react";
import { Title } from "@/components/\bcalculator/title";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";

export const revalidate = 0;

const BasicInfoPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  if (!verifiedMealPlanId) return null;

  const basicInfo = await getBasicInfo(verifiedMealPlanId);

  return (
    <Fragment>
      <Title
        title="Step 1. 기본 정보 입력하기"
        desc="하루 필요 열량 및 비만도 계산을 위해 필요한 기본 정보 입력"
      />
      <CardWrapper className="flex w-full">
        <BasicInfoForm
          verifiedMealPlanId={verifiedMealPlanId}
          basicInfo={basicInfo}
        />
      </CardWrapper>
    </Fragment>
  );
};

export default BasicInfoPage;
