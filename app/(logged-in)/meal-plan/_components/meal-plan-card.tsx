import MealPlanCardItem from "@/components/\bcalculator/meal-plan-card-item";
import { getMealPlansByUserId } from "@/data/meal";
import { currentUser } from "@/lib/auth";

// TODO: 작성된 단위수 식단 화면에 보여주기
const MealPlanCard = async () => {
  const data: object[] = [];
  const user = await currentUser();
  if (user?.id) {
    const mealPlans = await getMealPlansByUserId(user.id);

    if (!mealPlans?.length) {
      return (
        <div className="p-2">
          <p>처음이신가요? 끼니별 교환단위수를 계산해보세요!</p>
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
