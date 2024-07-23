"use client";

import crypto from "crypto";
import ChannelService, { Appearance } from "@/channel-talk";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export const CT = new ChannelService();

interface Props {
  children: React.ReactNode;
  channelTalkKey: { pluginKey: string; secretKey: string };
}
const ClientChannelTalkProvider = ({ children, channelTalkKey }: Props) => {
  const { theme } = useTheme();
  const user = useCurrentUser();
  const t = useTranslations();

  const PLUGIN_KEY = channelTalkKey.pluginKey;
  const secretKey = channelTalkKey.secretKey;

  const option = {
    pluginKey: PLUGIN_KEY,
    appearance: theme,
  };

  useEffect(() => {
    CT.loadScript();

    const memberId = user?.id || "";
    const hash = crypto
      .createHmac("sha256", Buffer.from(secretKey, "hex"))
      .update(memberId)
      .digest("hex");

    CT.boot({
      ...option,
      memberId: user?.id,
      memberHash: hash,
      profile: {
        name: user?.name || t("channel-talk.anonymousUser"),
        email: user?.email || "",
        avatarUrl: user?.image || "",
      },
    });

    return () => {
      CT.shutdown();
    };
  }, []);

  useEffect(() => {
    CT.setAppearance(theme as Appearance);
  }, [theme]);

  return <>{children}</>;
};

export default ClientChannelTalkProvider;
