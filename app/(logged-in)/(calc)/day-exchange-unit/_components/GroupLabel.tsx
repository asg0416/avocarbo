import { FormDescription, FormMessage } from "@/components/ui/form";
import { Fragment } from "react";

interface GroupLabelProps {
  label: string;
  totalUnit: number;
  children: React.ReactNode;
  targetUnit: number | undefined;
}

// TODO: 단위수 안내 메세지 0이고 입력값이 없어서 defaultValue로 0이어서 메세지 안뜨는 경우 어떻게 할지 생각해보기
const GroupLabel = ({
  label,
  totalUnit,
  children,
  targetUnit,
}: GroupLabelProps) => {
  // console.log("Group Label ::", { label, totalUnit, targetUnit });
  const adjustedTargetUnit =
    targetUnit !== undefined && Object.is(targetUnit, -0) ? 0 : targetUnit;

  return (
    <Fragment>
      <p className="text-base font-semibold pt-4">{`${label} (${totalUnit})`}</p>
      {targetUnit !== undefined && (
        <FormDescription
          className="text-red-500 "
          style={{ marginTop: "0.5rem" }}
        >
          <FormMessage />

          {Number(totalUnit) === adjustedTargetUnit
            ? ""
            : `단위수 합이 ${adjustedTargetUnit}가 되어야합니다.`}
        </FormDescription>
      )}
      <div className=" flex flex-col gap-y-4 ">{children}</div>
    </Fragment>
  );
};

export default GroupLabel;
