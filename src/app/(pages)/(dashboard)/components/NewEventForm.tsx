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
import { type Dispatch, type SetStateAction, useState } from "react";
import { createEvent } from "@/actions/eventType/saveEvent";
import { useRouter } from "next/navigation";
import { editEvent } from "@/actions/eventType/editEvent";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";

const durationOptions = [
	{ value: 15, label: "15 minutos" },
	{ value: 30, label: "30 minutos" },
	{ value: 45, label: "45 minutos" },
	{ value: 60, label: "1 hora" },
	{ value: 90, label: "1 hora e 30 minutos" },
	{ value: 120, label: "2 horas" },
];

enum Locations {
	ZOOM = "ZOOM",
	PHONE_CALL = "PHONE_CALL",
	PRESENCIAL = "PRESENCIAL",
}

const saveNewEventSchema = z.object({
	id: z.string().optional(),
	creatorId: z.string(),
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),
	description: z.string().min(5, "Descrição do evento deve ter no mínimo 5 caracteres."),
	duration: z.coerce.number().default(60),
	active: z.boolean().default(true),
	locationType: z.any(),
	andress: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres.").optional(),
	capacity: z.coerce.number().default(1),
	arrivalInfo: z.string().optional(),
});

export type SaveNewEvent = z.infer<typeof saveNewEventSchema>;

interface INewEventDataProps {
	setEventName: Dispatch<SetStateAction<string | undefined>>;
	setEventDuration: Dispatch<SetStateAction<string | undefined>>;
	setEventLocation: Dispatch<SetStateAction<string | undefined>>;
	initialData?: SaveNewEvent;
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
	initialData,
}: INewEventDataProps) {
	const { data } = useSession();
	const loguedUserId = data?.user?.id;
	const defaultValues = initialData
		? initialData
		: {
			name: "",
			description: "",
			creatorId: loguedUserId,
			address: "",
			arrivalInfo: "",
			capacity: 1,
			duration: 60,
		};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SaveNewEvent>({
		resolver: zodResolver(saveNewEventSchema),
		defaultValues,
	});

	const [isActive, setIsActive] = useState<boolean>(false);
	const router = useRouter();

	const onSubmit = async (data: SaveNewEvent) => {
		const createData = saveNewEventSchema.parse(data);
		console.log("botao clicado", createData);
		console.log("botao clicado", data);
		const create = {
			creatorId: loguedUserId as string,
			name: data.name,
			description: data.description,
			duration: Number(data.duration),
			locationType: data.locationType,
			address: data.andress,
			capacity: Number(data.capacity),
			arrivalInfo: data.arrivalInfo,
		}
		try {
			if (initialData) {
				const update = {
					id: initialData.id as string,
					creatorId: loguedUserId as string,
					name: data.name,
					description: data.description,
					duration: Number(data.duration),
					locationType: data.locationType,
					address: data.andress,
					capacity: Number(data.capacity),
					arrivalInfo: data.arrivalInfo,
				}
				console.log("veio data", initialData);
				const res = await editEvent(update.id, update);
				console.log("resupdate", res);
			} else {
				const res = await createEvent(create);
				console.log("Resposta do servidor:", res);
			}
			router.push("/dashboard");
			reset();
		} catch (error) {
			console.error(
				"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos."
			);
		}
	};

	return (
		<Card className="flex max-w-96 w-full p-4 flex-col gap-3 border-[1px]">
			<h1 className="text-2xl font-semibold">{!initialData ? "Criar Novo Evento" : "Editar Evento"}</h1>
			<Separator orientation="horizontal" />
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
							{durationOptions.map((option) => (
								<SelectItem key={option.value} value={option.value.toString()}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.duration && (
						<p className="text-red-500 text-xs">{errors.duration.message}</p>
					)}
				</label>
				<label>
					<span>Local.</span>
					<Select
						onValueChange={(ev) => {
							if (ev !== "PRESENCIAL") {
								setEventLocation(ev);
								setIsActive(false);
							} else {
								setIsActive(true);
							}
						}}
						{...register("locationType")}
						defaultValue="ZOOM"
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="30 min" />
						</SelectTrigger>
						<SelectContent>
							{Object.values(Locations).map((location) => (
								<SelectItem key={location} value={location}>
									{location}
								</SelectItem>
							))}
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
								{...register("arrivalInfo")}
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
				<Separator orientation="horizontal" />
				{/* <div className="flex gap-3 items-center justify-between"> */}
				<Button type="submit" size={"lg"} className="text-white flex gap-2">
					{initialData ? "Editar" : "Criar"} <ArrowRight width={20} />
				</Button>
				{/* </div> */}
			</form>
		</Card>
	);
}
