import { TableHead, TableRow } from "@/components/ui/table";
import { mealTimes, mealTimesMap } from "@/utils/constants";
import { useTranslations } from "next-intl";

const renderTableHeader = (stickyClass: string) => {
  const t = useTranslations("meal-unit-page-header");
  return(
  <TableRow className="bg-primary hover:bg-primary divide-x">
    <TableHead
      className={`w-1/12 text-center p-0 ${stickyClass} left-0 z-20 bg-primary text-white dark:bg-green-950`}
    >
      <div className="flex items-center justify-center h-full border-r border-white dark:border-gray-800">
        {t("ctg")}
      </div>
    </TableHead>
    <TableHead
      className={`w-1/12 p-0 text-center ${stickyClass} left-[92px] z-20 bg-primary text-white dark:bg-green-950`}
    >
      <div className="flex items-center justify-center h-full border-r border-white dark:border-gray-800">
        {t("total")}
      </div>
    </TableHead>
    {mealTimes.map((meal) => (
      <TableHead key={meal} className="w-1/12 text-center text-white dark:bg-green-950">
        {t(meal)}
      </TableHead>
    ))}
  </TableRow>
)};
export default renderTableHeader