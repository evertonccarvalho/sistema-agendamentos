import { db } from '@/lib/prisma';

interface ToggleEventTypeActiveParams {
  eventTypeID: string;
}

export const toggleEventTypeActive = async ({ eventTypeID }: ToggleEventTypeActiveParams) => {
  try {
    // Busca o EventType pelo ID
    const eventType = await db.eventType.findUnique({
      where: {
        id: eventTypeID,
      },
    });

    // Se o EventType não existir, lança um erro
    if (!eventType) {
      throw new Error(`EventType com ID ${eventTypeID} não encontrado.`);
    }

    // Inverte o valor do campo 'active'
    const updatedEventType = await db.eventType.update({
      where: {
        id: eventTypeID,
      },
      data: {
        active: !eventType.active,
      },
    });

    return updatedEventType;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao alternar o status do EventType: ${error.message}`);
    }
  }
}