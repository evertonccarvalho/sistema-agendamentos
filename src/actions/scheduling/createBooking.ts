"use server";
import { db } from "@/lib/prisma";
import type { SchedulingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateBookingParams {
	name: string;
	email: string;
	phone: string;
	message: string;
	status?: SchedulingStatus;
	userId: string;
	eventId: string;
	date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
	console.log("params", params);
	try {
		await db.scheduling.create({
			data: {
				name: params.name,
				email: params.email,
				phone: params.phone,
				message: params.message,
				status: params.status || "PENDING", // Se o status for fornecido, use-o; caso contrário, "PENDING"
				userId: params.userId,
				eventId: params.eventId,
				date: params.date,
			},
		});
		console.log(params);
		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Error creating booking:", error);
		throw new Error("Failed to create booking");
	}
};
