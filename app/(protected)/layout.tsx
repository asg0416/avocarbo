import { Suspense } from "react";
import Navbar from "./_components/navbar";
import Loading from "./loading";

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
}

const ProtectedPageLayout = ({ children }: ProtectedPageLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 justify-center items-center bg-custom-gradient-blue">
      <Navbar />
      <Suspense fallback={<Loading/>}>{children}</Suspense>
    </div>
  );
};

export default ProtectedPageLayout;
