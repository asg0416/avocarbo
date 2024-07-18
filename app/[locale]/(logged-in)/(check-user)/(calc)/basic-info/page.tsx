import { BasicInfoForm } from "@/components/\bcalculator/basic-info-form";
import { getBasicInfo, getMealPlanIdWithUrl } from "@/data/meal";
import { Fragment } from "react";
import { Title } from "@/components/\bcalculator/title";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import { getTranslations } from "next-intl/server";

export const revalidate = 0;

const BasicInfoPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const t = await getTranslations("basic-info-page");
  const verifiedMealPlanId = await getMealPlanIdWithUrl(searchParams);

  if (!verifiedMealPlanId) return null;

  const basicInfo = await getBasicInfo(verifiedMealPlanId);

  return (
    <Fragment>
      <Title title={t("title")} desc={t("desc")} />
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
