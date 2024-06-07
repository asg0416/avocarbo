"use client";

import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaQuestionCircle } from "react-icons/fa";
import { HoverKcal } from "./hover-card/hover-ratio";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface KcalInfoProps{
  kcal: number
}
const KcalInfo = ({ kcal }: KcalInfoProps) => {
  const user = useCurrentUser();

  return (
    <div className="w-full max-w-md flex flex-row items-center justify-between rounded-lg border p-3 px-6 mt-4 shadow-sm">
      <div className="flex gap-x-2 items-center py-2">
        <p className="text-sm font-medium">{user?.name || "회원"}님의 하루 필요 열량</p>
        <HoverCard>
          <HoverCardTrigger>
            <FaQuestionCircle className="w-4 h-4 cursor-pointer text-orange-600 hover:text-orange-400" />
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <HoverKcal />
          </HoverCardContent>
        </HoverCard>
      </div>

      <Badge className="bg-orange-600 hover:bg-orange-600">{kcal}</Badge>
    </div>
  );
};

export default KcalInfo;
