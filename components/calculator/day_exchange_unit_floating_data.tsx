"use client"

import { useExchangeUnitFormValuesStore } from "@/hooks/useExchangeUnitFormValuesStore";
import { Card, CardContent } from "../ui/card";

// TODO: 하루 필요 열량, 영양 비율 대비 현재 설정한 값 데이터 보여주는 내용 작성, 플로팅되면 좋지않을까?
const DayExchangeUnitFloatingData = () => {
  const {setValues, ...values} = useExchangeUnitFormValuesStore();
  

  return (
    <Card className="border shadow-sm rounded-md pt-6 max-w-md flex items-center justify-center flex-col w-full">
      <CardContent className="w-full max-w-md">
        {Object.entries(values).map(([key, value])=>{
          return <p key={key}>{key}: {value}</p>
        })}
      </CardContent>
    </Card>
  );
};

export default DayExchangeUnitFloatingData;
