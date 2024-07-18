import { TableCell } from "@/components/ui/table";
import { Control, FieldArrayWithId } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { MealUnitField } from "@/utils/interfaces";
import { Input } from "@/components/ui/input";

interface RenderTableCellProps {
  field: FieldArrayWithId<any, "mealUnits", "id">;
  index: number;
  key: MealUnitField;
  control: Control<any>;
  isPending: boolean;
}

const renderTableCell = ({
  field,
  index,
  key,
  control,
  isPending,
}: RenderTableCellProps) => (
  <TableCell key={`${field.id}-${key}`}>
    <FormField
      control={control}
      name={
        `mealUnits.${index}.${key}` as `mealUnits.${number}.${MealUnitField}`
      }
      render={({ field: formField }) => (
        <FormItem>
          <FormControl>
            <Input
              {...formField}
              disabled={isPending}
              required
              value={formField.value ?? 0}
              type="number"
              min={0}
              max={50}
              step={0.5}
            />
          </FormControl>
        </FormItem>
      )}
    />
  </TableCell>
);

export default renderTableCell;
