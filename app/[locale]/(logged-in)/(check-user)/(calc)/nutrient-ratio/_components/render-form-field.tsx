import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import FormInfoHoverCardWrapper from "@/components/\bcalculator/form-info-hover-card-wrapper";

type RenderFormFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  hoverComponent: React.ReactNode;
  desc: string;
  placeholder: string;
  isPending: boolean;
};

const renderFormField = ({
  control,
  name,
  label,
  hoverComponent,
  desc,
  placeholder,
  isPending,
}: RenderFormFieldProps) => (
  <FormField
    key={name}
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormInfoHoverCardWrapper label={label}>
          {hoverComponent}
        </FormInfoHoverCardWrapper>
        <FormDescription>{desc}</FormDescription>
        <FormControl>
          <Input
            {...field}
            disabled={isPending}
            value={field.value ?? 0}
            placeholder={placeholder}
            type="number"
            min={0}
            max={100}
            step={1}
            required
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default renderFormField;
