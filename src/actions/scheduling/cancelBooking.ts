'use server';
import { db } from "@/lib/prisma";

import { revalidatePath } from 'next/cache';

export const cancelBooking = async (bookingId: string, userId: string,) => {
	await db.scheduling.delete({
		where: {
			userId: userId,
			id: bookingId,
		},
	});

	revalidatePath(`/scheduledevent/${bookingId}`); // Redireciona para a página do evento agendado após a alteração do status
};
