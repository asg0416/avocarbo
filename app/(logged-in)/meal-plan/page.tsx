import { Button } from "@/components/ui/button";
import MealPlanCard from "./_components/meal-plan-card";
import Link from "next/link";
import { Title } from "@/components/\bcalculator/title";
import { Fragment } from "react";

const MealPlanPage = () => {
  return (
    <Fragment>
      <div className="w-full flex items-center justify-between">
        <Title title="끼니별 식품 교환단위수" />
        <Button asChild>
          <Link href="/basic-info">계산하기</Link>
        </Button>
      </div>

      <div className="grow border shadow-md rounded-md">
        <MealPlanCard />
      </div>
    </Fragment>
  );
}
 
export default MealPlanPage;