"use server"

import { db } from '@/lib/prisma';

export const getEventsByCreatorId = async (creatorId: string) => {
  try {
    const events = await db.eventType.findMany({
      where: {
        creatorId: creatorId,
      },
      include: {
        schedules: true,
        creator: {
          select: {
            email: true,
            name: true,
            image: true,

          }
        }
      },
    });

    return events;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Erro ao buscar os eventos: ${error.message}`);
  }
};
