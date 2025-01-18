"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// Removed unused import

export interface CreateAvailabilityIntervalParams {
	availabilityId: string; // Added optional id property
	startTime: number;
	endTime: number;
}

export const createAvailabilityInterval = async (
	params: CreateAvailabilityIntervalParams
) => {
	const session = await auth();
	if (!session?.user.id) {
		return {
			success: false,
			message: "Usuário não autenticado.",
		};
	}

	try {
		await db.availabilityInterval.create({
			data: {
				startTime: params.startTime,
				endTime: params.endTime,
				availabilityId: params.availabilityId,
			},
		});

		revalidatePath("/availability");

		return { success: true, message: "Disponibilidade criada com sucesso." };
	} catch (error) {
		console.error("Erro ao criar ou atualizar disponibilidade:", error);
		return {
			success: false,
			message: "Erro ao criar ou atualizar disponibilidade.",
		};
	}
};
