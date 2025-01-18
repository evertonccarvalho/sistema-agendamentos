'use client';
import { deleteAvailabilityInterval } from '@/actions/availability/availabilityInterval/delete';
import { createAvailability } from '@/actions/availability/create';
import { DayAvailabilityModel } from '@/actions/availability/getAvailabilitys';
import { GenericForm } from '@/components/form/form';
import { InputForm } from '@/components/form/InputForm';
import { SwitchForm } from '@/components/form/SwitchForm';
import { Button } from '@/components/ui/button';
import {
	convertMinutesToTimeString,
	convertTimeStringToNumber,
} from '@/utils/convertTimeStringToNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DayFormDto, dayFormSchema } from '../schemas/day-form.schema';
import AddNewIntervalForm from './add-new-interval.form';
import TimeInterval from './time-interval';

interface DayFormProps {
	day: DayAvailabilityModel;
	weekDayLabel: string;
}

const DayForm = ({ day, weekDayLabel }: DayFormProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<DayFormDto>({
		resolver: zodResolver(dayFormSchema),
		defaultValues: {
			id: day.id,
			weekDay: day.weekDay,
			intervals: day.intervals.map((interval) => ({
				id: interval.id,
				startTime: convertMinutesToTimeString(interval.startTime),
				endTime: convertMinutesToTimeString(interval.endTime),
			})),
			enabled: day.enabled,
		},
	});

	const onSubmit = async (data: DayFormDto) => {
		const parsedData = dayFormSchema.parse(data);
		console.log('parsedData', parsedData);
		startTransition(async () => {
			try {
				for (const interval of parsedData.intervals) {
					await createAvailability({
						weekDay: parsedData.weekDay,
						availabilityInterval: {
							id: interval.id,
							startTime: convertTimeStringToNumber(
								interval.startTime
							),
							endTime: convertTimeStringToNumber(
								interval.endTime
							),
						},
						enabled: parsedData.enabled,
					});
				}
				toast.success(
					`Disponibilidade de ${weekDayLabel} salva com sucesso!`
				);
			} catch (error) {
				console.error('Erro ao salvar disponibilidades:', error);
				toast.error(
					`Erro ao salvar disponibilidade de ${weekDayLabel}!`
				);
			}
		});
	};

	const handleDeleteInterval = async (intervalId: string) => {
		const response = await deleteAvailabilityInterval(intervalId);
		if (response.success) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	};

	return (
		<GenericForm
			form={form}
			action={'Salvar'}
			onSubmit={onSubmit}
			loading={isPending}
			hasCustomButton
			className="mb-1"
		>
			<div className="flex gap-1 items-center w-full">
				<div className="w-full px-1 flex flex-wrap  items-center justify-between rounded-lg border bg-card">
					<div className="flex w-full min-w-48 max-w-48 items-center ">
						<SwitchForm
							form={form}
							name={`enabled`}
							label={weekDayLabel}
						/>
						<AddNewIntervalForm availabilityId={day.id} />
					</div>
					<TimeInterval day={day} form={form} isPending={isPending} />

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
									onClick={() =>
										handleDeleteInterval(interval.id!)
									}
								>
									<Trash size={18} color="red" />
								</Button>
							</div>
						))}
					</div>
				</div>
				<Button
					className="h-9 w-9"
					size="icon"
					type="submit"
					disabled={isPending || !form.formState.isDirty}
				>
					{isPending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Check className="w-4 h-4" />
					)}
				</Button>
			</div>
		</GenericForm>
	);
};

export default DayForm;
