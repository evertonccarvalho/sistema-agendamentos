import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface InputFormProps<T extends FieldValues>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'> {
	name: Path<T>;
	form: UseFormReturn<T>;
	label?: string;
	description?: string;
}

export const InputForm = <T extends FieldValues>({
	className,
	form,
	description,
	...props
}: InputFormProps<T>) => {
	return (
		<FormField
			control={form.control}
			name={props.name}
			render={({ field }) => (
				<FormItem
					className={cn(
						'flex-1 space-y-1 col-span-full w-full',
						className
					)}
				>
					{props.label && <FormLabel>{props.label}</FormLabel>}
					<FormControl>
						<Input
							className="h-8"
							type={props.type}
							placeholder={props.placeholder}
							{...field}
							{...props}
						/>
					</FormControl>
					{description && (
						<FormDescription>{description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
InputForm.displayName = 'InputForm';
