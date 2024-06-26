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

export function MealPlanCardDropdownMenu({ mealPlanId }: DropdownMenuDemoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FiMoreVertical className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="left">
          <EditMealPlanTitleButton mealPlanId={mealPlanId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
