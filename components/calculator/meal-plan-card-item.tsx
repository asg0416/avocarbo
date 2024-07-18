import { Prisma } from "@prisma/client";
import { Fragment } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { MealPlanCardDropdownMenu } from "./meal-plan-card-dropdown-menu";
import { Separator } from "../ui/separator";
import { getTranslations } from "next-intl/server";

type FullMealPlan = Prisma.MealPlanGetPayload<{
  include: {
    calcBasicInfo: true;
  };
}>;

interface MealPlanCardItemProps {
  mealPlans: FullMealPlan[];
}

const MealPlanCardItem = async ({ mealPlans }: MealPlanCardItemProps) => {
  const t = await getTranslations("meal-plan-page");
  const tpg = await getTranslations("pg-period-label");
  return (
    <Fragment>
      {mealPlans.map(({ id, createdAt, title, calcBasicInfo }) => {
        const formedDate = formatDate(new Date(createdAt));
        return (
          <Card key={id}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  {title || t("card-default-prefix", { formedDate })}
                  <MealPlanCardDropdownMenu mealPlanId={id} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-x-4 h-6 text-sm items-center">
                <Item
                  label={t("card-weight-label")}
                  data={calcBasicInfo?.weight}
                  unit="kg"
                />
                <Separator orientation="vertical" />
                <Item
                  label={t("card-pg-period-label")}
                  data={calcBasicInfo && tpg(calcBasicInfo.pregnancy_period)}
                  unit=""
                />
                <Separator orientation="vertical" />
                <Item
                  label={t("card-kcal-label")}
                  data={calcBasicInfo?.energy_requirement}
                  unit="kcal"
                />
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>
                {t("card-date-label", { formedDate })}
              </CardDescription>
            </CardFooter>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default MealPlanCardItem;

interface ItemProps {
  label: string;
  data: any;
  unit: any;
}
const Item = ({ label, data, unit }: ItemProps) => {
  return (
    <div className="flex gap-x-2 bg-gray-200 py-1 px-2 rounded-md">
      <p>{label} :</p>
      <p>
        {data}
        {data ? unit : "--"}
      </p>
    </div>
  );
};
