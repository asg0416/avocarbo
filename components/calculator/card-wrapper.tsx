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
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  headerLabel?: string;
  headerHeader?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  id?: string;
}

export const CardWrapper = ({
  children,
  className,
  id,
  headerLabel,
  headerHeader,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div
      className={cn("grow pt-5", className ? className : "w-full max-w-md ")}
      id={id || ""}
    >
      <Card className="border shadow-md rounded-md pt-6 flex items-center justify-center flex-col w-full need-remove-border">
        <CardContent className="w-full">{children}</CardContent>
      </Card>
    </div>
  );
};
