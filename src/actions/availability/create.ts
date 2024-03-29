// No seu arquivo de actions.js ou onde desejar organizar suas ações:
"use server";
import { db } from "@/lib/prisma";
import { auth } from "../../lib/auth";
export interface CreateAvailabilityParams {
	weekDay: number;
	startTime: number;
	endTime: number;
	enabled: boolean;
}

export const createAvailability = async (params: CreateAvailabilityParams) => {
	const session = await auth();

	if (!session?.user) {
		return null;
	}

	try {
		// Tente encontrar uma disponibilidade existente para o mesmo dia da semana e usuário

		const existingAvailability = await db.availability.findFirst({
			where: {
				weekDay: params.weekDay,
				userId: session.user?.id,
			},
		});

		if (existingAvailability) {
			// Se uma disponibilidade existente for encontrada, atualize-a
			await db.availability.update({
				where: { id: existingAvailability.id },
				data: {
					startTime: params.startTime,
					endTime: params.endTime,
					enabled: params.enabled,
				},
			});
			return {
				success: true,
				message: "Disponibilidade atualizada com sucesso.",
			};
		}
		// Se não houver uma disponibilidade existente, crie uma nova
		await db.availability.create({
			data: {
				weekDay: params.weekDay,
				startTime: params.startTime,
				endTime: params.endTime,
				userId: session.user?.id || '',
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
