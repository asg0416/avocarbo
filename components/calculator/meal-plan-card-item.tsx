import { MealPlan, Prisma } from "@prisma/client";
import { Fragment } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import EditMealPlanTitleButton from "./edit-meal-plan-title-button";

type FullMealPlan = Prisma.MealPlanGetPayload<{
  include: {
    calcBasicInfo: true;
    nutrientRatio: true;
    dayExchangeUnit: true;
    mealUnits: true;
  };
}>;

interface MealPlanCardItemProps {
  mealPlans: FullMealPlan[];
}

const MealPlanCardItem = ({ mealPlans }: MealPlanCardItemProps) => {

  return (
    <Fragment>
      {mealPlans.map(
        ({
          id,
          createdAt,
          title,
          calcBasicInfo,
          nutrientRatio,
          dayExchangeUnit,
          mealUnits,
        }) => {
          return (
            <Card key={id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-x-2 items-center">
                    {title || `식단 계획 - ${formatDate(new Date(createdAt))}`}
                    <EditMealPlanTitleButton mealPlanId={id}/>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
          );
        }
      )}
    </Fragment>
  );
};

export default MealPlanCardItem;
