// TimeIntervalComponent.tsx
import { deleteAvailabilityInterval } from '@/actions/availability/availabilityInterval/delete';
import { DayAvailabilityModel } from '@/actions/availability/getAvailabilitys';
import { InputForm } from '@/components/form/InputForm';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface TimeIntervalProps {
	day: DayAvailabilityModel;
	form: UseFormReturn<any>;
	isPending: boolean;
}

const TimeInterval = ({ day, form, isPending }: TimeIntervalProps) => {

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
			{day.intervals.map((interval, index) => (
				<div
					key={interval.id}
					className="flex p-1 bg-accent rounded-sm gap-1 items-center"
				>
					<InputForm
						form={form}
						name={`intervals.${index}.startTime`}
						disabled={isPending}
						type="time"
						className="h-8 w-fit"
					/>
					<span>-</span>
					<InputForm
						form={form}
						name={`intervals.${index}.endTime`}
						disabled={isPending}
						type="time"
						className="h-8 w-fit"
					/>
					<Button
						size="icon"
						variant={'ghost'}
						type="button"
						className="w-fit h-fit"
						disabled={!interval.id}
						onClick={() => handleDeleteInterval(interval.id!)}
					>
						<Trash size={18} color="red" />
					</Button>
				</div>
			))}
		</div>
	);
};

export default TimeInterval;
