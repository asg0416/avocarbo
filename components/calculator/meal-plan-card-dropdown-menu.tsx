"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditMealPlanTitleButton from "./edit-meal-plan-title-button";
import { FiMoreVertical } from "react-icons/fi";

interface DropdownMenuDemoProps {
  mealPlanId: string;
}

export function MealPlanCardDropdownMenu({
  mealPlanId,
}: DropdownMenuDemoProps) {
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={handleDropdownClick}>
          <FiMoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        side="left"
        onClick={handleDropdownClick}
      >
        <EditMealPlanTitleButton mealPlanId={mealPlanId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
