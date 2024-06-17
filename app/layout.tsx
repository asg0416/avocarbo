import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/header";
import { cn } from "@/lib/utils";
import Dialog from "@/components/custom-ui-dialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth tutorial",
  description: "Auth tutorial",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "h-full flex flex-col",
            inter.className
          )}
        >
          <Header />
          <Toaster />
          <Dialog />
          <div className="grow">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
