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
import { Switch } from "../ui/switch";

interface SwitchFormProps<T extends FieldValues>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	description?: string;
}

export const SwitchForm = <T extends FieldValues>({
	className,
	form,
	description,
	...props
}: SwitchFormProps<T>) => {
	return (
		<FormField
			control={form.control}
			name={props.name}
			render={({ field }) => (
				<FormItem
					className={cn(" flex space-y-1 col-span-full w-full", className)}
				>
					<div className="flex gap-2 flex-row items-center ">
						<FormControl>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
								aria-readonly
							/>
						</FormControl>
						{props.label && (
							<FormLabel className="truncate text-xs">{props.label}</FormLabel>
						)}
						{description && <FormDescription>{description}</FormDescription>}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
SwitchForm.displayName = "InputForm";
