"use server"

import { db } from "@/lib/prisma";
import type { LocationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface EditEventParams {
    id?: string;
    name: string;
    description?: string;
    creatorId: string;
    duration: number;
    locationType?: LocationType;
    address?: string;
    capacity?: number;
    arrivalInfo?: string;
}

export const editEvent = async (eventId: string, params: EditEventParams,) => {
    try {
        // Verifica se o evento já existe no banco de dados
        const existingEvent = await db.eventType.findUnique({
            where: {
                id: eventId
            },
        });

        if (existingEvent) {
            // Se o evento existir, atualize-o com os novos dados
            await db.eventType.update({
                where: {
                    id: eventId
                },
                data: {
                    name: params.name,
                    description: params.description,
                    creatorId: params.creatorId,
                    locationType: params.locationType,
                    address: params.address,
                    capacity: params.capacity,
                    arrivalInfo: params.arrivalInfo,
                    duration: params.duration
                },
            });
        } else {
            throw new Error(`Evento com ID ${eventId} não encontrado.`);
        }

        revalidatePath("/dashboard");
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao editar o evento: ${error.message}`);
        }
    }
};
