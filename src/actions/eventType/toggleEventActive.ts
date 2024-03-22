"use server"
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleEventTypeActive = async (userId: string, eventId: string, setActive: boolean) => {
  if (setActive) {
    // Desmarcar o ativo anterior (se houver)
    await db.eventType.updateMany({
      where: {
        creatorId: userId,
        id: eventId,
        active: true,
      },
      data: {
        active: false,
      },
    });
  }

  // Definir ou remover
  await db.eventType.update({
    where: {
      id: eventId,
    },
    data: {
      active: setActive,
    },
  });
  revalidatePath('/dashboard');

}