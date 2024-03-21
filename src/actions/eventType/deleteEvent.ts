'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteEvent = async (eventId: string) => {
	await db.eventType.delete({
		where: {
			id: eventId,
		},
	});

	revalidatePath('/dashboard');
};
