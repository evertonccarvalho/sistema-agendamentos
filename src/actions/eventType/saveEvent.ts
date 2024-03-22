"use server";

import { db } from "@/lib/prisma";
import type { LocationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateEventParams {
	name: string;
	description: string;
	creatorId: string;
	duration: number;
	locationType?: LocationType;
	address?: string;
	capacity?: number;
	arrivalInfo?: string;
}

export const createEvent = async (params: CreateEventParams) => {
	try {
		console.log("Tentativa de criar evento:", params); // Adiciona registro para verificar os parâmetros recebidos
		const capacity = params.capacity ? Number(params.capacity) : null; // Convertendo para número ou mantendo como null se não for fornecido

		await db.eventType.create({
			data: {
				name: params.name,
				description: params.description,
				creatorId: params.creatorId,
				locationType: params.locationType,
				address: params.address,
				arrivalInfo: params.arrivalInfo,
				capacity: Number(params.capacity),
				duration: Number(params.duration)
			},
		});

		revalidatePath("/dashboard");
		console.log("Evento criado com sucesso!"); // Adiciona registro para verificar se a criação foi bem-sucedida
	} catch (error) {
		console.error("Erro ao criar evento:", error); // Adiciona registro para verificar se ocorreu algum erro
		if (error instanceof Error) {
			throw new Error(`Erro ao criar o evento: ${error.message}`);
		}
	}
};
