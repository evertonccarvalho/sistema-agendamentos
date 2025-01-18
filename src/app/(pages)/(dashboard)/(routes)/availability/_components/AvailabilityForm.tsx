"use client";
import { createAvailability } from "@/actions/availability/create";
import { AvailabilityModel } from "@/actions/availability/getAvailabilitys";
import { GenericForm } from "@/components/form/form";
import { SwitchForm } from "@/components/form/SwitchForm";
import {
	convertMinutesToTimeString,
	convertTimeStringToNumber,
} from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddNewIntervalForm from "./add-new-interval.form";
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
		<>
			<GenericForm
				form={form}
				action={"Salvar"}
				onSubmit={onSubmit}
				loading={false}
			>
				{initialAvailability.map((day) => (
					<div
						key={day.weekDay}
						className="grid grid-cols-1 sm:grid-cols-4  px-2 items-center justify-between rounded-lg border bg-card"
					>
						{/* Switch e Nome do Dia */}
						<div className="col-span-1 flex items-center w-full">
							<SwitchForm
								form={form}
								name={`availability.${day.weekDay}.enabled`}
								label={weekDays[day.weekDay]}
							/>
							<AddNewIntervalForm availabilityId={day.id} />
						</div>

						{/* Intervalos de Tempo */}
						<div className="col-span-1 sm:col-span-3">
							<TimeIntervalComponent
								intervals={day.intervals}
								dayIndex={day.weekDay}
								disabled={
									!form.getValues(`availability.${day.weekDay}.enabled`)
								}
							/>
						</div>
					</div>
				))}
			</GenericForm>
		</>
	);
};
export default AvailabilityForm;
