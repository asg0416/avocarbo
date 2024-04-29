import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MealPlanCard = () => {
  const data: object[] = [];
  return (
    <div className="p-2">
      {!data.length ? (
        <p>처음이신가요? 끼니별 교환단위수를 계산해보세요!</p>
      ) : (
        <Card className="min-w-24 max-w-64">
          <CardContent></CardContent>
          <Separator className="my-2" />
          <CardFooter></CardFooter>
        </Card>
      )}
    </div>
  );
};

export default MealPlanCard;
