// No seu arquivo de actions.js ou onde desejar organizar suas ações:

import { db } from "@/lib/prisma";
import type { SchedulingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateSchedulingParams {
	email: string;
	phone: string;
	message: string;
	status: SchedulingStatus;
	userId: string;
	eventId: string;
	date: Date;
}

export const createScheduling = async (params: CreateSchedulingParams) => {

	await db.scheduling.create({
		data: {
			email: params.email,
			phone: params.phone,
			message: params.message,
			status: params.status,
			userId: params.userId,
			eventId: params.eventId,
			date: params.date,
		},
	});
	revalidatePath("/dashboard");
};
