'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface SaveBookingParams {
	id: string;
	name: string;
	description: string;
	creatorId: string;
}

export const createEvent = async (params: SaveBookingParams) => {
	await db.eventType.create({
		data: {
			name: params.name,
			description: params.description,
			creatorId: params.creatorId
		},
	});

	revalidatePath('/dashboard');
};
