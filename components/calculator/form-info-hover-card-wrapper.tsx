import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaQuestionCircle } from "react-icons/fa";
import { FormLabel } from "@/components/ui/form";

interface FormInfoHoverCardWrapperProps {
  children: React.ReactNode;
  label: string;
}

const FormInfoHoverCardWrapper = ({
  children,
  label,
}: FormInfoHoverCardWrapperProps) => {
  return (
    <div className="flex gap-x-2 items-center py-2">
      <FormLabel>{label}</FormLabel>
      <HoverCard>
        <HoverCardTrigger>
          <FaQuestionCircle className="w-4 h-4 cursor-pointer text-orange-600 hover:text-orange-400" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">{children}</HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default FormInfoHoverCardWrapper;
