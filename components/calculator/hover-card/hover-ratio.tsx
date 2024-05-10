export const HoverCarboRatio = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">권장 탄수화물 비율</h4>
        <p className="text-sm">
          19~50세 임산부의 탄수화물 권장 섭취량은 1일 175g 이상입니다. 이에 따른
          적정 탄수화물 비율은 45 ~ 65% 이며, 국내 대한당뇨병학회에서는 50% 내외를 권장합니다.
        </p>
      </div>
    </div>
  );
};

export const HoverProteinRatio = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">권장 단백질 비율</h4>
        <p className="text-sm">
          한국 영양권장 섭취량 기준으로, 임신 전 1일 50~55g 단백질 권장량에서 임신 중반에는 하루 15g, 후반기에는 하루 30g의 추가 섭취를 권장합니다.
          이에 따른 적정 단백질 섭취비율은 10 ~ 35% 입니다.
        </p>
      </div>
    </div>
  );
};

export const HoverFatRatio = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">권장 지방 비율</h4>
        <p className="text-sm">
          적정 지방 섭취비율은 20 ~ 35% 입니다.
        </p>
      </div>
    </div>
  );
};

export const HoverKcal = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">임산부의 하루 필요열량</h4>
        <p className="text-sm">
          임신 중에는 케톤증 예방을 위해 1일 1,700~1,800 kcal 이하로 섭취하지
          않도록 해야합니다.
        </p>
      </div>
    </div>
  );
};
