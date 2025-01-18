import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface CheckBoxFormProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  description?: string;
}

export const CheckBoxForm = <T extends FieldValues>({
  className,
  form,
  description,
  ...props
}: CheckBoxFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn("flex-1 space-y-1 col-span-full w-full", className)}
        >
          <div className="space-y-0.5">
            {props.label && <FormLabel>{props.label}</FormLabel>}
          </div>

          <div className="flex gap-4 flex-row items-center justify-between rounded-lg border bg-card py-1 h-9 px-2 ">
            {description && <FormDescription>{description}</FormDescription>}
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-readonly
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

CheckBoxForm.displayName = "CheckBoxForm";
