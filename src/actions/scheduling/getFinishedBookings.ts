"use server";

import { db } from "@/lib/prisma";

export const getFinishedBookings = async (userId: string,) => {
	const schedulings = await db.scheduling.findMany({
		where: {
			userId: userId,
			OR: [
				{
					status: "FINISHED",
				},
				{
					date: {
						lt: new Date(),
					},
				},
			],
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
		},
		orderBy: {
			date: 'desc'
		}
	});

	return schedulings;
};
