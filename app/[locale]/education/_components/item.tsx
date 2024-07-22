import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const KeyValuePair: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="mb-2">
    <span className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 font-semibold">
      {label}
    </span>
    <span>: </span>
    <span>{value}</span>
  </div>
);

const Items = () => {
  const t = useTranslations("PregnancyDiabetesEducation");
  const searchParams = useSearchParams();
  const [openSections, setOpenSections] = useState<string[]>([
    "section1"
  ]);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = 80; // 헤더의 실제 높이로 조정하세요
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px 추가 여백

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 text-base">
      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full space-y-6"
      >
        <AccordionItem value="section1" id="section1">
          <AccordionTrigger className="text-xl font-semibold">
            1. {t("section1.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
              {t("section1.content")}
            </p>
            <KeyValuePair
              label={t("section1.causeLabel")}
              value={t("section1.cause")}
            />
            <KeyValuePair
              label={t("section1.effectLabel")}
              value={t("section1.effect")}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section2" id="section2">
          <AccordionTrigger className="text-xl font-semibold">
            2. {t("section2.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
              {t("section2.content")}
            </p>
            <h3 className="font-semibold mt-4 mb-2 text-lg">
              {t("section2.foodGroups")}
            </h3>
            <ul className="list-none pl-0 space-y-2">
              {[
                "grains",
                "protein",
                "vegetables",
                "fruits",
                "dairy",
                "fats",
              ].map((group) => (
                <li key={group}>
                  <KeyValuePair
                    label={t(`section2.groups.${group}.name`)}
                    value={t(`section2.groups.${group}.description`)}
                  />
                </li>
              ))}
            </ul>
            <p className="mt-4">{t("section2.example")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section3" id="section3">
          <AccordionTrigger className="text-xl font-semibold">
            3. {t("section3.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
              {t("section3.content")}
            </p>
            <h3 className="font-semibold mt-4 mb-2 text-lg">
              {t("section3.examples")}
            </h3>
            <ul className="list-none pl-0 space-y-2">
              {["grains", "fruits", "milk", "vegetables", "meat"].map(
                (item) => (
                  <li key={item}>
                    <KeyValuePair
                      label={t(`section3.items.${item}.name`)}
                      value={t(`section3.items.${item}.amount`)}
                    />
                  </li>
                )
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section4" id="section4">
          <AccordionTrigger className="text-xl font-semibold">
            4. {t("section4.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
              {t("section4.content")}
            </p>
            <h3 className="font-semibold mt-4 mb-2 text-lg">
              {t("section4.basicCalculation")}
            </h3>
            <ul className="list-none pl-0 space-y-2">
              {["grains", "fruits", "milk", "vegetables", "proteinFats"].map(
                (group) => (
                  <li key={group}>
                    <KeyValuePair
                      label={t(`section4.groups.${group}.name`)}
                      value={t(`section4.groups.${group}.amount`)}
                    />
                  </li>
                )
              )}
            </ul>
            <Card className="mt-6 p-0">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("section4.example.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("section4.example.content")}</p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section5" id="section5">
          <AccordionTrigger className="text-xl font-semibold">
            5. {t("section5.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            {[
              "regularMeals",
              "properCalories",
              "balancedNutrition",
              "fiberIntake",
            ].map((item, index) => (
              <div key={item} className="mb-6">
                <h3 className="font-semibold text-lg mb-2">
                  {`5-${index+1} `}{t(`section5.${item}.title`)}
                </h3>
                <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
                  {t(`section5.${item}.content`)}
                </p>
                {item === "properCalories" && (
                  <ul className="list-none pl-0 space-y-2 mt-2">
                    {["underweight", "normalWeight", "overweight", "obese"].map(
                      (weight) => (
                        <li key={weight}>
                          <KeyValuePair
                            label={t(
                              `section5.properCalories.weightGain.${weight}.label`
                            )}
                            value={t(
                              `section5.properCalories.weightGain.${weight}.value`
                            )}
                          />
                        </li>
                      )
                    )}
                  </ul>
                )}
                {item === "balancedNutrition" && (
                  <ul className="list-none pl-0 space-y-2 mt-2">
                    {["carbs", "protein", "fat"].map((nutrient) => (
                      <li key={nutrient}>
                        <KeyValuePair
                          label={t(
                            `section5.balancedNutrition.nutrients.${nutrient}.name`
                          )}
                          value={t(
                            `section5.balancedNutrition.nutrients.${nutrient}.amount`
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section6" id="section6">
          <AccordionTrigger className="text-xl font-semibold">
            6. {t("section6.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <ul className="list-none pl-0 space-y-4">
              {[
                "mealDiary",
                "slowEating",
                "waterIntake",
                "avoidProcessedFood",
                "exercise",
              ].map((tip) => (
                <li key={tip}>
                  <KeyValuePair
                    label={t(`section6.tips.${tip}.title`)}
                    value={t(`section6.tips.${tip}.description`)}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section7" id="section7">
          <AccordionTrigger className="text-xl font-semibold">
            7. {t("section7.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <ul className="list-none pl-0 space-y-4">
              {["simpleSugars", "highFat", "caffeine"].map((food) => (
                <li key={food}>
                  <KeyValuePair
                    label={t(`section7.foods.${food}.name`)}
                    value={t(`section7.foods.${food}.description`)}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section8" id="section8">
          <AccordionTrigger className="text-xl font-semibold">
            8. {t("section8.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <p className="mb-4 bg-blue-100 rounded-md p-1 pl-2 text-slate-700">
              {t("section8.content")}
            </p>
            <ul className="list-none pl-0 space-y-2">
              {["fasting", "after1hour", "after2hours"].map((time) => (
                <li key={time}>
                  <KeyValuePair
                    label={t(`section8.levels.${time}.name`)}
                    value={t(`section8.levels.${time}.value`)}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section9" id="section9">
          <AccordionTrigger className="text-xl font-semibold">
            9. {t("section9.title")}
          </AccordionTrigger>
          <AccordionContent className="text-base pl-2">
            <ul className="list-none pl-0 space-y-2">
              {[
                "grains",
                "protein",
                "vegetables",
                "fruits",
                "dairy",
                "fats",
              ].map((group) => (
                <li key={group}>
                  <KeyValuePair
                    label={t(`section9.groups.${group}.name`)}
                    value={t(`section9.groups.${group}.amount`)}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Alert className="mt-10">
        <AlertTitle className="text-base">{t("reminder.title")}</AlertTitle>
        <CardDescription className="text-sm">
          {t("reminder.content")}
        </CardDescription>
      </Alert>
    </div>
  );
};

export default Items;
