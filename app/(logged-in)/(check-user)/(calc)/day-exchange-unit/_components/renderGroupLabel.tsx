import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GroupLabel from "./GroupLabel";
import { Input } from "@/components/ui/input";

export const renderGroupLabel = (
  form: any,
  isPending: boolean,
  label: string,
  totalUnit: number,
  fields: { name: string; label: string }[],
  option?: { targetUnit?: number }
) => {
  return (
    <GroupLabel
      key={label}
      label={label}
      totalUnit={totalUnit}
      targetUnit={option?.targetUnit}
    >
      <div className="pl-4 flex flex-col gap-y-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <div className="flex items-center justify-center gap-x-2">
                  {field.label && (
                    <FormLabel className="w-[45px]">{field.label}</FormLabel>
                  )}
                  <FormControl>
                    <Input
                      id={`${field.name}_input`}
                      divClassName="grow"
                      divStyle={{ marginTop: 0 }}
                      {...formField}
                      disabled={isPending}
                      value={formField.value ?? ""}
                      placeholder="2"
                      type="number"
                      min={0}
                      max={50}
                      step={1}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </GroupLabel>
  );
};
