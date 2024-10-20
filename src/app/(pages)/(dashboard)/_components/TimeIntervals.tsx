import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimeIntervalsProps {
	form: any;
	index: number;
}

interface Interval {
	id?: string;
	startTime: string;
	endTime: string;
}
const TimeIntervals = ({ form, index }: TimeIntervalsProps) => {
	return (
		<div>
			{form
				.getValues(`availability.${index}.intervals`)
				?.map((interval: Interval, intervalIndex: number) => (
					<div key={intervalIndex} className="flex space-x-2 py-1 items-center">
						<Input
							{...form.register(
								`availability.${index}.intervals.${intervalIndex}.startTime`
							)}
							type="time"
						/>
						<span>-</span>
						<Input
							{...form.register(
								`availability.${index}.intervals.${intervalIndex}.endTime`
							)}
							type="time"
						/>
						<Button
							type="button"
							onClick={() => {
								const intervals = form.getValues(
									`availability.${index}.intervals`
								);
								form.setValue(
									`availability.${index}.intervals`,
									intervals.filter((_: any, i: number) => i !== intervalIndex)
								);
							}}
						>
							Remover
						</Button>
						<Button
							type="button"
							onClick={() =>
								form.setValue(`availability.${index}.intervals`, [
									...form.getValues(`availability.${index}.intervals`),
									{ startTime: "", endTime: "" },
								])
							}
						>
							Adicionar Intervalo
						</Button>
					</div>
				))}
		</div>
	);
};

export default TimeIntervals;
