import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleAvailabilityEnable = async (userId: string, id: string, setEnable: boolean) => {
  try {
    // Desmarcar o ativo anterior (se houver) se setEnable for true
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

    // Definir ou remover a disponibilidade
    await db.availability.update({
      where: {
        id: id,
      },
      data: {
        enabled: setEnable,
      },
    });

    // Invalidar o cache da rota '/availability'
    await revalidatePath('/availability');

    return { success: true };
  } catch (error) {
    console.error('Erro ao alternar a disponibilidade:', error);
    return { success: false, message: 'Erro ao alternar a disponibilidade' };
  }
};
