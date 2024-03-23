// No seu arquivo de actions.js ou onde desejar organizar suas ações:
"use server"
import { db } from "@/lib/prisma";
import type { SchedulingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateSchedulingParams {
	name: string;
	email: string;
	phone: string;
	message: string;
	status?: SchedulingStatus;
	userId: string;
	eventId: string;
	date: Date;
}

export const createScheduling = async (params: CreateSchedulingParams) => {

	await db.scheduling.create({
		data: {
			name: params.name,
			email: params.email,
			phone: params.phone,
			message: params.message,
			status: 'PENDING',
			userId: params.userId,
			eventId: params.eventId,
			date: params.date,
		},
	});
	revalidatePath("/dashboard");
};
