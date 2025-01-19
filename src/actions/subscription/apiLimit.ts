"use server";

import { MAX_FREE_COUNTS } from "@/lib/const";
import { db } from "@/lib/prisma";
import { auth } from "../../lib/auth";

export const checkEventTypeLimit = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return false;
    }

    const eventTypeCount = await db.eventType.count({
      where: {
        creatorId: session.user.id,
      },
    });

    return eventTypeCount < MAX_FREE_COUNTS;
  } catch (error) {
    console.error("Error checking event type limit:", error);
    return false;
  }
};

export const getEventTypeLimit = async () => {
  const session = await auth();

  if (!session?.user) {
    return 0;
  }

  const eventTypeCount = await db.eventType.count({
    where: {
      creatorId: session.user.id,
    },
  });
  if (!eventTypeCount) {
    return 0;
  }
  return eventTypeCount;
};
