"use client";

import { useEffect, useState } from "react";
import { getMealPlansByUserId } from "@/data/meal";
import { currentUser } from "@/lib/auth";
import { useTranslations } from "next-intl";
import MealPlanCardItem, { FullMealPlan } from "@/components/\bcalculator/meal-plan-card-item";
import { PaginationComponent } from "@/components/pagination";

const ITEMS_PER_PAGE = 5;

const MealPlanCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("meal-plan-page");
  const [mealPlans, setMealPlans] = useState<FullMealPlan[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const user = await currentUser();
      if (user?.id) {
        const fetchedMealPlans = await getMealPlansByUserId(user.id);
        if (fetchedMealPlans) {
          setMealPlans(fetchedMealPlans);
          setTotalPages(Math.ceil(fetchedMealPlans.length / ITEMS_PER_PAGE));
        }
      }
    };
    fetchMealPlans();
  }, []);

  const paginatedMealPlans = mealPlans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!mealPlans.length) {
    return (
      <div className="p-2">
        <p>{t("empty-meal")}</p>
      </div>
    );
  }

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
};

export default MealPlanCard;
