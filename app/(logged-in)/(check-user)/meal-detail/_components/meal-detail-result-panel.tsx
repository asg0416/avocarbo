import { getMealPlanResultByMealPlanId } from "@/data/meal";
import { pregnancyPeriodLabel } from "@/lib/calc";
import { formatDate } from "@/lib/utils";
import {
  RiCalendar2Fill,
  RiFireLine,
  RiPieChartFill,
  RiScales3Line,
} from "react-icons/ri";
import { LuBaby } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";

interface MealDetailResultPanelProps {
  verifiedMealPlanId: string;
}
const MealDetailResultPanel = async ({
  verifiedMealPlanId,
}: MealDetailResultPanelProps) => {
  const result = await getMealPlanResultByMealPlanId(verifiedMealPlanId);
  if (!result) return null;
  const { calcBasicInfo, nutrientRatio, setNutrientValue, createdAt } = result;

  if (!calcBasicInfo || !nutrientRatio || !setNutrientValue) return null;

  const { totalKcal } = setNutrientValue;
  const { pregnancy_period, bmi } = calcBasicInfo;
  const { carbo_ratio, protein_ratio, fat_ratio } = nutrientRatio;

  return (
    <div className="border border-primary p-4 rounded-lg shadow-sm mb-4">
      <div className="flex flex-wrap justify-start lg:justify-between items-center gap-x-6 gap-y-4 text-sm text-gray-700">
        <div className="flex items-center">
          <LuBaby className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">임신 주차</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{pregnancyPeriodLabel[pregnancy_period]}</span>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiScales3Line className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">BMI </span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{bmi}</span>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiFireLine className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">열량</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{totalKcal}kcal/일</span>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiPieChartFill className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">영양 비율</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <div className="flex items-center justify-center gap-x-2">
              <span>(탄: {carbo_ratio}%</span>
              <span>단: {protein_ratio}%</span>
              <span>지: {fat_ratio}%)</span>
            </div>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiCalendar2Fill className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">작성일</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{formatDate(new Date(createdAt))}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MealDetailResultPanel;
