'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
// Removed unused import

export interface CreateAvailabilityIntervalParams {
	weekDay: number; // Added optional id property
	startTime: number;
	endTime: number;
}

export const createAvailabilityInterval = async (
	params: CreateAvailabilityIntervalParams
) => {
	const session = await auth();
	if (!session?.user.id) {
		return {
			success: false,
			message: 'Usuário não autenticado.',
		};
	}

	try {
		// Verifica se já existem intervalos repetidos
		const existingInterval = await db.availabilityInterval.findFirst({
			where: {
				weekDay: params.weekDay,
				startTime: params.startTime,
				endTime: params.endTime,
			},
		});

		if (existingInterval) {
			return {
				success: false,
				message: 'Intervalo já existe.',
			};
		}

		// Verifica se já existem 3 intervalos criados
		const intervalsCount = await db.availabilityInterval.count({
			where: {
				userId: session.user.id,
				weekDay: params.weekDay,
			},
		});

		if (intervalsCount >= 3) {
			return {
				success: false,
				message: 'Você só pode adicionar até 3 intervalos.',
			};
		}

		// Cria o intervalo
		await db.availabilityInterval.create({
			data: {
				startTime: params.startTime,
				endTime: params.endTime,
				userId: session.user.id,
				weekDay: params.weekDay,
			},
		});

		revalidatePath('/availability');

		return {
			success: true,
			message: 'Disponibilidade criada com sucesso.',
		};
	} catch (error) {
		console.error('Erro ao criar ou atualizar disponibilidade:', error);
		return {
			success: false,
			message: 'Erro ao criar ou atualizar disponibilidade.',
		};
	}
};
