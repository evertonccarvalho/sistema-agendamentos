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

  const referenceDate = dayjs(currentDate);
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return { possibleTimes: [], availableTimes: [] };
  }

  const userAvailability = await db.availability.findFirst({
    where: {
      userId: user.id,
      weekDay: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return { possibleTimes: [], availableTimes: [] };
  }

  const { startTime, endTime } = userAvailability;

  const startHour = startTime / 60;
  const endHour = endTime / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map((_, i) => {
    return startHour + i;
  });

  const blockedTimes = await db.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      userId: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("hour", endHour).toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time);

    const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

    return !isTimeBlocked && !isTimeInPast;
  });

  return { possibleTimes, availableTimes };
};
