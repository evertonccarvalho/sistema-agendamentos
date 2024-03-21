"use server"

import { db } from "@/lib/prisma";
import type { LocationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateEventParams {
	name: string;
	description: string;
	creatorId: string;
	locationType?: LocationType;
	address?: string;
	capacity?: number;
	arrivalInfo?: string;
}

export const createEvent = async (params: CreateEventParams) => {
	try {
		await db.eventType.create({
			data: {
				name: params.name,
				description: params.description,
				creatorId: params.creatorId,
				locationType: params.locationType,
				address: params.address,
				capacity: params.capacity,
				arrivalInfo: params.arrivalInfo,
			},
		});

		revalidatePath("/dashboard");
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Erro ao editar o evento: ${error.message}`);
		}
	}
};
