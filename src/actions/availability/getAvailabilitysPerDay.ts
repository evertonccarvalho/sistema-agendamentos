"use server";

import { db } from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(utc);
dayjs.extend(isBetween);
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

	const possibleTimes: Set<string> = new Set();

	availableIntervals.forEach((interval) => {
		const startHour = Math.floor(interval.startTime / 60);
		const startMinute = interval.startTime % 60;
		const endHour = Math.floor(interval.endTime / 60);
		const endMinute = interval.endTime % 60;

		if (startMinute > 0) {
			possibleTimes.add(convertMinutesToTimeString(interval.startTime));
		}

		for (let hour = startHour; hour < endHour; hour++) {
			if (startMinute === 0 || hour > startHour) {
				possibleTimes.add(convertMinutesToTimeString(hour * 60));
			}
		}

		if (endMinute > 0) {
			possibleTimes.add(convertMinutesToTimeString(interval.endTime));
		}
	});

	const blockedTimes = await db.scheduling.findMany({
		select: {
			date: true,
			eventType: {
				select: {
					duration: true, // Obtém a duração do evento
				},
			},
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
		const minute = parseInt(time.split(":")[1]);

		const isTimeBlocked = blockedTimes.some((blockedTime) => {
			const blockedStart = dayjs(blockedTime.date).utc();
			const blockedEnd = blockedStart.add(
				blockedTime.eventType.duration,
				"minute"
			); // Bloquear o intervalo completo do evento

			const currentTime = referenceDate.set("hour", hour).set("minute", minute);

			return currentTime.isBetween(blockedStart, blockedEnd, null, "[)");
		});

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
