import { CheckCircledIcon } from "@radix-ui/react-icons";
import VerifyButton from "./auth/verify-button";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  const needVerify = message === "Verification email sent!";

  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center justify-between ">
      <div className="flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircledIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
      {needVerify && <VerifyButton mode="link" />}
    </div>
  );
};
