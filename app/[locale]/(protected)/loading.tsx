import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="items-center">
        <Skeleton className="h-10 w-[180px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1,2,3].map((idx) => {
          return (
            <div
              key={idx}
              className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
            >
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[250px] p-1" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
