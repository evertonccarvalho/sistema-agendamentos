"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useState } from "react";

const saveNewEventSchema = z.object({
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),
	duration: z
		.string()
		.min(2, "Escolha uma duração minima ou customize o tempo."),
	location: z
		.string()
		.min(5, "Local do evento deve ter no mínimo 5 caracteres."),
	description: z.string().optional(),
	time: z.number().min(1, "Tempo deve ser maior que 0."),
	typeTime: z.string().min(1, "Escolha um tipo de tempo."),
});

type SaveNewEvent = z.infer<typeof saveNewEventSchema>;

interface INewEventDataProps {
	setEventName: Dispatch<SetStateAction<string | undefined>>;
	setEventDuration: Dispatch<SetStateAction<string | undefined>>;
	setEventLocation: Dispatch<SetStateAction<string | undefined>>;
}
export interface IEventDataProps {
	eventName: string;
	eventDuration: string;
	eventLocation: string;
	userName: string;
}

export function NewEventForm({
	setEventDuration,
	setEventLocation,
	setEventName,
}: INewEventDataProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SaveNewEvent>({
		resolver: zodResolver(saveNewEventSchema),
	});
	const [duration, setDuration] = useState<string | null>(null);

	const onSubmit = (data: SaveNewEvent) => {
		console.log(data);
		reset();
	};

	return (
		<section className="flex w-96 p-4 rounded-md flex-col gap-3 border-[1px] border-zinc-700 max-[1135px]:w-full">
			<h1 className="text-2xl font-semibold">Criar Novo Evento</h1>
			<Separator orientation="horizontal" className="bg-zinc-700" />
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
				<label>
					<span>Nome do Evento.</span>
					<Input
						type="text"
						{...register("name")}
						onChange={(ev) => setEventName(ev.target.value)}
						placeholder="Ex. Aulas de Violão"
					/>
					{errors.name && (
						<p className="text-red-500 text-xs">{errors.name.message}</p>
					)}
				</label>
				<label>
					<span>Duração.</span>
					<Select
						onValueChange={(ev) =>
							ev !== "custom" ? setEventDuration(ev) : setDuration(ev)
						}
						{...register("duration")}
						defaultValue="30"
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="30 min" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="15">15 min</SelectItem>
							<SelectItem value="30">30 min</SelectItem>
							<SelectItem value="45">45 min</SelectItem>
							<SelectItem value="60">60 min</SelectItem>
							<SelectItem value="custom">Personalizado</SelectItem>
						</SelectContent>
					</Select>
					{errors.duration && (
						<p className="text-red-500 text-xs">{errors.duration.message}</p>
					)}
				</label>
				{duration === "custom" && (
					<div className="flex gap-3">
						<Input type="number" {...register("time")} placeholder="Ex. 2" />
						{errors.time && (
							<p className="text-red-500 text-xs">{errors.time.message}</p>
						)}
						<Select {...register("typeTime")} defaultValue="m">
							<SelectTrigger className="w-full">
								<SelectValue placeholder="min" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="m">min</SelectItem>
								<SelectItem value="h">h</SelectItem>
							</SelectContent>
						</Select>
						{errors.typeTime && (
							<p className="text-red-500 text-xs">{errors.typeTime.message}</p>
						)}
					</div>
				)}
				<label>
					<span>Local.</span>
					<Input
						{...register("location")}
						onChange={(ev) => setEventLocation(ev.target.value)}
						type="text"
						placeholder="Ex. Na minha cama."
					/>
					{errors.location && (
						<p className="text-red-500 text-xs">{errors.location.message}</p>
					)}
				</label>
				<label>
					<span>Descrição.</span>
					<Input
						{...register("description")}
						type="text"
						placeholder="Ex. Marque reuniões comigo..."
					/>
					{errors.description && (
						<p className="text-red-500 text-xs">{errors.description.message}</p>
					)}
				</label>
				<Separator orientation="horizontal" className="bg-zinc-700" />
				<div className="flex gap-3 items-center justify-between">
					<Button variant={"outline"}>Cancelar</Button>
					<Button type="submit" className="text-white flex gap-2">
						Continuar <ArrowRight width={20} />
					</Button>
				</div>
			</form>
		</section>
	);
}
