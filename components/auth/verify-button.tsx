import { useAlertState } from "@/hooks/useAlertState";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { sendEmail } from "@/actions/send-email";
import { EmailSchema } from "@/schemas/auth-index";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("error")
  const tv = useTranslations("verify-btn")

  const { email, setSuccess, setError, setEmail } = useAlertState();
  const [isVerified, setVerified] = useState(isAuthenticate);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setVerified(isAuthenticate);
  }, [isAuthenticate]);

  const onClick = async () => {
    const _email = settingsEmail || email;

    startTransition(() => {
      if (!_email) {
        return setError(t("something-wrong-error"));
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
        {tv("verified-btn")}
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
      {isPending ? tv("sending") : mode === "button" ? tv("send") : tv("resend")}
    </Button>
  );
};

export default VerifyButton;
