import { useTranslations } from "next-intl";

export const HoverCarboRatio = () => {
  const t = useTranslations("calc-hover");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{t("carbo-title")}</h4>
        <p className="text-sm">{t("carbo-desc")}</p>
      </div>
    </div>
  );
};

export const HoverProteinRatio = () => {
  const t = useTranslations("calc-hover");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{t("protein-title")}</h4>
        <p className="text-sm">{t("protein-desc")}</p>
      </div>
    </div>
  );
};

export const HoverFatRatio = () => {
  const t = useTranslations("calc-hover");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{t("fat-title")}</h4>
        <p className="text-sm">{t("fat-desc")}</p>
      </div>
    </div>
  );
};

export const HoverKcal = () => {
  const t = useTranslations("calc-hover");
  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{t("kcal-title")}</h4>
        <p className="text-sm">{t("kcal-desc")}</p>
      </div>
    </div>
  );
};
