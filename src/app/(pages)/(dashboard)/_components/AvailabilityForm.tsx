"use client";
import {
	createAvailability,
	type CreateAvailabilityParams,
} from "@/actions/availability/create";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	convertMinutesToTimeString,
	convertTimeStringToNumber,
} from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import type { Availability } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const ONE_HOUR_IN_MINUTES = 60;
interface FormSubmitData {
	availability: {
		id: string;
		weekDay: number;
		startTime: string;
		endTime: string;
		enabled: boolean;
	}[];
}

const defaultAvailability = [
	{ id: "", weekDay: 0, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 1, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 2, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 3, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 4, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 5, startTime: "08:00", endTime: "18:00", enabled: true },
	{ id: "", weekDay: 6, startTime: "08:00", endTime: "18:00", enabled: true },
];

interface AvailabilityFormProps {
	availability: Availability[];
}
const AvailabilityForm = ({ availability }: AvailabilityFormProps) => {
	const weekDays = getWeekDays();

	const formattedAvailability = defaultAvailability.map((defaultDay) => {
		const existingDay = availability.find(
			(day) => day.weekDay === defaultDay.weekDay
		);
		return existingDay
			? {
				id: existingDay.id,
				weekDay: existingDay.weekDay,
				startTime: convertMinutesToTimeString(existingDay.startTime),
				endTime: convertMinutesToTimeString(existingDay.endTime),
				enabled: existingDay.enabled,
			}
			: defaultDay;
	});

	const form = useForm({
		defaultValues: {
			availability: formattedAvailability,
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "availability",
	});

	const onSubmit = async (data: FormSubmitData) => {
		let res: { success: boolean; message: string } | null = null;
		try {
			for (const day of data.availability) {
				// Atualize o valor de `enabled` no objeto `availability` no formulário
				form.setValue(`availability.${day.weekDay}.enabled`, day.enabled);
				console.log(`Dia da semana: ${weekDays[day.weekDay]}, enabled: ${day.enabled}`);

				const availabilityData: CreateAvailabilityParams = {
					weekDay: day.weekDay,
					startTime: convertTimeStringToNumber(day.startTime),
					endTime: convertTimeStringToNumber(day.endTime),
					enabled: day.enabled,
				};

				// Envie os dados da disponibilidade para o backend
				res = await createAvailability(availabilityData);
				if (res !== null) {
					console.log(`Resposta do servidor para o dia ${day.weekDay}:`, res);
					if (!res.success) {
						console.error(
							`Erro ao criar disponibilidade para o dia ${day.weekDay}:`,
							res.message
						);
					}
				} else {
					console.error("Resposta nula recebida do servidor.");
				}
			}
			console.log("Todas as disponibilidades foram processadas com sucesso!");
		} catch (error) {
			console.error("Ocorreu um erro ao enviar o formulário:", error);
			console.log(
				"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos."
			);
		} finally {
			res?.success && toast.success(res.message);
		}
	};




	return (
		<Form {...form}>
			<form className="flex items-center flex-col w-full" onSubmit={form.handleSubmit(onSubmit)}>
				{fields.map((field, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="flex flex-col md:flex-row justify-start md:items-center w-full gap-1  pt-2 ">
						<FormField
							control={form.control}
							name={`availability.${index}.enabled`}
							render={({ field }) => (
								<FormItem
									className="flex flex-row w-full items-start  text-nowrap space-x-1 space-y-0"
								>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked: boolean) => {
												field.onChange(checked);
												form.setValue(`availability.${index}.enabled`, checked);
											}}
											aria-readonly
										/>
									</FormControl>
									<FormLabel className="text-xs font-light">
										{weekDays[index]}</FormLabel>
								</FormItem>
							)}
						/>

						<div className="flex gap-1 items-center">
							<Input
								className="w-full px-1 py-1 gap-1"
								disabled={
									form.getValues(`availability.${index}.enabled`) === false
								}
								{...form.register(`availability.${index}.startTime`, {})}
								type="time"
							/>
							<span>-</span>
							<Input
								className="w-full px-1 py-1 gap-1"
								disabled={
									form.getValues(`availability.${index}.enabled`) === false
								}
								{...form.register(`availability.${index}.endTime`, {})}
								type="time"
							/>
						</div>
					</div>
				))}
				<Button
					disabled={form.formState.isSubmitting}
					className="text-white mt-5"
					type="submit"
				>
					{form.formState.isSubmitting ? "Salvando..." : "Salvar"}
				</Button>
			</form>
		</Form>
	);
};

export default AvailabilityForm;
