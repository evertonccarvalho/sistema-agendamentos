'use server';
import { db } from '@/lib/prisma';
import { getWeekDays } from '@/utils/getWeekDay';
import { auth } from '../../lib/auth';

export interface CreateAvailabilityParams {
	availabilityInterval: {
		startTime: number;
		endTime: number;
	};
	weekDay: number;
	enabled: boolean;
}

const weekDays = getWeekDays();

export const createAvailability = async (params: CreateAvailabilityParams) => {
	const session = await auth();
	if (!session?.user.id) {
		return {
			success: false,
			message: 'Usuário não autenticado.',
		};
	}

	try {
		// Criação da disponibilidade
		await db.availability.create({
			data: {
				weekDay: params.weekDay,
				userId: session.user.id,
			},
		});

		return {
			success: true,
			message: 'Disponibilidade criada com sucesso.',
		};
	} catch (error) {
		console.error('Erro ao criar disponibilidade:', error);
		return {
			success: false,
			message: 'Erro ao criar disponibilidade.',
		};
	}
};
