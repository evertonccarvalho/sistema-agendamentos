"use server";
import { db } from "@/lib/prisma";

export const getWeekDaysAvailability = async (userId: string) => {
	const availabilitys = await db.availability.findMany({
		where: {
			userId: userId,
			enabled: true
		},
		select: {
			weekDay: true,
		},
	});

	return availabilitys.map(weekdays => weekdays.weekDay);
};
