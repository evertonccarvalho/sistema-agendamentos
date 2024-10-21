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
		const startMinute = interval.startTime % 60; // Resto para os minutos
		const endHour = Math.floor(interval.endTime / 60);
		const endMinute = interval.endTime % 60; // Resto para os minutos

		// Adiciona o horário de início se houver minutos (ex: 08:30)
		if (startMinute > 0) {
			possibleTimes.add(convertMinutesToTimeString(interval.startTime)); // Exemplo: 08:30
		}

		// Adiciona os horários inteiros
		for (let hour = startHour; hour < endHour; hour++) {
			// Apenas adiciona horários inteiros, sem incluir o horário de início se houver minutos
			if (startMinute === 0 || hour > startHour) {
				possibleTimes.add(convertMinutesToTimeString(hour * 60)); // Exemplo: 09:00, 10:00
			}
		}

		// Adiciona o horário final se não for uma hora cheia
		if (endMinute > 0) {
			possibleTimes.add(convertMinutesToTimeString(interval.endTime)); // Exemplo: 10:00
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

	console.log("blockedTimes", blockedTimes);
	// Aqui você pode definir a duração do agendamento
	const appointmentDuration = 45; // em minutos

	const availableTimes = [...possibleTimes].filter((time) => {
		const hour = parseInt(time.split(":")[0]);

		const isTimeBlocked = blockedTimes.some((blockedTime) => {
			const blockedStartHour = dayjs(blockedTime.date).utc().hour();
			return (
				hour >= blockedStartHour &&
				hour < blockedStartHour + appointmentDuration / 60
			);
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
