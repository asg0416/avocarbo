import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import VerifyButton from "@/components/auth/verify-button";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  const needVerify = message === "Need to verify your email.";

  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-between ">
      <div className="flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
      {needVerify && <VerifyButton />}
    </div>
  );
};
