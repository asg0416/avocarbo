import { Badge } from "../../ui/badge";

const HoverContentActiveLevel = () => {
  const levelInfo = [
    {
      label: "가벼운 활동",
      desc: "육체 활동이 거의 없는 상태, 앉아서 하는 일, 임산부",
      color: "bg-green-600",
    },
    {
      label: "보통 활동",
      desc: "서서하는 일, 1시간 이하로 걷는 활동",
      color: "bg-blue-600",
    },
    {
      label: "심한 활동",
      desc: "1시간 이상 걷는 활동, 매일 운동을 하는 사람",
      color: "bg-orange-600",
    },
  ];
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-base m-auto">활동 수준이란</p>
      {levelInfo.map(({ label, desc, color }) => {
        return (
          <div key={label}>
            <Badge className={color}>{label}</Badge>
            <p className="text-muted-foreground text-sm mt-2">{desc}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HoverContentActiveLevel;
