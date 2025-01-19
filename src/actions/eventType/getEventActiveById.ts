"use server";

import { db } from "@/lib/prisma";

export const getEventActiveById = async (eventId: string) => {
  try {
    const events = await db.eventType.findUnique({
      where: {
        id: eventId,
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return events;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Erro ao buscar os eventos: ${error.message}`);
  }
};
