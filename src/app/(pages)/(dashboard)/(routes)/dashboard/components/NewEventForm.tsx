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
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useState } from "react";
import { createEvent } from "@/actions/eventType/saveEvent";
import { useRouter } from "next/navigation";
import { editEvent } from "@/actions/eventType/editEvent";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ProModal } from "@/components/ProModal";
import type { EventType } from "@prisma/client";
import { Form, FormField } from "@/components/ui/form";

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
	// id: z.string().optional(),
	// creatorId: z.string(),
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),
	description: z
		.string()
		.min(5, "Descrição do evento deve ter no mínimo 5 caracteres."),
	duration: z.coerce.number().default(30),
	active: z.boolean().default(true),
	locationType: z.enum(["ZOOM", "PHONE_CALL", "PRESENCIAL"]).nullable(),
	address: z.string().nullable(),

	capacity: z.coerce.number().nullable().default(1),
	arrivalInfo: z.string().nullable(),
});
const updateEventSchema = z.object({
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),
	description: z
		.string()
		.min(5, "Descrição do evento deve ter no mínimo 5 caracteres."),
	duration: z.coerce.number().default(30),
	active: z.boolean().default(true),
	locationType: z.enum(["ZOOM", "PHONE_CALL", "PRESENCIAL"]).nullable(),
	address: z.string().nullable(),

	capacity: z.coerce.number().nullable().default(1),
	arrivalInfo: z.string().nullable(),
});

export type SaveNewEvent = z.infer<typeof saveNewEventSchema>;

interface INewEventDataProps {
	setEventName: Dispatch<SetStateAction<string | undefined>>;
	setEventDuration: Dispatch<SetStateAction<string | undefined>>;
	setEventLocation: Dispatch<SetStateAction<string | undefined>>;
	initialData?: EventType;
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
	const USER_ID = data?.user?.id;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const defaultValues = initialData
		? initialData
		: {
				name: "",
				description: "",
				creatorId: USER_ID,
				locationType: Locations.ZOOM,
				address: "",
				arrivalInfo: "",
				capacity: 1,
				duration: 30,
		  };

	const form = useForm<SaveNewEvent>({
		resolver: zodResolver(saveNewEventSchema),
		defaultValues,
	});

	const [isActive, setIsActive] = useState<boolean>(false);
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const onSubmit = async (data: SaveNewEvent) => {
		setIsSubmitting(true);
		const FORM_DATA = saveNewEventSchema.parse(data);
		console.log("valores recebidos do form", data);

		const create = {
			name: data.name,
			description: data.description,
			duration: Number(data.duration),
			locationType: data.locationType,
			address: data.address,
			capacity: Number(data.capacity),
			arrivalInfo: data.arrivalInfo,
			active: true,
		};

		try {
			if (initialData) {
				const res = await editEvent(
					initialData.id,
					initialData.creatorId,
					FORM_DATA
				);
				res && toast.success("Evento editado com sucesso!");
				res && router.push("/dashboard");
			} else {
				const res = await createEvent(create, USER_ID as string);
				if (
					res &&
					"error" in res &&
					res.error === "Período de teste gratuito expirou"
				) {
					setOpen(true);
				} else {
					form.reset();
					res && toast.success("Evento criado com sucesso!");
					console.log("dados do formulario", create);
					router.push("/dashboard");
				}
			}
		} catch (error) {
			console.error(
				"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos."
			);
		}
	};

	return (
		<>
			<ProModal isOpen={open} onClose={() => setOpen(false)} />
			<Card className="flex max-w-96 w-full p-4 flex-col gap-3 border-[1px]">
				<h1 className="text-2xl font-semibold">
					{!initialData ? "Criar Novo Evento" : "Editar Evento"}
				</h1>
				<Separator orientation="horizontal" />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						<label>
							<span>Nome do Evento.</span>
							<Input
								type="text"
								{...form.register("name")}
								onChange={(ev) => setEventName(ev.target.value)}
								placeholder="Ex. Aulas de Violão"
							/>
							{form.formState.errors.name && (
								<p className="text-red-500 text-xs">
									{form.formState.errors.name.message}
								</p>
							)}
						</label>
						<label>
							<span>Duração.</span>
							<FormField
								control={form.control}
								name="duration"
								render={({ field }) => (
									<Select
										onValueChange={(ev) => {
											field.onChange(ev);
											setEventDuration(ev);
										}}
										defaultValue={field.value.toString()}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="30 min" />
										</SelectTrigger>
										<SelectContent>
											{durationOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value.toString()}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							{form.formState.errors.duration && (
								<p className="text-red-500 text-xs">
									{form.formState.errors.duration.message}
								</p>
							)}
						</label>
						<label>
							<span>Local.</span>
							<FormField control={form.control} name="locationType" render={({field})=>(
								<Select
								onValueChange={(ev) => {
									field.onChange(ev);
									if (ev !== "PRESENCIAL") {
										setEventLocation(ev);
										setIsActive(false);
									} else {
										setIsActive(true);
									}
								}}
								defaultValue={field.value?.toString()}
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
							)}/>
						</label>
						{isActive && (
							<>
								<label>
									<span>Endereço.</span>
									<Input
										{...form.register("address")}
										onChange={(ev) => setEventLocation(ev.target.value)}
										type="text"
										placeholder="Ex. Rua dos Bobos, 0"
									/>
									{form.formState.errors.address && (
										<p className="text-red-500 text-xs">
											{form.formState.errors.address.message}
										</p>
									)}
								</label>
								<label>
									<span>Ponto de referência</span>
									<Input
										{...form.register("arrivalInfo")}
										type="text"
										placeholder="Ex. Próximo a padaria."
									/>
								</label>
								<label>
									<span>Capacidade.</span>
									<Input
										{...form.register("capacity")}
										type="number"
										min={1}
										placeholder="Ex. 10"
									/>
									{form.formState.errors.capacity && (
										<p className="text-red-500 text-xs">
											{form.formState.errors.capacity.message}
										</p>
									)}
								</label>
							</>
						)}
						<label>
							<span>Descrição.</span>
							<Textarea
								{...form.register("description")}
								placeholder="Ex. Marque reuniões comigo..."
							/>
							{form.formState.errors.description && (
								<p className="text-red-500 text-xs">
									{form.formState.errors.description.message}
								</p>
							)}
						</label>
						<Separator orientation="horizontal" />
						{/* <div className="flex gap-3 items-center justify-between"> */}
						<Button
							disabled={isSubmitting}
							type="submit"
							size={"lg"}
							className="text-white flex gap-2"
						>
							{isSubmitting ? (
								<>
									<span className="hidden">Submitting...</span>
									<Loader2 className="animate-spin w-5 h-5 mr-3" />
								</>
							) : (
								<>
									{initialData ? "Editar" : "Criar"}
									<ArrowRight width={20} />
								</>
							)}
						</Button>
						{/* </div> */}
					</form>
				</Form>
			</Card>
		</>
	);
}
