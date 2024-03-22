"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { createEvent } from "@/actions/eventType/saveEvent";
import { editEvent } from "@/actions/eventType/editEvent";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


enum Locations {
	ZOOM = "ZOOM",
	PHONE_CALL = "PHONE_CALL",
	PRESENCIAL = "PRESENCIAL",
}

const durationOptions = [
	{ value: 15, label: "15 minutos" },
	{ value: 30, label: "30 minutos" },
	{ value: 45, label: "45 minutos" },
	{ value: 60, label: "1 hora" },
	{ value: 90, label: "1 hora e 30 minutos" },
	{ value: 120, label: "2 horas" },
];

const newEventSchema = z.object({
	id: z.string().optional(),
	creatorId: z.string(), // Assume-se que o ID do criador é uma string
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),

	description: z.string(),
	duration: z.coerce.number().default(60),
	active: z.boolean().default(true), //,
	locationType: z.any(), // Campo para o tipo de localização
	address: z.string().optional(), // Endereço do evento presencial
	capacity: z.coerce.number().int().positive().optional(), // Capacidade máxima de participantes
	arrivalInfo: z.string().optional(), // Instruções de chegada
});

const updateEventSchema = z.object({
	id: z.string(),
	creatorId: z.string(), // Assume-se que o ID do criador é uma string
	name: z.string().min(5, "Nome do evento deve ter no mínimo 5 caracteres."),

	description: z.string(),
	duration: z.coerce.number().default(60),
	active: z.boolean().default(true), //,
	locationType: z.any(), // Campo para o tipo de localização
	address: z.string().optional(), // Endereço do evento presencial
	capacity: z.coerce.number().int().positive().optional(), // Capacidade máxima de participantes
	arrivalInfo: z.string().optional(), // Instruções de chegada
});


export type EventInitalData = z.infer<typeof updateEventSchema>;
export type EventFormValues = z.infer<typeof newEventSchema>;

interface EventFormProps {
	initialData: EventInitalData | null;
}

export const EventForm: React.FC<EventFormProps> = ({ initialData }) => {
	const [loading, setLoading] = useState(false);
	const { data } = useSession()
	const loguedUserId = data?.user?.id
	const title = initialData ? "Editar Evento" : "Criar Evento";
	const description = initialData
		? "Editar o evento."
		: "Adicionar novo evento";
	const toastMessage = initialData ? "Evento Atualizado." : "Evento Criado.";
	const action = initialData ? "Salvar Alterações" : "Criar";
	const [formData, setFormData] = useState<EventFormValues | null>(null); // Armazena os dados do formulário localmente
	const router = useRouter()
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

	const form = useForm<EventFormValues>({
		resolver: zodResolver(newEventSchema),
		defaultValues,
	});

	const onSubmit = async (data: z.infer<typeof newEventSchema>) => {
		const createData = newEventSchema.parse(data);
		console.log("botao clicado", createData);
		try {
			setLoading(true);
			if (initialData) {
				const updateData = updateEventSchema.parse(data);
				console.log('veio data', initialData);
				const res = await editEvent(initialData.id, updateData);
				console.log("resupdate", res);
			} else {
				const res = await createEvent(createData);
				console.log("Resposta do servidor:", res);
			}
			// toast.success(`${toastMessage}`);
			router.push('/dashboard')
			form.reset();
		} catch (error) {
			console.error(
				"Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<section className="flex w-96 p-4 rounded-md flex-col gap-3 border-[1px] border-zinc-700 max-[1135px]:w-full">
				<h1 className="text-2xl font-semibold">Criar Novo Evento</h1>
				<Separator orientation="horizontal" className="bg-zinc-700" />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
						<div className="flex gap-2 flex-col">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome do Evento.</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="Nome do evento"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descrição do evento</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder="Descrição do evento"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="duration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Duração</FormLabel>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={
												field.value !== undefined
													? field.value.toString()
													: "30"
											}
											defaultValue={
												field.value !== undefined
													? field.value.toString()
													: "30"
											}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value ? field.value.toString() : ""
														}
														placeholder="Selecione a Duração"
													/>
												</SelectTrigger>
											</FormControl>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="locationType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Local</FormLabel>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value ? field.value.toString() : ""}
											defaultValue={field.value ? field.value.toString() : ""}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value ? field.value.toString() : ""
														}
														placeholder="Selecione o Local"
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Locations).map((location) => (
													<SelectItem key={location} value={location}>
														{location}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div>
								{form.watch("locationType") === "PRESENCIAL" && (
									<>
										<FormField
											control={form.control}
											name="address"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Endereço</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															placeholder="Endereço"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="arrivalInfo"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Instruções</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															placeholder="Instruções"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="capacity"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Capacidade</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															type="number"
															placeholder="Participantes"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}
							</div>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="btn rounded-full  min-w-[180px] border border-white/50 max-w-[220px] px-8 transition-all  flex  justify-center duration-300 items-center overflow-hidden hover:border-accent group"
						>
							{loading ? (
								<>
									<span className="hidden">Submitting...</span>
									<Loader2 className="animate-spin w-5 h-5 mr-3" />
								</>
							) : (
								<>
									<span className="group-hover:-traslate-y-[120%] group-hover:opacity-0 transition-all duration-500 ">
										{action}
									</span>
									<ArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
								</>
							)}
						</Button>
					</form>
				</Form>
			</section>
		</>
	);
};
