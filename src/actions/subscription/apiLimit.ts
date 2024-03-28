"use server"

import { MAX_FREE_COUNTS } from "@/lib/const";
import { db } from "@/lib/prisma";
import { auth } from "../../../auth";


export const checkEventTypeLimit = async () => {
  const session = await auth();

  if (!session?.user) {
    return false;
  }

  const eventTypeCount = await db.eventType.count({
    where: {
      creatorId: session.user.id
    },
  });


  if (eventTypeCount < MAX_FREE_COUNTS) {
    return true;
  }
  return false;
};


export const getEventTypeLimit = async () => {
  const session = await auth();


  if (!session?.user) {
    return 0;
  }

  const eventTypeCount = await db.eventType.count({
    where: {
      creatorId: session.user.id
    },
  });
  if (!eventTypeCount) {
    return 0;
  }
  return eventTypeCount;
};
