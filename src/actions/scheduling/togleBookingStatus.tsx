"use server";
import { db } from "@/lib/prisma";
import type { SchedulingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleBookingStatus = async (
  bookingId: string,
  userId: string,
  newStatus: SchedulingStatus,
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

  // revalidatePath("/");
  revalidatePath(`/scheduledevent/${bookingId}`); // Redireciona para a página do evento agendado após a alteração do status

};
