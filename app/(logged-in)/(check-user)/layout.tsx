import { Suspense } from "react";
import Loading from "../loading";
import { getMealPlanIdWithUrl } from "@/data/meal";
import { checkUser } from "@/actions/check-user";
import UrlVerifyAlert from "./(calc)/_components/url-verify-alert";

interface LoggedInPageLayoutProps {
  children: React.ReactNode;
}

const CheckUserPageLayout = async ({ children }: LoggedInPageLayoutProps) => {
  const verifiedMealPlanId = await getMealPlanIdWithUrl();
  if (!verifiedMealPlanId) {
    return <UrlVerifyAlert />;
  }

  const verifiedUser = await checkUser(verifiedMealPlanId);
  if (verifiedUser.error) return <UrlVerifyAlert msg={verifiedUser.error} />;

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default CheckUserPageLayout;
