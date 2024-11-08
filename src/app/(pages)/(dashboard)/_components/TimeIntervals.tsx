// TimeIntervalComponent.tsx
import { deleteAvailabilityInterval } from "@/actions/availability/availabilityInterval/delete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface TimeIntervalComponentProps {
	intervals: {
		id?: string;
		startTime: string;
		endTime: string;
	}[];
	dayIndex: number;
	disabled: boolean;
}

const TimeIntervalComponent = ({
	intervals,
	dayIndex,
	disabled,
}: TimeIntervalComponentProps) => {
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
		<div className="flex flex-col flex-wrap md:flex-row gap-1">
			{intervals.map((interval, intervalIndex) => (
				<div
					key={intervalIndex}
					className="flex bg-accent p-1 rounded-sm  gap-1 items-center"
				>
					<Input
						disabled={disabled}
						{...register(
							`availability.${dayIndex}.intervals.${intervalIndex}.startTime`
						)}
						type="time"
						defaultValue={interval.startTime}
					/>
					<span>-</span>
					<Input
						disabled={disabled}
						{...register(
							`availability.${dayIndex}.intervals.${intervalIndex}.endTime`
						)}
						type="time"
						defaultValue={interval.endTime}
					/>
					<Button
						size="icon"
						variant={"ghost"}
						type="button"
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

export default TimeIntervalComponent;
