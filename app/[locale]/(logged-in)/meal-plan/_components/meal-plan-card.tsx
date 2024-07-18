import MealPlanCardItem from "@/components/\bcalculator/meal-plan-card-item";
import { getMealPlansByUserId } from "@/data/meal";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

// TODO: 작성된 단위수 식단 화면에 보여주기
// TODO: 임시저장되는 버전과 작성 완료된 버전 구분해서 보여주기
// TODO: 작성 완료된 버전만 이 화면에서 보여줘서 그 화면은 상세보기로 넘어가고 임시저장은 작성 마지막 시점으로 보내기
const MealPlanCard = async () => {
  const t = await getTranslations("meal-plan-page")
  const user = await currentUser();

  if (user?.id) {
    const mealPlans = await getMealPlansByUserId(user.id);

    if (!mealPlans?.length) {
      return (
        <div className="p-2">
          <p>{t("empty-meal")}</p>
        </div>
      );
    } else {
      return (
        <div className="p-2">
          <MealPlanCardItem mealPlans={mealPlans} />
        </div>
      );
    }
  }
};

export default MealPlanCard;
