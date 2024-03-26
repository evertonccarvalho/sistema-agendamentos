import { getAvailabilitysPerDay } from "@/actions/availability/getAvailabilitysPerDay";

// export function generateDayTimeList(availabilitys: Availability): string[] {
// 	// Verifique se o objeto Availability contém as informações necessárias
// 	if (
// 		!availabilitys ||
// 		typeof availabilitys.startTime !== "number" ||
// 		typeof availabilitys.endTime !== "number"
// 	) {
// 		return [];
// 	}

// 	const startHours = Math.floor(availabilitys.startTime / 60);
// 	const startMinutes = availabilitys.startTime % 60;
// 	const endHours = Math.floor(availabilitys.endTime / 60);
// 	const endMinutes = availabilitys.endTime % 60;

// 	const startTime = new Date().setHours(startHours, startMinutes, 0, 0); // Converta para objeto Date
// 	const endTime = new Date().setHours(endHours, endMinutes, 0, 0); // Converta para objeto Date
// 	console.log(startTime)
// 	const interval = 60; // intervalo em minutos
// 	const timeList: string[] = [];

// 	let currentTime = startTime;

// 	// Adicione horários à lista com intervalos de tempo
// 	while (currentTime <= endTime) {
// 		timeList.push(format(new Date(currentTime), "HH:mm"));
// 		currentTime = addMinutes(currentTime, interval);
// 	}

// 	return timeList;
// }

export async function getTimePerDate(userId: string, date: string) {
	try {
		const res = await getAvailabilitysPerDay(userId, date);
		// Faça o que deseja com o resultado aqui
		console.log("Result:", res);
		return res;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Failed to fetch availability for the given date.");
	}
}
