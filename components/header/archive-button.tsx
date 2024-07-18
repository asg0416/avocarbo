"use client";
import { Button } from "@/components/ui/button";
import { FaArchive } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { getTranslations } from "next-intl/server";

const ArchiveButton = async () => {
  const t = await getTranslations("header");
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaArchive className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("archive-tooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ArchiveButton;
