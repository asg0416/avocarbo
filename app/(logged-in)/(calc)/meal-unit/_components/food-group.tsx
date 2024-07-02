import { TableCell, TableRow } from "@/components/ui/table";
import { foodGroups } from "@/utils/constants";
import { DayExchangeUnit, MealUnit } from "@prisma/client";
import { Fragment } from "react";
import { renderMealInputs } from "./meal-inputs";

export const renderFoodGroup = (group: (typeof foodGroups)[number], stickyClass: string, dayExchangeUnit: DayExchangeUnit, mealUnits: MealUnit[]) => {
  if (group.subgroups) {
    return (
      <>
        <TableRow className="bg-gray-100 hover:bg-gray-100">
          <TableCell colSpan={7} className="p-0">
            <div
              className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20 bg-gray-100 md:static`}
            >
              {group.name}
            </div>
          </TableCell>
        </TableRow>
        {group.subgroups.map((subgroup) => (
          <Fragment key={subgroup.key}>
            <TableRow>
              <TableCell
                className={`flex p-0 ${stickyClass} left-0 z-20 bg-green-50 md:static`}
              >
                <div className="flex p-4 px-0 w-full items-center justify-center h-full border-r">
                  {subgroup.name}
                </div>
              </TableCell>
              <TableCell
                className={`${stickyClass} p-0 left-[92px] z-20 text-center bg-white md:static`}
              >
                <div className="border-r py-4">
                  {dayExchangeUnit[subgroup.key as keyof DayExchangeUnit]}
                </div>
              </TableCell>
              {renderMealInputs(subgroup.key, mealUnits)}
            </TableRow>
            {/* {errors[subgroup.key] && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Alert variant="destructive" className="border-none">
                    <AlertDescription>{errors[subgroup.key]}</AlertDescription>
                  </Alert>
                </TableCell>
              </TableRow>
            )} */}
          </Fragment>
        ))}
      </>
    );
  } else {
    return (
      <>
        <TableRow className="border-b border-gray-200">
          <TableCell
            className={`font-bold p-0 ${stickyClass} left-0 z-20 md:static`}
          >
            <div className="flex items-center pl-2 py-4 border-r bg-green-50">
              {group.name}
            </div>
          </TableCell>
          <TableCell
            className={`text-center p-0 ${stickyClass} left-[92px] z-20 md:static`}
          >
            <div className="flex items-center justify-center py-4 border-r bg-white">
              {dayExchangeUnit[group.key as keyof DayExchangeUnit]}
            </div>
          </TableCell>
          {renderMealInputs(group.key, mealUnits)}
        </TableRow>
        {/* {errors[group.key] && (
          <TableRow>
            <TableCell colSpan={7}>
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors[group.key]}</AlertDescription>
              </Alert>
            </TableCell>
          </TableRow>
        )} */}
      </>
    );
  }
};
