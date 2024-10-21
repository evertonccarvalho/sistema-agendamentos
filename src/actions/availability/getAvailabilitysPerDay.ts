"use server";

import { db } from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(utc);

export interface GetAvailabilityPerDayParams {
	userId: string;
	date: string | string[];
	eventDuration: number; // Duração do evento em minutos, valor opcional
	intervalDuration: number; // Duração dos intervalos em minutos, valor opcional
}

export const getAvailabilitysPerDay = async (
	params: GetAvailabilityPerDayParams
) => {
	const { date, userId, eventDuration, intervalDuration } = params;
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

	// Intervalo mínimo baseado na duração do evento (exemplo: 15 minutos)
	const minSlotDuration = Math.min(eventDuration, intervalDuration); // Pode ser ajustado dinamicamente

	// Converte intervalos disponíveis para horários dinâmicos com base na duração do evento
	const possibleTimes: Set<string> = new Set();

	availableIntervals.forEach((interval) => {
		let currentTime = interval.startTime;

		while (currentTime + eventDuration <= interval.endTime) {
			possibleTimes.add(convertMinutesToTimeString(currentTime));
			currentTime += minSlotDuration; // Avança dinamicamente com base na duração mínima
		}
	});

	const blockedTimes = await db.scheduling.findMany({
		select: {
			date: true,
			eventType: {
				select: {
					duration: true, // Obtém a duração de cada evento
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

	// Filtra horários disponíveis com base nos horários bloqueados
	const availableTimes = [...possibleTimes].filter((time) => {
		const [hour, minute] = time.split(":").map(Number);

		const isTimeBlocked = blockedTimes.some((blockedTime) => {
			const blockedStart = dayjs(blockedTime.date).utc();
			const blockedEnd = blockedStart.add(
				blockedTime.eventType.duration,
				"minute"
			); // Bloquear o intervalo completo do evento

			const currentTime = referenceDate.set("hour", hour).set("minute", minute);

			return currentTime.isBetween(blockedStart, blockedEnd, null, "[)");
		});

		const isTimeInPast = referenceDate
			.set("hour", hour)
			.set("minute", minute)
			.isBefore(new Date());

		return !isTimeBlocked && !isTimeInPast;
	});

	return { possibleTimes: [...possibleTimes], availableTimes };
};

const convertMinutesToTimeString = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};
