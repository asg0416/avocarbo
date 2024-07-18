import { getMealPlanResultByMealPlanId } from "@/data/meal";
import { formatDate } from "@/lib/utils";
import {
  RiCalendar2Fill,
  RiFireLine,
  RiPieChartFill,
  RiScales3Line,
} from "react-icons/ri";
import { LuBaby } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import UrlVerifyAlert from "../../(calc)/_components/url-verify-alert";
import { getTranslations } from "next-intl/server";

interface MealDetailResultPanelProps {
  verifiedMealPlanId: string;
}
const MealDetailResultPanel = async ({
  verifiedMealPlanId,
}: MealDetailResultPanelProps) => {
  const t = await getTranslations("meal-detail-result-panel");
  const tpg = await getTranslations("pg-period-label")

  const result = await getMealPlanResultByMealPlanId(verifiedMealPlanId);
  if (!result) return <UrlVerifyAlert />;

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
          <span className="mr-2">{t("pg-week")}</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{tpg(pregnancy_period)}</span>
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
          <span className="mr-2">{t("kcal")}</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>
              {totalKcal}
              {t("kcal-unit")}
            </span>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiPieChartFill className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">{t("ratio")}</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <div className="flex items-center justify-center gap-x-2">
              <span>{t("carbo", { carbo_ratio })}</span>
              <span>{t("protein", { protein_ratio })}</span>
              <span>{t("fat", { fat_ratio })}</span>
            </div>
          </Badge>
        </div>

        <div className="flex items-center">
          <RiCalendar2Fill className="w-4 h-4 mr-1 text-primary" />
          <span className="mr-2">{t("created-at")}</span>
          <Badge variant="outline" className="bg-slate-200 text-slate-800">
            <span>{formatDate(new Date(createdAt))}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MealDetailResultPanel;
