import { TableCell } from "@/components/ui/table";
interface RenderTableCellProps {
  value: number;
  key: string;
}

const renderTableCell = ({ value, key }: RenderTableCellProps) => {
  const shouldHighlightKey = ["morning", "lunch", "dinner"].some((term) =>
    key.includes(term)
  );
  const colColor = shouldHighlightKey && !key.includes("morningSnack") ? "bg-lime-50" : ""
  
  return(
    <TableCell key={key} className={`border ${colColor}`}>
      <div className="text-center">{value}</div>
    </TableCell>
  );
};

export default renderTableCell;
