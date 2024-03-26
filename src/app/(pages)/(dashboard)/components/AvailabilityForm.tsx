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
import { convertMinutesToTimeString, convertTimeStringToNumber } from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import type { Availability } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";

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
			(day) => day.weekDay === defaultDay.weekDay,
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
		try {
			for (const day of data.availability) {
				const availabilityData: CreateAvailabilityParams = {
					weekDay: day.weekDay,
					startTime: convertTimeStringToNumber(day.startTime),
					endTime: convertTimeStringToNumber(day.endTime),
					enabled: day.enabled,
				};

				if (day.enabled) {
					const res = await createAvailability(availabilityData);
					if (res !== null) {
						console.log(`Resposta do servidor para o dia ${day.weekDay}:`, res);
						if (!res.success) {
							console.error(
								`Erro ao criar disponibilidade para o dia ${day.weekDay}:`,
								res.message,
							);
						}
					} else {
						console.error("Resposta nula recebida do servidor.");
					}
				}
			}
			console.log("Todas as disponibilidades foram processadas com sucesso!");
		} catch (error) {
			console.error("Ocorreu um erro ao enviar o formulário:", error);
			console.log(
				"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos.",
			);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{fields.map((field, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="flex w-full items-start pt-3 justify-between gap-2 mb-2"
					>
						<FormField
							control={form.control}
							name={`availability.${index}.enabled`}
							render={({ field }) => (
								<FormItem className="flex justify-start gap-1 items-center">
									<FormControl>
										{/* <Checkbox
											checked={field.value}
											onCheckedChange={(checked) =>
												field.onChange(checked === true)
											}
										/> */}
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											aria-readonly
										/>
									</FormControl>
									<FormLabel className="truncate p-0 m-0 text-xs">
										{weekDays[index]}
									</FormLabel>
								</FormItem>
							)}
						/>

						<div className="flex gap-1">
							<div className="flex flex-col items-start gap-2">
								<Input
									className="w-32"
									disabled={!field.enabled}
									{...form.register(`availability.${index}.startTime`, {})}
									type="time"
								/>
							</div>
							<div className="flex flex-col items-start gap-2">
								<Input
									className="w-32"
									disabled={!field.enabled}
									{...form.register(`availability.${index}.endTime`, {})}
									type="time"
								/>
							</div>
						</div>
					</div>
				))}
				<Button disabled={form.formState.isSubmitting} type="submit">
					Confirmar
				</Button>
			</form>
		</Form>
	);
};

export default AvailabilityForm;
