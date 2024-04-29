import { useAlertState } from "@/hooks/useAlertState";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { sendEmail } from "@/actions/send-email";
import { EmailSchema } from "@/schemas/auth-index";

interface VerifyButtonProps {
  mode?: "button" | "link";
  settingsEmail?: string;
  isAuthenticate?: boolean;
  isSetting?: boolean;
}

const VerifyButton = ({
  mode = "button",
  settingsEmail,
  isAuthenticate: isAuthenticate,
  isSetting = false,
}: VerifyButtonProps) => {
  const { email, setSuccess, setError, setEmail } = useAlertState();
  const [isVerified, setVerified] = useState(isAuthenticate);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setVerified(isAuthenticate);
  }, [isAuthenticate]);

  const onClick = async () => {
    const _email = settingsEmail || email;
    const validatedEmail = EmailSchema.safeParse(_email);

    startTransition(() => {
      if (!_email) {
        return setError("Something went wrong");
      }
      sendEmail(_email, isSetting).then((data) => {
        if (data?.isVerified) {
          setVerified(data.isVerified);
        }
        if (data?.success) {
          setEmail(_email);
          return setSuccess(data.success);
        }
        if (data?.error) {
          return setError(data?.error);
        }
      });
    });
  };

  if (isVerified) {
    return (
      <Button type="button" size="sm" disabled>
        Verified email
      </Button>
    );
  }
  return (
    <Button
      onClick={onClick}
      type="button"
      size="sm"
      variant={mode === "button" ? "destructive" : "link"}
      disabled={isPending}
    >
      {isPending ? "Sending..." : mode === "button" ? "Email Send" : "Resend"}
    </Button>
  );
};

export default VerifyButton;
