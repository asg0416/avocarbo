import { FaArrowRight } from "react-icons/fa";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  error?: string;
  success?: string;
  isPending: boolean;
  label: string;
}
const SubmitButton = ({
  error,
  success,
  isPending,
  label,
}: SubmitButtonProps) => {
  return (
    <div className="mt-8 space-y-4 flex flex-col items-end">
      <div className="w-full">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <Button type="submit" disabled={isPending} className="w-full md:w-fit">
        {label}{" "}
        <FaArrowRight className="w-3 h-3 ml-2" />
      </Button>
    </div>
  );
};

export default SubmitButton;
