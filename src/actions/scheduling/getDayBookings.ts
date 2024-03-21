'use server';

import { db } from '@/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

export const getDayBookings = async (userId: string, date: Date) => {
	const schedulings = await db.scheduling.findMany({
		where: {
			userId: userId,
			date: {
				lte: endOfDay(date),
				gte: startOfDay(date),
			},
		},
	});

	return schedulings;
};
