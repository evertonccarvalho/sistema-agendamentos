"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAvailabilityInterval = async (intervalId: string) => {
	const session = await auth();

	if (!session?.user.id) {
		return {
			success: false,
			message: "Usuário não autenticado.",
		};
	}

	try {
		await db.availabilityInterval.delete({
			where: {
				id: intervalId, // Usando o ID para encontrar o intervalo
			},
		});

		revalidatePath("/availability");
		return { success: true, message: "Disponibilidade removida com sucesso." };
	} catch (error) {
		console.error("Erro ao remover disponibilidade:", error);
		return {
			success: false,
			message: "Erro ao remover disponibilidade.",
		};
	}
};
