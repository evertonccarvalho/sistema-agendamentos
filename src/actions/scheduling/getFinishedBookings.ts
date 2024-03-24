"use server";

import { db } from "@/lib/prisma";

export const getFinishedBookings = async (userId: string,) => {
	const schedulings = await db.scheduling.findMany({
		where: {
			userId: userId,
			date: {
				lt: new Date()
			}
		},
		include: {
			eventType: true,
			user: {
				select: {
					name: true,
					email: true,
					image: true,
				}
			}
		}
	});

	return schedulings;
};
