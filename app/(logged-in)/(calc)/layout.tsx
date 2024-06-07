import { Suspense } from "react";
import Loading from "../loading";
import { getMealPlanIdWithUrl } from "@/data/meal";
import UrlVerifyAlert from "./_components/url-verify-alert";
interface CalcPageLayoutProps {
  children: React.ReactNode;
}

// mealPlan Id가 없거나 잘못된 경우 접근 막는 로직
const CalcPageLayout = async ({ children }: CalcPageLayoutProps) => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();

  // 올바른 주소로 접근했는지 확인 후 접근 막음
  if (!verifiedMealPlanId) {
    return <UrlVerifyAlert />;
  } else {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
  }
};

export default CalcPageLayout;
