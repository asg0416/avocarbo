
import { useTranslations } from "next-intl";

import { Fragment } from "react";
import { Title } from "@/components/\bcalculator/title";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import Items from "./_components/item";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";
import { fetchPageData, generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata(
  { params: locale }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generatePageMetadata(async () => {
    // 페이지 특정 데이터 가져오기
    const pageData = await fetchPageData(locale);
    return pageData;
  }, parent);
}

export default async function PregnancyDiabetesEducation() {
  const t = await getTranslations("PregnancyDiabetesEducation");

  return (
    <Fragment>
      <Title title={t("title")} desc={t("description")} />
      <div className="flex w-full grow pt-5">
        <Card className="border shadow-md rounded-md pt-2 sm:pt-4 flex items-center justify-center flex-col w-full need-remove-border">
          <CardContent className="w-full p-2 sm:p-6">
            <Items />
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
