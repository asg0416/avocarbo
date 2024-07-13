import { Fragment } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { foodGroupsLabelMap, mealTimes } from "@/utils/constants";
import { DayExchangeUnit } from "@prisma/client";
import renderTableCell from "./meal-detail-table-cell";
import { mealUnit } from "@/utils/interfaces";

interface RenderTableRowsProps {
  mealUnits: mealUnit[];
  stickyClass: string;
  dayExchangeUnitData: DayExchangeUnit;
}

const renderTableRows = ({
  mealUnits,
  stickyClass,
  dayExchangeUnitData,
}: RenderTableRowsProps) => {
  const sortedFields = mealUnits.sort((a, b) => a.sort - b.sort);

  return sortedFields.map((field, index) => {
    const item = foodGroupsLabelMap.get(field.sort);
    return (
      <Fragment key={field.sort}>
        {field.sort > 4 && (field.sort === 5 || field.sort === 8) && (
          <TableRow className="bg-gray-100 hover:bg-gray-100 dark:bg-gray-600 hover:dark:bg-gray-500">
            <TableCell colSpan={7} className="p-0">
              <div
                className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20 bg-gray-100 md:static dark:bg-gray-600`}
              >
                <span>{field.sort === 5 ? "어육류군" : "우유군"}</span>
              </div>
            </TableCell>
          </TableRow>
        )}
        <TableRow className="hover:bg-transparent">
          <TableCell
            className={`flex p-0 ${stickyClass} left-0 z-20 bg-green-50 md:static dark:bg-green-950`}
          >
            <div className="flex p-4 pl-6 w-full items-center justify-start h-full border-r need-border">
              <span>{item?.label}</span>
            </div>
          </TableCell>
          <TableCell
            className={`${stickyClass} p-0 left-[92px] z-20 text-center bg-white md:static dark:bg-green-950`}
          >
            <div className="border-r py-4 need-border">
              <span>
                {dayExchangeUnitData[item?.name as keyof DayExchangeUnit]}
              </span>
            </div>
          </TableCell>
          {mealTimes.map((meal) => {
            const value = field[meal];
            const key = `${field.sort}-${meal}-${value}`;
            return renderTableCell({
              value,
              key,
            });
          })}
        </TableRow>
      </Fragment>
    );
  });
};

export default renderTableRows;
