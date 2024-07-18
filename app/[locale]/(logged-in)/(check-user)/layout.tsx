import { Suspense } from "react";
import Loading from "../loading";
import dynamic from "next/dynamic";

const ClientCheckUserPageLayout = dynamic(
  () => import("@/components/client-check-page-layout"),
  {
    suspense: true,
  }
);

interface LoggedInPageLayoutProps {
  children: React.ReactNode;
}

const CheckUserPageLayout = async ({ children }: LoggedInPageLayoutProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientCheckUserPageLayout>{children}</ClientCheckUserPageLayout>
    </Suspense>
  );
};

export default CheckUserPageLayout;
