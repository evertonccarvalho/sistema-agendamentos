import { db } from "@/lib/prisma";
import { auth } from "../../../auth";
import type { UserSubscription } from "@prisma/client";

export const checkSubscriptionTimeExpires =
  async (): Promise<UserSubscription | null> => {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const userId = session.user.id;

    if (!userId) {
      return null; // Handle the case when userId is missing
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: userId,
      },

    });

    if (!userSubscription) {
      return null;
    }

    return userSubscription;
  };
