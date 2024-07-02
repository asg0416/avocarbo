import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { groupMap, mealTimes } from "@/utils/constants";
import { MealUnit } from "@prisma/client";

// TODO: FormField input 으로 변경하고 zod validation 설정해서 error 메세지까지 확인하기
export const renderMealInputs = (groupKey: string, mealUnits: MealUnit[]) => {
  return mealTimes.map((meal) => (
    <TableCell key={meal}>
      <Input
        type="number"
        step="0.5"
        min="0"
        value={
          mealUnits.find(
            (unit) => unit.sort === groupMap.get(groupKey)
          )?.[meal] || ""
        }
        // onChange={(e) => handleUnitChange(groupKey, meal, e.target.value)}
        className="w-full text-center"
      />
    </TableCell>
  ));
};
