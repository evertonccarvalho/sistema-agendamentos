"use server";

import { db } from "@/lib/prisma";

export const getAvailabilitysActive = async (userId: string,) => {
	const availabilitys = await db.availability.findMany({
		where: {
			userId: userId,
			enabled: true
		},
	});

	return availabilitys;
};
