"use server";

import { db } from "@/lib/prisma";

export const getAvailabilitys = async (userId: string) => {
	const availabilitys = await db.availability.findMany({
		where: {
			userId: userId,
		},
		include: {
			intervals: true,
		},
		orderBy: {
			weekDay: "asc", // Ordena os dias da semana de 0 (domingo) a 6 (sábado)
		},
	});

	return availabilitys;
};

interface AvailabilityInterval {
	startTime: number;
	endTime: number;
	id: string;
	availabilityId: string;
}
export interface AvailabilityModel {
	id: string;
	weekDay: number;
	intervals: AvailabilityInterval[];
	enabled: boolean;
}
