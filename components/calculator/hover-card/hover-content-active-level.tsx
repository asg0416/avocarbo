import { getTranslations } from "next-intl/server";
import { Badge } from "../../ui/badge";

const HoverContentActiveLevel = async () => {
  const t = await getTranslations("calc-hover");

  const levelInfo = [
    {
      label: t("light-label"),
      desc: t("light-desc"),
      color: "bg-green-600",
    },
    {
      label:t("common-label"),
      desc: t("common-desc"),
      color: "bg-blue-600",
    },
    {
      label:t("hard-label"),
      desc: t("hard-desc"),
      color: "bg-orange-600",
    },
  ];
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-base m-auto">{t("info-label")}</p>
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
