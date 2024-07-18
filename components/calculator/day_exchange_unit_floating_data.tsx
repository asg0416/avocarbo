import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableData } from "@/actions/calc-day-exchange-unit-table-data";
import { useTranslations } from "next-intl";

export interface DayExchangeFormValue {
  milk_whole: number;
  milk_low_fat: number;
  vegetables: number;
  fruits: number;
  grains: number;
  protein_low_fat: number;
  protein_medium_fat: number;
  protein_high_fat: number;
  fats: number;
}

interface CalcNutrient {
  totalKcal: number;
  totalCarbo: number;
  totalProtein: number;
  totalFat: number;
}

interface DayExchangeUnitFloatingDataProps {
  tableData: TableData;
  calcNutrient: CalcNutrient;
}

const DayExchangeUnitFloatingData = ({
  tableData,
  calcNutrient,
}: DayExchangeUnitFloatingDataProps) => {
  const t = useTranslations("day-exchange-unit-page");

  return (
    <div className="sticky bottom-4 bg-white border-t-2 mt-8 dark:bg-slate-950">
      <p className="text-base font-semibold mt-2">{t("floating-title")}</p>
      <Card className="border shadow-sm rounded-md mt-2  flex items-start justify-center flex-col w-full ">
        <CardContent className="w-full p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[360px] w-full border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-green-100 font-semibold text-gray-700 dark:bg-green-950 dark:text-gray-100">
                    {t("floating-hd-1")}
                  </TableHead>
                  <TableHead className="bg-green-100 font-semibold text-gray-700 dark:bg-green-950 dark:text-gray-100">
                    {t("floating-hd-2")}
                  </TableHead>
                  <TableHead className="bg-green-100 font-semibold text-gray-700 dark:bg-green-950 dark:text-gray-100">
                    {t("floating-hd-3")}
                  </TableHead>
                  <TableHead className="bg-green-100 font-semibold text-gray-700 dark:bg-green-950 dark:text-gray-100">
                    {t("floating-hd-4")}
                  </TableHead>
                  <TableHead className="bg-green-100 font-semibold text-gray-700 dark:bg-green-950 dark:text-gray-100">
                    {t("floating-hd-5")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t("floating-row-1")}</TableCell>
                  <TableCell>{tableData.carbo}</TableCell>
                  <TableCell>{tableData.protein}</TableCell>
                  <TableCell>{tableData.fat}</TableCell>
                  <TableCell>{tableData.kcal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t("floating-row-2")}</TableCell>
                  <TableCell>{calcNutrient.totalCarbo}</TableCell>
                  <TableCell>{calcNutrient.totalProtein}</TableCell>
                  <TableCell>{calcNutrient.totalFat}</TableCell>
                  <TableCell>{calcNutrient.totalKcal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayExchangeUnitFloatingData;
