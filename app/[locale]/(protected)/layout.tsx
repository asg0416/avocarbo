import { Suspense } from "react";
import Navbar from "./_components/navbar";
import Loading from "./loading";

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
}

const ProtectedPageLayout = ({ children }: ProtectedPageLayoutProps) => {
  return (
    <div className="h-auto w-full flex flex-col gap-y-10 justify-start items-center bg-custom-gradient-blue p-5">
      <div className="h-auto w-full max-w-screen-xl py-2 sm:px-10 sm:py-5 flex flex-col gap-y-4 items-center justify-center">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default ProtectedPageLayout;
