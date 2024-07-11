import { FormDescription, FormMessage } from "@/components/ui/form";
import { Fragment } from "react";

interface GroupLabelProps {
  label: string;
  totalUnit: number;
  children: React.ReactNode;
  targetUnit: number | undefined;
}

const GroupLabel = ({
  label,
  totalUnit,
  children,
  targetUnit,
}: GroupLabelProps) => {
  const adjustedTargetUnit =
    targetUnit !== undefined && Object.is(targetUnit, -0) ? 0 : targetUnit;

  return (
    <div>
      <p className="text-base font-semibold">{`${label} (${totalUnit})`}</p>
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
      <div className="flex flex-col gap-y-4 pt-2">{children}</div>
    </div>
  );
};

export default GroupLabel;
