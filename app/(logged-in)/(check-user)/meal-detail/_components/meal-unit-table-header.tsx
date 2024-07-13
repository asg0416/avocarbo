import { TableHead, TableRow } from "@/components/ui/table";
import { mealTimes, mealTimesMap } from "@/utils/constants";

const renderTableHeader = (stickyClass: string) => (
  <TableRow className="bg-primary hover:bg-primary divide-x">
    <TableHead
      className={`w-1/12 text-center p-0 ${stickyClass} left-0 z-20 bg-primary text-white dark:bg-green-950`}
    >
      <div className="flex items-center justify-center h-full border-r border-white dark:border-gray-800">
        <span>식품군</span>
      </div>
    </TableHead>
    <TableHead
      className={`w-1/12 p-0 text-center ${stickyClass} left-[92px] z-20 bg-primary text-white dark:bg-green-950`}
    >
      <div className="flex items-center justify-center h-full border-r border-white dark:border-gray-800">
        <span>1일</span>
      </div>
    </TableHead>
    {mealTimes.map((meal) => (
      <TableHead
        key={meal}
        className="w-1/12 text-center text-white dark:bg-green-950"
      >
        <span>{mealTimesMap.get(meal)}</span>
      </TableHead>
    ))}
  </TableRow>
);
export default renderTableHeader