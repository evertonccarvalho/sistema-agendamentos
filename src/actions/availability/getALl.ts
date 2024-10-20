import { db } from "@/lib/prisma";
import dayjs from "dayjs";

export const getALLAvailabilitysPerDay = async (userId: string) => {
	const currentDate = dayjs();

	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const referenceDate = currentDate; // Manter a data atual
	const isPastDate = referenceDate.endOf("day").isBefore(new Date());

	if (isPastDate) {
		return { possibleTimes: [], availableTimes: [] };
	}

	const userAvailability = await db.availability.findFirst({
		where: {
			userId: user.id,
			weekDay: referenceDate.get("day"),
		},
		include: {
			intervals: true, // Incluindo os intervalos de disponibilidade
		},
	});

	if (!userAvailability) {
		return { possibleTimes: [], availableTimes: [] };
	}

	// Variável para armazenar os horários possíveis
	let possibleTimes: number[] = [];
	let blockedTimes: { date: Date }[] = [];

	// Iterar sobre os intervalos de disponibilidade
	for (const interval of userAvailability.intervals) {
		const startHour = Math.floor(interval.startTime / 60); // Convertendo para horas
		const endHour = Math.floor(interval.endTime / 60);

		// Criando os possíveis horários
		const times = Array.from(
			{ length: endHour - startHour },
			(_, i) => startHour + i
		);
		possibleTimes = possibleTimes.concat(times);
	}

	// Consultando os horários bloqueados
	blockedTimes = await db.scheduling.findMany({
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

	const availableTimes = possibleTimes.filter((time) => {
		const isTimeBlocked = blockedTimes.some(
			(blockedTime) => blockedTime.date.getHours() === time
		);

		const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

		return !isTimeBlocked && !isTimeInPast;
	});

	return { possibleTimes, availableTimes };
};
