"use server";

import { db } from "@/lib/prisma";
import type { $Enums } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { checkEventTypeLimit } from "../subscription/apiLimit";
import { checkSubscription } from "../subscription/subscription";

interface CreateEventParams {
	name: string;
	description: string;
	active: boolean;
	duration: number;
	locationType: $Enums.LocationType | null;
	address: string | null;
	capacity: number | null;
	arrivalInfo: string | null;
}

export const createEvent = async (params: CreateEventParams, userId: string) => {
	try {
		const freeTrial = await checkEventTypeLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return {
				error: "Período de teste gratuito expirou",
			};
		}

		if (freeTrial || isPro) {
			const create = await db.eventType.create({
				data: {
					name: params.name,
					description: params.description,
					creatorId: userId,
					locationType: params.locationType,
					address: params.address,
					arrivalInfo: params.arrivalInfo,
					capacity: Number(params.capacity),
					duration: Number(params.duration),
				},
			});

			revalidatePath("/dashboard");

			return create;
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Erro ao criar o evento: ${error.message}`);
		}
		throw error;
	}
};
