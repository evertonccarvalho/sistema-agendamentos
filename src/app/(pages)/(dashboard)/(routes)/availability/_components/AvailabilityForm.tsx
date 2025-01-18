"use client";
import { createAvailability } from "@/actions/availability/create";
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
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TimeIntervalComponent from "./TimeIntervals";
import AddNewIntervalForm from "./add-new-interval.form";

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

	const initialAvailability = useMemo(() => {
		return availability.map((day) => ({
			...day,
			intervals: day.intervals.map((interval) => ({
				...interval,
				startTime: convertMinutesToTimeString(interval.startTime),
				endTime: convertMinutesToTimeString(interval.endTime),
			})),
		}));
	}, [availability]);

	const form = useForm({
		defaultValues: { availability: initialAvailability },
	});

	const onSubmit = async (data: FormSubmitData) => {
		try {
			for (const day of data.availability) {
				for (const interval of day.intervals) {
					await createAvailability({
						weekDay: day.weekDay,
						availabilityInterval: {
							id: interval.id,
							startTime: convertTimeStringToNumber(interval.startTime),
							endTime: convertTimeStringToNumber(interval.endTime),
						},
						enabled: day.enabled,
					});
				}
			}
			toast.success("Disponibilidades salvas com sucesso!");
		} catch (error) {
			console.error("Erro ao salvar disponibilidades:", error);
			toast.error("Erro ao salvar disponibilidades!");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-center"
			>
				{initialAvailability.map((day) => (
					<div
						key={day.weekDay}
						className="flex flex-col md:flex-row justify-between md:items-center w-full gap-2"
					>
						<div className="flex items-center justify-between">
							<FormField
								control={form.control}
								name={`availability.${day.weekDay}.enabled`}
								render={({ field }) => (
									<FormItem className="flex flex-row w-28 items-start space-x-1">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="text-xs font-light">
											{weekDays[day.weekDay]}
										</FormLabel>
									</FormItem>
								)}
							/>
							<AddNewIntervalForm availabilityId={day.id} />
						</div>
						<TimeIntervalComponent
							intervals={day.intervals}
							dayIndex={day.weekDay}
							disabled={!form.getValues(`availability.${day.weekDay}.enabled`)}
						/>
					</div>
				))}
				<Button type="submit">Salvar</Button>
			</form>
		</Form>
	);
};

export default AvailabilityForm;
