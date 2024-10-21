import { getALLAvailabilitysPerDay } from "@/actions/availability/getALl";
import {
	GetAvailabilityPerDayParams,
	getAvailabilitysPerDay,
} from "@/actions/availability/getAvailabilitysPerDay";

export async function getTimePerDate(params: GetAvailabilityPerDayParams) {
	try {
		const res = await getAvailabilitysPerDay(params);

		return res;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Failed to fetch availability for the given date.");
	}
}

export async function getAllAvailabilitys(userId: string) {
	try {
		const res = await getALLAvailabilitysPerDay(userId);
		console.log("RESSSSS", res);
		return res;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Failed to fetch availability for the given date.");
	}
}
