"use server";
import { db } from "@/lib/prisma";
import type { SchedulingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendStatusUpdateEmail } from "../email/mail";

export const toggleBookingStatus = async (
  bookingId: string,
  userId: string,
  newStatus: SchedulingStatus,
  email: string,
  name: string,
  date: Date,
  eventType: string,
) => {
  const scheduling = await db.scheduling.findUnique({
    where: {
      id: bookingId,
      userId: userId,
    },
  });

  if (!scheduling) {
    throw new Error("Agendamento não encontrado ou não pertence ao usuário.");
  }

  await db.scheduling.update({
    where: { id: bookingId },
    data: {
      status: newStatus,
    },
  });

  const dateString: string = date.toISOString(); // Convertendo a data para string

  await sendStatusUpdateEmail(email, newStatus, name, dateString, eventType);

  revalidatePath(`/scheduledevent/${bookingId}`);
};
