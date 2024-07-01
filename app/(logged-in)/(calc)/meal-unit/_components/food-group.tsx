// FoodGroup.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MealPlan, MealTime } from "@/utils/interfaces";
import { foodGroups } from "@/utils/constants";
import MealInputs from "./meal-inputs";

interface FoodGroupProps {
  mealPlan: MealPlan;
  group: (typeof foodGroups)[number];
  errors: { [key: string]: string };
  handleUnitChange: (groupKey: string, meal: MealTime, value: string) => void;
  stickyClass: string;
}

const FoodGroup: React.FC<FoodGroupProps> = ({
  mealPlan,
  group,
  errors,
  handleUnitChange,
  stickyClass,
}) => {
  if (group.subgroups) {
    return (
      <>
        <TableRow className="bg-gray-100 hover:bg-gray-100">
          <TableCell colSpan={7} className="p-0">
            <div
              className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20 bg-gray-100`}
            >
              {group.name}
            </div>
          </TableCell>
        </TableRow>
        {group.subgroups.map((subgroup) => (
          <React.Fragment key={subgroup.key}>
            <TableRow>
              <TableCell
                className={`flex p-0 ${stickyClass} left-0 z-20 bg-green-50`}
              >
                <div className="flex p-4 px-0 w-full items-center justify-center h-full border-r">
                  {subgroup.name}
                </div>
              </TableCell>
              <TableCell
                className={`${stickyClass} p-0 left-[92px] z-20 text-center bg-white`}
              >
                <div className="border-r py-4">
                  {mealPlan.dayExchangeUnit[subgroup.key]}
                </div>
              </TableCell>
              <MealInputs
                mealPlan={mealPlan}
                groupKey={subgroup.key}
                handleUnitChange={handleUnitChange}
              />
            </TableRow>
            {errors[subgroup.key] && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Alert variant="destructive" className="border-none">
                    <AlertDescription>{errors[subgroup.key]}</AlertDescription>
                  </Alert>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return (
      <>
        <TableRow className="border-b border-gray-200">
          <TableCell className={`font-bold p-0 ${stickyClass} left-0 z-20`}>
            <div className="flex items-center pl-2 py-4 border-r bg-green-50">
              {group.name}
            </div>
          </TableCell>
          <TableCell
            className={`text-center p-0 ${stickyClass} left-[92px] z-20`}
          >
            <div className="flex items-center justify-center py-4 border-r bg-white">
              {mealPlan.dayExchangeUnit[group.key]}
            </div>
          </TableCell>
          <MealInputs
            mealPlan={mealPlan}
            groupKey={group.key}
            handleUnitChange={handleUnitChange}
          />
        </TableRow>
        {errors[group.key] && (
          <TableRow>
            <TableCell colSpan={7} className="p-0">
              <div
                className={`p-2 pr-0 font-bold w-max ${stickyClass} left-0 z-20`}
              >
                <Alert variant="destructive" className="border-none">
                  <AlertDescription>{errors[group.key]}</AlertDescription>
                </Alert>
              </div>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }
};

export default FoodGroup;
