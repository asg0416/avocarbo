import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import BackButton from "../back-button";

interface SubmitButtonProps {
  error?: string;
  success?: string;
  isPending: boolean;
  label: string;
  href?: string;
  className?: string;
}
const SubmitButton = ({
  error,
  success,
  isPending,
  label,
  href,
  className,
}: SubmitButtonProps) => {
  const responsiveCss = className ?? "md:w-fit";
  const noBackCss = href ? "justify-between" : "justify-end";
  return (
    <div className="mt-8 space-y-4 flex flex-col">
      <div className="w-full">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <div className={`w-full flex items-center ${noBackCss}`}>
        {href && (
          <BackButton
            isPending={isPending}
            href={href}
            responsiveCss={responsiveCss}
          />
        )}
        <Button
          type="submit"
          disabled={isPending}
          className={`w-full ${responsiveCss}`}
        >
          {label} <FaArrowRight className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SubmitButton;
