import { FormDescription } from "@/components/ui/form";
import { Fragment } from "react";

interface GroupLabelProps {
  label: string;
  totalUnit: number;
  children: React.ReactNode;
}

const GroupLabel = ({ label, totalUnit, children }: GroupLabelProps) => {
  return (
    <Fragment>
      <p className="text-base font-semibold pt-4">{`${label} (${totalUnit})`}</p>
      <FormDescription
        className="text-red-500 "
        style={{ marginTop: "0.5rem" }}
      >
        {totalUnit > 5 ? "" : "5이상 이어야함"}
      </FormDescription>
      <div className=" flex flex-col gap-y-4 ">{children}</div>
    </Fragment>
  );
};

export default GroupLabel;
