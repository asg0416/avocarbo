import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute top-0 h-screen w-screen z-49 bg-custom-gradient-blue">
      <div className="h-full w-full flex items-center justify-center">
        loading...
      </div>
    </div>
  );
}
