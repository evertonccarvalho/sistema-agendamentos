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
				id: z.string(uuid()),
				weekDay: z.coerce.number(),
				enabled: z.boolean(), // Adicionando a propriedade 'enabled' como opcional
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
				enabled: interval.enabled || false, // Definindo 'enabled' como false se não estiver presente
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

	const formattedAvailability = availability.map((day) => ({
		id: day.id,
		weekDay: day.weekDay,
		startTime: convertMinutesToTimeString(day.startTime),
		endTime: convertMinutesToTimeString(day.endTime),
		enabled: day.enabled,
	}));

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
					enabled: day.enabled,
					userId: "clu4iswxk0000k6j18161c2cs",
				};

				if (day.enabled) {
					const res = await createAvailability(availabilityData);
					console.log(`Resposta do servidor para o dia ${day.weekDay}:`, res);

					if (!res.success) {
						console.error(
							`Erro ao criar disponibilidade para o dia ${day.weekDay}:`,
							res.message,
						);
					}
				} else {
					// Se a disponibilidade não estiver habilitada, remova-a do banco de dados
					// Você precisa implementar a lógica para remover a disponibilidade do banco aqui
					console.log(`Removendo disponibilidade para o dia ${day.weekDay} do banco de dados...`);
					// Implemente a lógica para remover a disponibilidade no banco de dados
					// Utilize a função updateAvailability com enabled = false ou remova a disponibilidade diretamente do banco
					const updateParams: UpdateAvailabilityParams = {
						id: day.id,
						enabled: false, // Defina enabled como false para remover a disponibilidade
					};
					const updateRes = await updateAvailability(updateParams);
					console.log(`Resposta do servidor ao remover a disponibilidade para o dia ${day.weekDay}:`, updateRes);
				}
			}
			console.log("Todas as disponibilidades foram processadas com sucesso!");
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
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
												field.onChange(checked === true)
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
							disabled={!field.enabled}
							{...form.register(`availability.${index}.startTime`)}
							type="time"
						/>
						<Input
							className="w-32"
							disabled={!field.enabled}
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
