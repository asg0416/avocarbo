"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  headerHeader?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerHeader,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="grow pt-5 max-w-md  w-full">
      <Card className=" border shadow-md rounded-md pt-6 max-w-md flex items-center justify-center flex-col w-full">
        <CardContent className="w-full max-w-md">{children}</CardContent>
      </Card>
    </div>
  );
};
