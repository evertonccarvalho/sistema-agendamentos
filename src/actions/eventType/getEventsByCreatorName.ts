"use server"

import { db } from '@/lib/prisma';

export const getEventsByCreatorName = async (creatorName: string) => {
  try {
    const events = await db.eventType.findMany({
      where: {
        creator: {
          email: {
            startsWith: `${creatorName}@`
          }
        },
        active: true,
      },
      include: {
        creator: {
          select: {
            name: true
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
