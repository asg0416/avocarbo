// MealInputs.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { MealPlan, MealTime } from "@/utils/interfaces";
import { groupMap, mealTimes } from "@/utils/constants";

interface MealInputsProps {
  mealPlan: MealPlan;
  groupKey: string;
  handleUnitChange: (groupKey: string, meal: MealTime, value: string) => void;
}

const MealInputs: React.FC<MealInputsProps> = ({
  mealPlan,
  groupKey,
  handleUnitChange,
}) => {
  return (
    <>
      {mealTimes.map((meal) => (
        <td key={meal}>
          <Input
            type="number"
            step="0.5"
            min="0"
            value={
              mealPlan.mealUnits.find(
                (unit) => unit.sort === groupMap.get(groupKey)
              )?.[meal] || ""
            }
            onChange={(e) => handleUnitChange(groupKey, meal, e.target.value)}
            className="w-full text-center"
          />
        </td>
      ))}
    </>
  );
};

export default MealInputs;
