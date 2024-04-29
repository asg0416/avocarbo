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
    <Card className="grow border shadow-md rounded-md py-5">
      <CardContent>{children}</CardContent>
    </Card>
  );
};
