"use server";

import { db } from "@/lib/prisma";
import utc from "dayjs/plugin/utc";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.extend(utc);

export const getAvailabilitysPerDay = async (userId: string, date: string | string[]) => {

	if (!date) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const referenceDate = dayjs(String(date)).utc();
	const isPastDate = referenceDate.endOf("day").isBefore(new Date());

	if (isPastDate) {
		return { possibleTimes: [], availableTimes: [] }
	}

	const userAvailability = await db.availability.findFirst({
		where: {
			userId: user.id,
			weekDay: referenceDate.get("day"),
		},
	});


	if (!userAvailability) {
		return { possibleTimes: [], availableTimes: [] }
	}

	const { startTime, endTime } = userAvailability;

	const startHour = startTime / 60;
	const endHour = endTime / 60;

	const possibleTimes = Array.from({ length: endHour - startHour }).map(
		(_, i) => {
			return startHour + i;
		},
	);

	const blockedTimes = await db.scheduling.findMany({
		select: {
			date: true,
		},
		where: {
			userId: user.id,
			date: {
				gte: referenceDate.set("hour", startHour).utc().toDate(),
				lte: referenceDate.set("hour", endHour).utc().toDate(),
			},
		},
	});

	const availableTimes = possibleTimes.filter((time) => {
		const isTimeBlocked = blockedTimes.some(
			(blockedTime) => dayjs(blockedTime.date).utc().hour() === time,
		);

		const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

		return !isTimeBlocked && !isTimeInPast;
	});
	return ({ possibleTimes, availableTimes });

};
