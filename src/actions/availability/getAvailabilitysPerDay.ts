"use server";

import { db } from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const getAvailabilitysPerDay = async (
	userId: string,
	date: string | string[]
) => {
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
		return { possibleTimes: [], availableTimes: [] };
	}

	const userAvailability = await db.availability.findFirst({
		where: {
			userId: user.id,
			weekDay: referenceDate.day(),
		},
		include: {
			intervals: true,
		},
	});

	if (!userAvailability) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const availableIntervals = userAvailability.intervals;

	if (availableIntervals.length === 0) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const possibleTimes: Set<string> = new Set(); // Usar Set para evitar duplicatas

	availableIntervals.forEach((interval) => {
		const startHour = Math.floor(interval.startTime / 60);
		const endHour = Math.floor(interval.endTime / 60);

		// Incluindo endHour para garantir que ele seja adicionado
		for (let hour = startHour; hour <= endHour; hour++) {
			possibleTimes.add(convertMinutesToTimeString(hour * 60)); // Converte para "HH:mm"
		}
	});

	const blockedTimes = await db.scheduling.findMany({
		select: {
			date: true,
		},
		where: {
			userId: user.id,
			date: {
				gte: referenceDate.startOf("day").toDate(),
				lte: referenceDate.endOf("day").toDate(),
			},
		},
	});

	const availableTimes = [...possibleTimes].filter((time) => {
		const hour = parseInt(time.split(":")[0]);
		const isTimeBlocked = blockedTimes.some(
			(blockedTime) => dayjs(blockedTime.date).utc().hour() === hour
		);

		const isTimeInPast = referenceDate.set("hour", hour).isBefore(new Date());

		return !isTimeBlocked && !isTimeInPast;
	});

	return { possibleTimes: [...possibleTimes], availableTimes };
};

const convertMinutesToTimeString = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
