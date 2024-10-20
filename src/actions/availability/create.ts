"use server";
import { db } from "@/lib/prisma";
// Removed unused import
import { auth } from "../../lib/auth";

export interface CreateAvailabilityParams {
	availabilityInterval: {
		id?: string; // Added optional id property
		startTime: number;
		endTime: number;
	};
	weekDay: number;
	enabled: boolean;
}

export const createAvailability = async (params: CreateAvailabilityParams) => {
	const session = await auth();
	console.log("params", params);
	if (!session?.user.id) {
		return {
			success: false,
			message: "Usuário não autenticado.",
		};
	}

	try {
		// Tente encontrar uma disponibilidade existente para o mesmo dia da semana e usuário
		const existingAvailability = await db.availability.findFirst({
			where: {
				weekDay: params.weekDay,
				userId: session.user.id,
			},
		});

		if (existingAvailability) {
			// Se uma disponibilidade existente for encontrada, atualize-a
			await db.availability.update({
				where: { id: existingAvailability.id },
				data: {
					enabled: params.enabled,
					intervals: {
						upsert: {
							where: {
								id: params.availabilityInterval.id, // Supondo que você tenha um ID único para o intervalo
							},
							create: {
								startTime: params.availabilityInterval.startTime,
								endTime: params.availabilityInterval.endTime,
							},
							update: {
								startTime: params.availabilityInterval.startTime,
								endTime: params.availabilityInterval.endTime,
							},
						},
					},
				},
			});
			return {
				success: true,
				message: "Disponibilidade atualizada com sucesso.",
			};
		}

		await db.availability.create({
			data: {
				weekDay: params.weekDay,
				intervals: {
					create: {
						startTime: params.availabilityInterval.startTime,
						endTime: params.availabilityInterval.endTime,
					},
				},
				enabled: params.enabled,
				userId: session.user.id,
			},
		});

		return { success: true, message: "Disponibilidade criada com sucesso." };
	} catch (error) {
		console.error("Erro ao criar ou atualizar disponibilidade:", error);
		return {
			success: false,
			message: "Erro ao criar ou atualizar disponibilidade.",
		};
	}
};
