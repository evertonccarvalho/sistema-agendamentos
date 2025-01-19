"use server"
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleAvailabilityEnable = async (userId: string, weekDay: number, setEnable: boolean) => {
  try {
    // Desmarcar todas as disponibilidades ativas do usuário, caso setEnable seja true
    if (setEnable) {
      await db.availability.updateMany({
        where: {
          userId: userId,
          enabled: true,
        },
        data: {
          enabled: false,
        },
      });
    }

    // Atualizar a disponibilidade específica (ativar/desativar)
    await db.availability.update({
      where: {
        userId_weekDay: {
          userId,
          weekDay,
        },
      },
      data: {
        enabled: setEnable,
      },
    });

    // Invalidar o cache da rota '/availability'
    revalidatePath('/availability');

    return { success: true };
  } catch (error) {
    console.error('Erro ao alternar a disponibilidade:', error);
    return { success: false, message: 'Erro ao alternar a disponibilidade' };
  }
};
