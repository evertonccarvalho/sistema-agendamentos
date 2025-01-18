// TimeIntervalComponent.tsx
import { deleteAvailabilityInterval } from "@/actions/availability/availabilityInterval/delete";
import { DayAvailabilityInterval } from "@/actions/availability/getAvailabilitys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertMinutesToTimeString } from "@/utils/convertTimeStringToNumber";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface TimeIntervalProps {
	intervals: DayAvailabilityInterval[];
	dayIndex: number;
	disabled: boolean;
}

const TimeInterval = ({ intervals, dayIndex, disabled }: TimeIntervalProps) => {
	const { register } = useFormContext(); // Usando o contexto do formulário

	const handleDeleteInterval = async (intervalId: string) => {
		const response = await deleteAvailabilityInterval(intervalId);
		if (response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	};

	return (
		<div className="flex flex-col  w-fit flex-wrap md:flex-row gap-1">
			{intervals.map((interval, intervalIndex) => (
				<div
					key={intervalIndex}
					className="flex p-1 bg-accent rounded-sm gap-1 items-center"
				>
					<Input
						disabled={disabled}
						{...register(
							`availability.${dayIndex}.intervals.${intervalIndex}.startTime`
						)}
						type="time"
						className="h-8 w-fit"
						defaultValue={convertMinutesToTimeString(interval.startTime)}
					/>
					<span>-</span>
					<Input
						disabled={disabled}
						{...register(
							`availability.${dayIndex}.intervals.${intervalIndex}.endTime`
						)}
						type="time"
						className="h-8 w-fit"
						defaultValue={convertMinutesToTimeString(interval.endTime)}
					/>
					<Button
						size="icon"
						variant={"ghost"}
						type="button"
						className="w-fit h-fit"
						disabled={!interval.id}
						onClick={() => handleDeleteInterval(interval.id!)} // Passando o ID para o manipulador de remoção
					>
						<Trash size={18} color="red" />
					</Button>
				</div>
			))}
		</div>
	);
};

export default TimeInterval;
