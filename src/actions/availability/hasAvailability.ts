"use server";
import { db } from "@/lib/prisma";

export const HasAvailability = async (userId: string) => {
  try {
    const hasAvailability = await db.availability.findFirst({
      where: {
        userId: userId,
      },
    });
    return !!hasAvailability;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao verificar disponibilidade: ${error.message}`);
    }
  }
};
