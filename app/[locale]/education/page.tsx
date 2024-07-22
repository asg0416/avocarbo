"use client";

import { useTranslations } from "next-intl";

import { Fragment } from "react";
import { Title } from "@/components/\bcalculator/title";
import { CardWrapper } from "@/components/\bcalculator/card-wrapper";
import Items from "./_components/item";
import { Card, CardContent } from "@/components/ui/card";

export default function PregnancyDiabetesEducation() {
  const t = useTranslations("PregnancyDiabetesEducation");

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
