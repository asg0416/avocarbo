// renderTableRows.tsx
import React, { Fragment } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { FieldArrayWithId } from "react-hook-form";
import { foodGroupsLabelMap, mealTimes } from "@/utils/constants";
import { DayExchangeUnit } from "@prisma/client";
import { calculateUnitTotalForMealUnit } from "@/lib/calc";
import renderTableCell from "./meal-unit-table-cell";
import { MealUnitField, mealUnit } from "@/utils/interfaces";
import { useTranslations } from "next-intl";

interface RenderTableRowsProps {
  fields: FieldArrayWithId<{ mealUnits: mealUnit[] }, "mealUnits", "id">[];
  watchData: any[];
  errors: any;
  control: any;
  isPending: boolean;
  stickyClass: string;
  dayExchangeUnitData: DayExchangeUnit;
}

const renderTableRows = ({
  fields,
  watchData,
  errors,
  control,
  isPending,
  stickyClass,
  dayExchangeUnitData,
}: RenderTableRowsProps) => {
  const t = useTranslations("food-group-label");
  const tm = useTranslations("meal-unit-page");
  const sortedFields = fields.sort((a, b) => a.sort - b.sort);

  return sortedFields.map((field, index) => {
    const item = foodGroupsLabelMap.get(field.sort);
    const target = watchData[0][index];
    const totalUnit = calculateUnitTotalForMealUnit(target);
    const dayTotal = Number(
      dayExchangeUnitData[item?.name as keyof DayExchangeUnit]
    );
    const errorMessage = `${item?.upperGroup ? t(item.upperGroup) : ""} ${
      item?.label && t(item.label)
    } - ${tm("total-error-msg", { dayTotal, totalUnit })}`;
    const isError = dayTotal !== totalUnit;

    return (
      <Fragment key={field.id}>
        {field.sort > 4 && (field.sort === 5 || field.sort === 8) && (
          <TableRow className="bg-gray-100 hover:bg-gray-100 dark:bg-gray-600 hover:dark:bg-gray-500">
            <TableCell colSpan={7} className="p-0">
              <div
                className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20 bg-gray-100 md:static dark:bg-gray-600`}
              >
                {field.sort === 5 ? t("어육류군") : t("우유군")}
              </div>
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell
            className={`flex p-0 ${stickyClass} left-0 z-20 bg-green-50 md:static dark:bg-green-950`}
          >
            <div className="flex p-4 pl-6 w-full items-center justify-start h-full border-r">
              {t(item?.label)}
            </div>
          </TableCell>
          <TableCell
            className={`${stickyClass} p-0 left-[92px] z-20 text-center bg-white md:static dark:bg-green-950`}
          >
            <div className="border-r py-4">
              {dayExchangeUnitData[item?.name as keyof DayExchangeUnit]}
            </div>
          </TableCell>
          {mealTimes.map((meal) =>
            renderTableCell({
              field,
              index,
              key: meal as MealUnitField,
              control,
              isPending,
            })
          )}
        </TableRow>
        {Object.keys(errors.mealUnits?.[index] || {}).length > 0 && isError && (
          <TableRow className="bg-red-50 hover:bg-red-50">
            <TableCell colSpan={7} className="p-0">
              <div
                className={`p-2 pr-0 w-max ${stickyClass} left-0 z-20 text-red-600`}
              >
                {errorMessage}
              </div>
            </TableCell>
          </TableRow>
        )}
      </Fragment>
    );
  });
};

export default renderTableRows;
