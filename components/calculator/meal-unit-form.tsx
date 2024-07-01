// MealUnitForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "../ui/switch";
import { MealPlan, MealTime } from "@/utils/interfaces";
import { foodGroups, groupMap, mealTimes } from "@/utils/constants";
import { calculateUnitTotal } from "@/lib/calc";
import FoodGroup from "@/app/(logged-in)/(calc)/meal-unit/_components/food-group";
import { useRouter } from "next/navigation";

const MealUnitForm: React.FC = () => {
  const router = useRouter();

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSticky, setIsSticky] = useState(true);

  const stickyClass = isSticky ? "sticky" : "";

  useEffect(() => {
    const fetchMealPlan = async () => {
      const mockMealPlan: MealPlan = {
        id: "1",
        title: "임신성 당뇨 식단",
        dayExchangeUnit: {
          milk_whole: 2,
          milk_low_fat: 0,
          vegetables: 7,
          fruits: 2,
          grains: 7,
          protein_low_fat: 2,
          protein_medium_fat: 2,
          protein_high_fat: 2,
          fats: 5,
        },
        mealUnits: Array.from(groupMap.entries()).map(([key, sort]) => ({
          id: sort.toString(),
          sort,
          morning: 0,
          morningSnack: 0,
          lunch: 0,
          afternoonSnack: 0,
          dinner: 0,
        })),
      };
      setMealPlan(mockMealPlan);
    };

    fetchMealPlan();
  }, []);

  if (!mealPlan) return <div>Loading...</div>;

  const handleSave = () => {
    console.log("Saving meal plan:", mealPlan);
  };

  const handleUnitChange = (
    groupKey: string,
    meal: MealTime,
    value: string
  ) => {
    const numValue = Math.max(0, Math.round(parseFloat(value) * 2) / 2);
    setMealPlan((prevPlan) => {
      if (!prevPlan) return null;
      const updatedMealUnits = prevPlan.mealUnits.map((unit) =>
        unit.sort === groupMap.get(groupKey)
          ? { ...unit, [meal]: numValue }
          : unit
      );

      const dayTotal = prevPlan.dayExchangeUnit[groupKey] || 0;
      const unitTotal = calculateUnitTotal(updatedMealUnits, groupKey);

      setErrors((prev) => {
        const newErrors = { ...prev };
        if (dayTotal !== unitTotal) {
          newErrors[
            groupKey
          ] = `합계가 1일 총량(${dayTotal})과 일치하지 않습니다.`;
        } else {
          delete newErrors[groupKey];
        }
        return newErrors;
      });

      return { ...prevPlan, mealUnits: updatedMealUnits };
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-start space-x-2 mealUnit:hidden">
        <span>제목열 고정</span>
        <Switch checked={isSticky} onCheckedChange={setIsSticky} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className={`text-center p-0 ${stickyClass} left-0 z-20`}>
              <div className="flex items-center justify-center py-4 border-r bg-gray-50">
                식품군
              </div>
            </TableCell>
            <TableCell
              className={`text-center p-0 ${stickyClass} left-[92px] z-20`}
            >
              <div className="flex items-center justify-center py-4 border-r bg-gray-50">
                1일 교환단위
              </div>
            </TableCell>
            {mealTimes.map((meal) => (
              <TableCell key={meal} className="text-center p-0">
                <div className="flex items-center justify-center py-4 bg-gray-50">
                  {meal}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodGroups.map((group) => (
            <FoodGroup
              key={group.key}
              mealPlan={mealPlan}
              group={group}
              errors={errors}
              handleUnitChange={handleUnitChange}
              stickyClass={stickyClass}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button onClick={handleSave}>저장</Button>
      </div>
    </>
  );
};

export default MealUnitForm;
