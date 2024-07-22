import { Suspense } from "react";
import Loading from "../../loading";
import dynamic from "next/dynamic";

const ClientCheckUserPageLayout = dynamic(
  () => import("@/components/client-check-page-layout"),
  {
    suspense: true,
  }
);

interface CalcPageLayoutProps {
  children: React.ReactNode;
}

const CalcPageLayout = ({ children }: CalcPageLayoutProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientCheckUserPageLayout>{children}</ClientCheckUserPageLayout>
    </Suspense>
  );
};

export default CalcPageLayout;
