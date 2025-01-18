'use server';
import { db } from '@/lib/prisma';
import { auth } from '../../lib/auth';

export interface UpdateAvailabilityParams {
	weekDay: number;
	enabled: boolean;
	intervals: {
		id: string;
		startTime: number;
		endTime: number;
		weekDay: number;
	};
}

export const updateAvailability = async (params: UpdateAvailabilityParams) => {
	const session = await auth();
	if (!session?.user.id) {
		return {
			success: false,
			message: 'Usuário não autenticado.',
		};
	}

	try {
		const { intervals, weekDay, enabled } = params;

		// Verifica se a disponibilidade já existe
		const existingAvailability = await db.availability.findUnique({
			where: {
				userId_weekDay: {
					userId: session.user.id,
					weekDay,
				},
			},
		});

		if (!existingAvailability) {
			return {
				success: false,
				message: 'Disponibilidade não encontrada para atualização.',
			};
		}

		// Atualiza a disponibilidade e seus intervalos
		await db.availability.update({
			where: {
				userId_weekDay: {
					userId: session.user.id,
					weekDay,
				},
			},
			data: {
				enabled,
				intervals: {
					upsert: {
						where: {
							id: intervals.id, // Usa o ID se fornecido
							weekDay,
						},
						create: {
							startTime: intervals.startTime,
							endTime: intervals.endTime,
						},
						update: {
							startTime: intervals.startTime,
							endTime: intervals.endTime,
						},
					},
				},
			},
		});

		return {
			success: true,
			message: 'Disponibilidade atualizada com sucesso.',
		};
	} catch (error) {
		console.error('Erro ao atualizar disponibilidade:', error);
		return {
			success: false,
			message: 'Erro ao atualizar disponibilidade.',
		};
	}
};
