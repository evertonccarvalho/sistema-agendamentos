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
			weekDay: referenceDate.day(), // Corrigido para .day() em vez de .get("day")
		},
		include: {
			intervals: true, // Incluir os intervalos de disponibilidade
		},
	});

	if (!userAvailability) {
		return { possibleTimes: [], availableTimes: [] };
	}

	// Obter os intervalos disponíveis
	const availableIntervals = userAvailability.intervals;

	if (availableIntervals.length === 0) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const possibleTimes: number[] = [];

	// Preencher possibleTimes com base nos intervalos disponíveis
	availableIntervals.forEach((interval) => {
		const startHour = Math.floor(interval.startTime / 60); // Hora de início
		const endHour = Math.floor(interval.endTime / 60); // Hora de término

		for (let hour = startHour; hour < endHour; hour++) {
			possibleTimes.push(hour);
		}
	});

	const blockedTimes = await db.scheduling.findMany({
		select: {
			date: true,
		},
		where: {
			userId: user.id,
			date: {
				gte: referenceDate.startOf("day").toDate(), // Começo do dia
				lte: referenceDate.endOf("day").toDate(), // Fim do dia
			},
		},
	});

	const availableTimes = possibleTimes.filter((time) => {
		const isTimeBlocked = blockedTimes.some(
			(blockedTime) => dayjs(blockedTime.date).utc().hour() === time
		);

		const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

		return !isTimeBlocked && !isTimeInPast;
	});

	return { possibleTimes, availableTimes };
};
