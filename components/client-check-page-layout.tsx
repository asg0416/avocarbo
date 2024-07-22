// ClientCheckUserPageLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getMealPlan } from "@/data/meal"; // getMealPlan 함수를 임포트합니다.
import { checkUser } from "@/actions/check-user";
import Loading from "@/app/[locale]/(logged-in)/loading";
import UrlVerifyAlert from "@/app/[locale]/(logged-in)/(check-user)/(calc)/_components/url-verify-alert";
import { useTranslations } from "next-intl";

interface ClientCheckUserPageLayoutProps {
  children: React.ReactNode;
}

const ClientCheckUserPageLayout = ({
  children,
}: ClientCheckUserPageLayoutProps) => {
  const t = useTranslations("error")
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const mealPlanId = searchParams.get("mealPlanId");
      if (!mealPlanId) {
        setError(t("invalid-access-error"));
        setLoading(false);
        return;
      }

      const existingMealPlan = await getMealPlan(mealPlanId);
      if (!existingMealPlan?.id) {
        setError(t("invalid-access-error"));
        setLoading(false);
        return;
      }

      const verifiedUser = await checkUser(existingMealPlan.id);
      if (verifiedUser.error) {
        setError(verifiedUser.error);
        setLoading(false);
        return;
      }

      setVerified(true);
      setLoading(false);
    };

    verify();
  }, [pathname, searchParams]);

  if (loading) return <Loading />;
  if (error) return <UrlVerifyAlert msg={error} />;
  if (verified) return <>{children}</>;

  return null;
};

export default ClientCheckUserPageLayout;
