import { BasicInfoForm } from "@/components/\bcalculator/basic-info-form";
import { getBasicInfo, getMealPlanIdWithUrl } from "@/data/meal";
import CalcPageWrapper from "../_components/calc-page-wrapper";

export const revalidate = 0;

const BasicInfoPage = async () => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  if (!verifiedMealPlanId) return null;

  const basicInfo = await getBasicInfo(verifiedMealPlanId);

  return (
    <CalcPageWrapper
      title="Step 1. 기본 정보 입력하기"
      desc="하루 필요 열량 및 비만도 계산을 위해 필요한 기본 정보 입력"
    >
      <BasicInfoForm
        verifiedMealPlanId={verifiedMealPlanId}
        basicInfo={basicInfo}
      />
    </CalcPageWrapper>
  );
  // }
};

export default BasicInfoPage;
