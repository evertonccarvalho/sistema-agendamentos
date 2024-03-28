"use server";

import { db } from "@/lib/prisma";
import type { $Enums, EventType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface EditEventParams {
    name: string;
    description: string;
    active: boolean;
    duration: number;
    locationType: $Enums.LocationType | null;
    address: string | null;
    capacity: number | null;
    arrivalInfo: string | null;
}

export const editEvent = async (
    eventId: string,
    userId: string,
    params: EditEventParams,
) => {
    try {
        // Verifica se o evento já existe no banco de dados
        const existingEvent = await db.eventType.findUnique({
            where: {
                id: eventId,
            },
        });
        let edited: EventType | null = null;

        if (existingEvent) {
            // Se o evento existir, atualize-o com os novos dados
            edited = await db.eventType.update({
                where: {
                    id: eventId,
                },
                data: {
                    name: params.name,
                    description: params.description,
                    creatorId: userId,
                    locationType: params.locationType,
                    address: params.address,
                    capacity: params.capacity,
                    arrivalInfo: params.arrivalInfo,
                    duration: params.duration,
                },
            });
        } else {
            throw new Error(`Evento com ID ${eventId} não encontrado.`);
        }
        revalidatePath("/dashboard");
        return edited;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Erro ao editar o evento: ${error.message}`);
        }
    }
};
