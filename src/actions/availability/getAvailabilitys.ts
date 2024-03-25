"use server";

import { db } from "@/lib/prisma";

export const getAvailabilitys = async (userId: string,) => {
	const availabilitys = await db.availability.findMany({
		where: {
			userId: userId,
		},
	});

	return availabilitys;
};
