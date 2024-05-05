import { Suspense } from "react";
import Loading from "../loading";
import { getSearchParams } from "@/data/searchParams";
import { getBasicInfo, getMealPlan, getMealPlanIdWithUrl } from "@/data/meal";
import Alert from "./_components/alert";

interface CalcPageLayoutProps {
  children: React.ReactNode;
}

// mealPlan Id가 없거나 잘못된 경우 접근 막는 로직
const CalcPageLayout = async ({ children }: CalcPageLayoutProps) => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  // 올바른 주소로 접근했는지 확인 후 접근 막음
  if (!verifiedMealPlanId) {
    return <Alert />;
  } else {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
  }
};

export default CalcPageLayout;
