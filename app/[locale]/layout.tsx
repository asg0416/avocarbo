import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/header";
import { cn } from "@/lib/utils";
import Dialog from "@/components/custom-ui-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zero Sugar",
  description: "Zero Sugar",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

const ClientChannelTalkProvider = dynamic(
  () => import("@/components/client-channel-talk"),
  {
    suspense: true,
  }
);

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await auth();
  const messages = await getMessages();

  return (
    <SessionProvider session={session}>
      <html lang={locale}>
        <body
          className={cn(
            "h-auto min-h-full flex flex-col w-auto",
            inter.className
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <ClientChannelTalkProvider>
                <Header />
                <Toaster />
                <Dialog />
                <div className="grow flex">{children}</div>
              </ClientChannelTalkProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
