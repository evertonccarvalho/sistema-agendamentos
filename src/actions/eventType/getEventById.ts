"use server"

import { db } from '@/lib/prisma';

export const getEventsById = async (eventId: string) => {
  try {
    const events = await db.eventType.findUnique({
      where: {
        id: eventId,
      },
    });

    return events;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Erro ao buscar os eventos: ${error.message}`);
  }
};
