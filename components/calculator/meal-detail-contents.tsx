"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Switch } from "../ui/switch";
import { groupMap } from "@/utils/constants";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import renderTableRows from "@/app/(logged-in)/(check-user)/meal-detail/_components/meal-detail-table-rows";
import renderTableHeader from "@/app/(logged-in)/(check-user)/meal-detail/_components/meal-unit-table-header";

interface MealDetailContentsProps {
  verifiedMealPlanId: string;
  dayExchangeUnitData: DayExchangeUnit | null;
  mealUnitsData: MealUnit[] | null;
}

const MealDetailContents = ({
  verifiedMealPlanId,
  dayExchangeUnitData,
  mealUnitsData,
}: MealDetailContentsProps) => {
  const [isSticky, setIsSticky] = useState(true);

  const stickyClass = isSticky ? "sticky" : "";


  if (!dayExchangeUnitData) return null;
  if(!mealUnitsData) return null

  const mealUnits = Array.from(groupMap.entries()).map(([key, sort]) => {
    const targetMealUnit = mealUnitsData.find((unit) => unit.sort === sort);
    return {
      sort,
      morning: targetMealUnit?.morning || 0,
      morningSnack: targetMealUnit?.morningSnack || 0,
      lunch: targetMealUnit?.lunch || 0,
      afternoonSnack: targetMealUnit?.afternoonSnack || 0,
      dinner: targetMealUnit?.dinner || 0,
    };
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-start space-x-2 mealUnit:hidden need-hide">
        <span>제목열 고정</span>
        <Switch checked={isSticky} onCheckedChange={setIsSticky} />
      </div>
      <div className="overflow-auto">
        <Table className="w-full min-w-[640px] border">
          <TableHeader>{renderTableHeader(stickyClass)}</TableHeader>
          <TableBody>
            {renderTableRows({
              mealUnits,
              stickyClass,
              dayExchangeUnitData,
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MealDetailContents;
