"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import MealPlanCardItem, {
  FullMealPlan,
} from "@/components/\bcalculator/meal-plan-card-item";
import { PaginationComponent } from "@/components/pagination";

const ITEMS_PER_PAGE = 5;

const MealPlanCard = ({
  mealPlans,
}: {
  mealPlans: FullMealPlan[] | undefined | null;
}) => {
  const t = useTranslations("meal-plan-page");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (mealPlans) {
      setTotalPages(Math.ceil(mealPlans.length / ITEMS_PER_PAGE));
    }
  }, [mealPlans]);

  const paginatedMealPlans = mealPlans?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!paginatedMealPlans || !paginatedMealPlans.length) {
    return (
      <div className="p-2">
        <p>{t("empty-meal")}</p>
      </div>
    );
  }
  if (paginatedMealPlans.length > 0) {
    return (
      <div className="flex flex-col gap-y-4 p-4">
        <MealPlanCardItem mealPlans={paginatedMealPlans} />
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
  }
};

export default MealPlanCard;
