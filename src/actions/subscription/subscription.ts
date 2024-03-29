"use server"
import { auth } from "../../lib/auth";
import { db } from "../../lib/prisma";


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
	const session = await auth();

	if (!session?.user) {
		return null
	}

	const userId = session.user.id

	if (!userId) {
		return false;
	}

	const userSubscription = await db.userSubscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			stripeSubscriptionId: true,
			stripeCurrentPeriodEnd: true,
			stripeCustomerId: true,
			stripePriceId: true,
		},
	});

	if (!userSubscription) {
		return false;
	}

	const isValid =
		userSubscription.stripePriceId &&
		userSubscription.stripeCurrentPeriodEnd?.getTime() || 0 + DAY_IN_MS >
		Date.now();

	return !!isValid;
};
