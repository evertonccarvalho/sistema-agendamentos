import { db } from "@/lib/prisma";
import type { LocationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface EditEventParams {
    id: string;
    name: string;
    description: string;
    creatorId: string;
    locationType?: LocationType;
    address?: string;
    capacity?: number;
    arrivalInfo?: string;
}

export const editEvent = async (params: EditEventParams) => {
    try {
        // Verifica se o evento já existe no banco de dados
        const existingEvent = await db.eventType.findUnique({
            where: {
                id: params.id,
            },
        });

        if (existingEvent) {
            // Se o evento existir, atualize-o com os novos dados
            await db.eventType.update({
                where: {
                    id: params.id,
                },
                data: {
                    name: params.name,
                    description: params.description,
                    locationType: params.locationType,
                    address: params.address,
                    capacity: params.capacity,
                    arrivalInfo: params.arrivalInfo,
                },
            });
        } else {
            throw new Error(`Evento com ID ${params.id} não encontrado.`);
        }

        revalidatePath("/dashboard");
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao editar o evento: ${error.message}`);
        }
    }
};
