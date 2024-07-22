import { FormDescription, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("day-exchange-unit-page");
  const tl = useTranslations("food-group-label");
  const tLable = tl(label);

  const adjustedTargetUnit =
    targetUnit !== undefined && Object.is(targetUnit, -0) ? 0 : targetUnit;

  return (
    <div>
      <p className="text-base font-semibold">
        {t("groupLabel", { label: tLable, totalUnit })}
      </p>
      {targetUnit !== undefined && (
        <FormDescription
          className="text-red-500 "
          style={{ marginTop: "0.5rem" }}
        >
          <FormMessage />

          {Number(totalUnit) === adjustedTargetUnit
            ? ""
            : t("unitWarning", { adjustedTargetUnit })}
        </FormDescription>
      )}
      <div className="flex flex-col gap-y-4 pt-2">{children}</div>
    </div>
  );
};

export default GroupLabel;
