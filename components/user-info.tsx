import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = async({ user, label }: UserInfoProps) => {
  const t = await getTranslations("user-info")
  const userInfo = [
    { label: t("id"), data: user?.id },
    { label: t("name"), data: user?.name },
    { label: t("email"), data: user?.email },
    {
      label: t("2fa"),
      data: user?.isTwoFactorEnabled,
    },
  ];
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {userInfo.map(({ label, data }) => {
          const is2FA = label === "Two Factor Authentication";
          return (
            <div
              key={label}
              className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            >
              <p className="text-sm font-medium">{label}</p>
              {is2FA ? (
                <Badge variant={data ? "success" : "destructive"}>
                  {data ? "ON" : "OFF"}
                </Badge>
              ) : (
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                  {data}
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
