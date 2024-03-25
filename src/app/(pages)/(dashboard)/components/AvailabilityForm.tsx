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
import { convertTimeStringToNumber } from "@/utils/convertTimeStringToNumber";
import { getWeekDays } from "@/utils/getWeekDay";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Availability } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const ONE_HOUR_IN_MINUTES = 60;

const availabilitySchema = z.object({
	availability: z
		.array(
			z.object({
				weekDay: z.coerce.number(),
				enabled: z.boolean(),
				startTime: z.string(),
				endTime: z.string(),
			}),
		)
		.length(7)
		.transform((availability) => availability.filter((a) => a.enabled))
		.refine(
			(availability) => availability.length > 0,
			"Você precisa de pelo menos uma disponibilidade em um dia da semana",
		)
		.transform((intervals) =>
			intervals.map((interval) => ({
				weekDay: interval.weekDay,
				startTime: convertTimeStringToNumber(interval.startTime),
				endTime: convertTimeStringToNumber(interval.endTime),
			})),
		)
		.refine(
			(intervals) =>
				intervals.every(
					(interval) =>
						interval.endTime - ONE_HOUR_IN_MINUTES >= interval.startTime,
				),
			{
				message:
					"O horário de término do agendamento deve ser pelo menos 1h a frente do horário de início.",
			},
		),
});

export type WeekdayAvailability = z.infer<typeof availabilitySchema>;

function convertMinutesToTimeString(minutes: number) {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

interface AvailabilityFormProps {
	availability: Availability[];
}
const AvailabilityForm = ({ availability }: AvailabilityFormProps) => {
	const weekDays = getWeekDays();

	const formattedAvailability = Array.from({ length: 7 }, (_, index) => {
		const existingDay = availability.find(day => day.weekDay === index);
		if (existingDay) {
			return {
				id: existingDay.id,
				weekDay: existingDay.weekDay,
				startTime: convertMinutesToTimeString(existingDay.startTime),
				endTime: convertMinutesToTimeString(existingDay.endTime),
				enabled: true, // Definir "enabled" como true, já que todos os dias estão disponíveis
			};
		}
		// Se o dia não existe na lista de disponibilidade, preenche com valores padrão
		return {
			weekDay: index,
			startTime: "08:00", // Hora padrão de início
			endTime: "17:00", // Hora padrão de término
			enabled: false, // Define como desabilitado
		};
	});

	const form = useForm({
		resolver: zodResolver(availabilitySchema),
		defaultValues: {
			availability: formattedAvailability,
		},
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "availability",
	});

	const onSubmit = async (data: WeekdayAvailability) => {
		try {
			for (const day of data.availability) {
				const availabilityData: CreateAvailabilityParams = {
					weekDay: day.weekDay,
					startTime: +day.startTime,
					endTime: +day.endTime,
					userId: "clu4iswxk0000k6j18161c2cs",
				};

				const res = await createAvailability(availabilityData);
				console.log(`Resposta do servidor para o dia ${day.weekDay}:`, res);

				if (!res.success) {
					console.error(
						`Erro ao criar disponibilidade para o dia ${day.weekDay}:`,
						res.message,
					);
				}
			}
			console.log("Todas as disponibilidades foram criadas com sucesso!");
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
					<div key={index} className="grid grid-cols-3 gap-2 bg-slate-500 m-2">
						<FormField
							control={form.control}
							name={`availability.${index}.enabled`}
							render={({ field }) => (
								<FormItem className="bg-red-700 flex justify-start gap-1 items-center">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked) =>
												form.setValue(`availability.${index}.enabled`, checked)
											}
										/>
									</FormControl>
									<FormLabel className="truncate p-0 m-0 text-xs">
										{weekDays[index]}
									</FormLabel>
								</FormItem>
							)}
						/>

						<Input
							className="w-32"
							{...form.register(`availability.${index}.startTime`)}
							type="time"
						/>
						<Input
							className="w-32"
							{...form.register(`availability.${index}.endTime`)}
							type="time"
						/>
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
