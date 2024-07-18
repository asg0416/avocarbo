"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Switch } from "../ui/switch";
import { groupMap } from "@/utils/constants";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import renderTableRows from "@/app/[locale]/(logged-in)/(check-user)/meal-detail/_components/meal-detail-table-rows";
import renderTableHeader from "@/app/[locale]/(logged-in)/(check-user)/meal-detail/_components/meal-unit-table-header";
import { useTranslations } from "next-intl";

interface MealDetailContentsProps {
  dayExchangeUnitData: DayExchangeUnit;
  mealUnitsData: MealUnit[];
}

const MealDetailContents = ({
  dayExchangeUnitData,
  mealUnitsData,
}: MealDetailContentsProps) => {
  const t = useTranslations("meal-detail-page")
  const [isSticky, setIsSticky] = useState(true);

  const stickyClass = isSticky ? "sticky" : "";

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
        <span>{t("switcher-label")}</span>
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
