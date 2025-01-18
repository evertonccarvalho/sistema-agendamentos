'use server';

import { db } from '@/lib/prisma';

export const getAvailabilitys = async (userId: string) => {
	// Busca as disponibilidades existentes
	let availabilitys = await db.availability.findMany({
		where: {
			userId: userId,
		},
		include: {
			intervals: true,
		},
		orderBy: {
			weekDay: 'asc',
		},
	});

	if (!availabilitys || availabilitys.length === 0) {
		const weekDays = [0, 1, 2, 3, 4, 5, 6];

		const availabilityData = weekDays.map((day) => ({
			weekDay: day,
			userId,
		}));

		await db.availability.createMany({
			data: availabilityData,
		});

		availabilitys = await db.availability.findMany({
			where: {
				userId: userId,
			},
			include: {
				intervals: true,
			},
			orderBy: {
				weekDay: 'asc',
			},
		});
	}

	// Retorna as disponibilidades
	return availabilitys;
};

export interface AvailabilityInterval {
	startTime: number;
	endTime: number;
	id: string;
	weekDay: number;
}
export interface AvailabilityModel {
	weekDay: number;
	intervals: AvailabilityInterval[];
	enabled: boolean;
}
