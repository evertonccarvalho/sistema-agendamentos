"use client";
import { createAvailabilityInterval } from "@/actions/availability/availabilityInterval/create";
import {
	createAvailability,
	type CreateAvailabilityParams,
} from "@/actions/availability/create";
import { AvailabilityModel } from "@/actions/availability/getAvailabilitys";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	convertMinutesToTimeString,
	convertTimeStringToNumber,
} from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import TimeIntervalComponent from "./TimeIntervals";

interface FormSubmitData {
	availability: {
		id: string;
		weekDay: number;
		intervals: {
			id?: string;
			startTime: string;
			endTime: string;
		}[];
		enabled: boolean;
	}[];
}

interface AvailabilityFormProps {
	availability: AvailabilityModel[];
}

const AvailabilityForm = ({ availability }: AvailabilityFormProps) => {
	const weekDays = getWeekDays();

	const form = useForm({
		defaultValues: {
			availability: availability.map((day) => ({
				...day,
				intervals: day.intervals.map((interval) => ({
					...interval,
					startTime: convertMinutesToTimeString(interval.startTime),
					endTime: convertMinutesToTimeString(interval.endTime),
				})),
			})),
		},
	});

	const { fields: availabilityFields } = useFieldArray({
		control: form.control,
		name: "availability",
	});

	const onSubmit = async (data: FormSubmitData) => {
		try {
			for (const day of data.availability) {
				for (const interval of day.intervals) {
					const availabilityData: CreateAvailabilityParams = {
						weekDay: day.weekDay,
						availabilityInterval: {
							id: interval.id,
							startTime: convertTimeStringToNumber(interval.startTime),
							endTime: convertTimeStringToNumber(interval.endTime),
						},
						enabled: day.enabled,
					};
					const res = await createAvailability(availabilityData);
					if (res && !res.success) {
						console.error(
							`Erro ao criar disponibilidade para o dia ${day.weekDay}:`,
							res.message
						);
					}
				}
			}
			toast.success("Disponibilidades salvas com sucesso!");
		} catch (error) {
			console.error("Erro ao salvar disponibilidades:", error);
		}
	};

	const addNewInterval = async (index: number) => {
		try {
			const availabilityId = form.getValues(`availability.${index}.id`);
			const newInterval = {
				startTime: convertTimeStringToNumber("08:00"), // O horário inicial padrão
				endTime: convertTimeStringToNumber("09:00"), // O horário final padrão
				availabilityId, // Passando o ID da disponibilidade
			};

			const res = await createAvailabilityInterval(newInterval);

			if (res && res.success) {
				toast.success("Intervalo adicionado com sucesso!");
			} else {
				console.error(`Erro ao criar novo intervalo: ${res.message}`);
			}
		} catch (error) {
			console.error("Erro ao adicionar novo intervalo:", error);
		}
	};

	return (
		
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-center"
			>
				{availabilityFields.map((field, index) => (
					<div
						key={index}
						className="flex bg flex-col  md:flex-row justify-between md:items-center w-full gap-2 py-1 "
					>
						<div className="flex items-center justify-between ">
							<FormField
								control={form.control}
								name={`availability.${index}.enabled`}
								render={({ field }) => (
									<FormItem className="flex flex-row  w-28 items-start text-nowrap space-x-1 space-y-0">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={(checked: boolean) => {
													field.onChange(checked);
													form.setValue(
														`availability.${index}.enabled`,
														checked
													);
												}}
												aria-readonly
											/>
										</FormControl>
										<FormLabel className="text-xs font-light">
											{weekDays[index]}
										</FormLabel>
									</FormItem>
								)}
							/>
							<Button
								size={"icon"}
								variant="ghost"
								type="button"
								onClick={() => addNewInterval(index)}
							>
								<Plus size={18} className="text-primary" />
							</Button>
						</div>
						<TimeIntervalComponent
							intervals={form.getValues(`availability.${index}.intervals`)} // Passa os intervalos
							dayIndex={index}
							disabled={
								form.getValues(`availability.${index}.enabled`) === false
							}
						/>
					</div>
				))}
				<Button type="submit">Salvar</Button>
			</form>
		</Form>
	);
};

export default AvailabilityForm;
