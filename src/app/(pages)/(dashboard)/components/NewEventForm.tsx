"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { type Dispatch, type SetStateAction, useState, use, useEffect } from "react";

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
	andress: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres."),
	referencePoint: z.string().optional(),
	capacity: z.number().min(1, "Capacidade deve ser maior que 0."),
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
	
	const [isActive, setIsActive] = useState<boolean>(false);

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
						{...register("duration")}
						onValueChange={(ev) => {
							setEventDuration(ev);
						}}
						defaultValue="30"
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="30 min" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="15">15 min</SelectItem>
							<SelectItem value="30">30 min</SelectItem>
							<SelectItem value="45">45 min</SelectItem>
							<SelectItem value="60">1 hora</SelectItem>
							<SelectItem value="180">1 hora e 30 minutos</SelectItem>
							<SelectItem value="240">2 horas</SelectItem>
						</SelectContent>
					</Select>
					{errors.duration && (
						<p className="text-red-500 text-xs">{errors.duration.message}</p>
					)}
				</label>
				<label>
					<span>Local.</span>
					<Select
						onValueChange={(ev) =>
							ev !== "PRESENCIAL" ? setEventLocation(ev) : setIsActive(true)
						}
						{...register("location")}
						defaultValue="ZOOM"
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="30 min" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ZOOM">ZOOM</SelectItem>
							<SelectItem value="PHONE_CALL">Chamada por Telefone</SelectItem>
							<SelectItem value="PRESENCIAL">Presencial</SelectItem>
						</SelectContent>
					</Select>
				</label>
				{isActive && (
					<>
						<label>
							<span>Endereço.</span>
							<Input
								{...register("andress")}
								onChange={(ev) => setEventLocation(ev.target.value)}
								type="text"
								placeholder="Ex. Rua dos Bobos, 0"
							/>
							{errors.andress && (
								<p className="text-red-500 text-xs">{errors.andress.message}</p>
							)}
						</label>
						<label>
							<span>Ponto de referência</span>
							<Input
								{...register("referencePoint")}
								type="text"
								placeholder="Ex. Próximo a padaria."
							/>
						</label>
						<label>
							<span>Capacidade.</span>
							<Input
								{...register("capacity")}
								type="number"
								min={1}
								placeholder="Ex. 10"
							/>
							{errors.capacity && (
								<p className="text-red-500 text-xs">
									{errors.capacity.message}
								</p>
							)}
						</label>
					</>
				)}
				<label>
					<span>Descrição.</span>
					<Textarea
						{...register("description")}
						placeholder="Ex. Marque reuniões comigo..."
					/>
					{errors.description && (
						<p className="text-red-500 text-xs">{errors.description.message}</p>
					)}
				</label>
				<Separator orientation="horizontal" className="bg-zinc-700" />
				<div className="flex gap-3 items-center justify-between">
					<Button type="submit" size={"lg"} className="text-white flex gap-2">
						Criar <ArrowRight width={20} />
					</Button>
				</div>
			</form>
		</section>
	);
}
