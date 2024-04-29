"use client";
import { Button } from "@/components/ui/button";
import { FaArchive } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ArchiveButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaArchive className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>임시저장</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ArchiveButton;
