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
  return (
    <Fragment>
      <p className="text-base font-semibold pt-4">{`${label} (${totalUnit})`}</p>
      {targetUnit && (
        <FormDescription
          className="text-red-500 "
          style={{ marginTop: "0.5rem" }}
        >
          <FormMessage />

          {Number(totalUnit) === targetUnit
            ? ""
            : `단위수 합이 ${targetUnit}가 되어야합니다.`}
        </FormDescription>
      )}
      <div className=" flex flex-col gap-y-4 ">{children}</div>
    </Fragment>
  );
};

export default GroupLabel;
