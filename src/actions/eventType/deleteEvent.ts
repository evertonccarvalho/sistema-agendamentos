"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteEvent = async (eventId: string) => {
	try {

		const bookingsCount = await db.scheduling.count({
			where: {
				eventType: {
					id: eventId,
				},
			},
		});

		if (bookingsCount > 0) {
			return {
				error:
					"Este tipo de evento tem reservas associadas e não pode ser excluído.",
			};
		}

		await db.eventType.delete({
			where: {
				id: eventId,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Erro ao apagar o evento: ${error.message}`);
		}
	}

	revalidatePath("/dashboard");
};
