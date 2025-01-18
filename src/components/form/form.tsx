import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
interface GenericFormProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	onSubmit: (data: T) => Promise<void>;
	loading: boolean;
	children: React.ReactNode;
	className?: string;
	action: string;
	isDirty?: boolean;
	hasCustomButton?: boolean;
}

export const GenericForm = <T extends FieldValues>({
	form,
	onSubmit,
	loading,
	children,
	className,
	action,
	isDirty,
	hasCustomButton,
}: GenericFormProps<T>) => {
	// Função para verificar se há um botão `type="submit"` nos filhos

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					`mx-auto w-full items-center justify-center gap-2 space-y-2`,
					className
				)}
			>
				<div className="flex flex-col gap-2">{children}</div>
				{/* Renderiza o ActionButton apenas se não houver botão customizado */}
				{!hasCustomButton && (
					<ActionButton
						action={action}
						loading={loading}
						isDirty={isDirty ? form.formState.isDirty : true}
					/>
				)}
			</form>
		</Form>
	);
};

interface ActionButtonProps {
	loading: boolean;
	action: string;
	isDirty: boolean;
}

const ActionButton = ({ loading, action, isDirty }: ActionButtonProps) => {
	const shouldShowButton = isDirty || loading;

	if (!shouldShowButton) return null;

	return (
		<Button
			size="sm"
			variant="default"
			type="submit"
			className="flex w-full gap-1"
			disabled={loading || !isDirty}
		>
			{loading ? (
				<>
					<Loader2 className="h-5 w-5 animate-spin" />
					Salvando
				</>
			) : (
				action
			)}
		</Button>
	);
};

export default ActionButton;
