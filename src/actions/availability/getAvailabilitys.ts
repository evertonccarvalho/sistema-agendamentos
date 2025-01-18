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

export interface DayAvailabilityInterval {
	startTime: number;
	endTime: number;
	id: string;
	availabilityId: string;
}
export interface DayAvailabilityModel {
	id: string;
	weekDay: number;
	intervals: DayAvailabilityInterval[];
	enabled: boolean;
}
