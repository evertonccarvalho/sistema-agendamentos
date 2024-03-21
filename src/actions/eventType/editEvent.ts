'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface SaveBookingParams {
    id: string;
    name: string;
    description: string;
    creatorId: string;
}

export const saveBooking = async (params: SaveBookingParams) => {
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
            },
        });
    } else {
        // Se o evento não existir, crie um novo evento
        await db.eventType.create({
            data: {
                name: params.name,
                description: params.description,
                creatorId: params.creatorId,
            },
        });
    }

    // Revalida a página do dashboard após a edição ou criação do evento
    revalidatePath('/dashboard');
};
