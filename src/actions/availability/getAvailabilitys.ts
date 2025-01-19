"use server";

import { db } from "@/lib/prisma";

export interface AvailabilityInterval {
  startTime: number;
  endTime: number;
  id: string;
  weekDay: number;
}
export interface AvailabilityModel {
  weekDay: number;
  intervals: AvailabilityInterval[];
  enabled: boolean;
}

export const getAvailabilitys = async (userId: string) => {
  let availabilitys = await db.availability.findMany({
    where: {
      userId,
    },
    include: {
      intervals: true,
    },
    orderBy: {
      weekDay: "asc",
    },
  });

  if (availabilitys.length === 0) {
    await createManyAvailabilitys(userId);
    availabilitys = await db.availability.findMany({
      where: {
        userId,
      },
      include: {
        intervals: true,
      },
      orderBy: {
        weekDay: "asc",
      },
    });
  }

  return availabilitys;
};

export const createManyAvailabilitys = async (userId: string) => {
  // Busca as disponibilidades existentes
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return {
      success: false,
      message: "Usuário não autenticado.",
    };
  }

  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const availabilityData = weekDays.map((day) => ({
    weekDay: day,
    userId,
  }));

  await db.availability.createMany({
    data: availabilityData,
  });
};
