"use client";
import {
	createAvailability,
	type CreateAvailabilityParams,
} from "@/actions/availability/create";
import { AvailabilityModel } from "@/actions/availability/getAvailabilitys";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
	convertMinutesToTimeString,
	convertTimeStringToNumber,
} from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { defaultAvailability } from "../(routes)/availability/_components/const";
import TimeIntervals from "./TimeIntervals";

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

	const formattedAvailability = defaultAvailability.map((defaultDay) => {
		const existingDay = availability.find(
			(day) => day.weekDay === defaultDay.weekDay
		);

		if (existingDay) {
			return {
				id: existingDay.id,
				weekDay: existingDay.weekDay,
				intervals: existingDay.intervals.map((interval) => ({
					id: interval.id,
					startTime: convertMinutesToTimeString(interval.startTime),
					endTime: convertMinutesToTimeString(interval.endTime),
				})),
				enabled: existingDay.enabled,
			};
		}

		return {
			...defaultDay,
			intervals: defaultDay.intervals || [], // Garantir que sempre tenha 'intervals'
		};
	});
	console.log(availability);

	const form = useForm({
		defaultValues: {
			availability: formattedAvailability,
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
					//
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col items-center"
			>
				{availabilityFields.map((field, index) => (
					<div key={field.id} className="w-full mb-4">
						<FormField
							control={form.control}
							name={`availability.${index}.enabled`}
							render={({ field: formField }) => (
								<FormItem className="flex items-center">
									<Checkbox
										checked={formField.value}
										onCheckedChange={formField.onChange}
									/>
									<FormLabel className="ml-2">
										{weekDays[form.getValues(`availability.${index}.weekDay`)]}
									</FormLabel>
								</FormItem>
							)}
						/>

						<TimeIntervals form={form} index={index} />
					</div>
				))}
				<Button type="submit">Salvar</Button>
			</form>
		</Form>
	);
};

export default AvailabilityForm;
