// "use server"

// import { MAX_FREE_COUNTS } from "@/lib/const";
// import { db } from "@/lib/prisma";
// import { auth } from "../../../auth";


// export const increaseApiLmit = async () => {
// 	const session = await auth();

// 	if (!session?.user) {
// 		return null
// 	}

// 	const userId = session.user.id

// 	const userApiLimit = await db.userApiLimit.findUnique({
// 		where: {
// 			userId,
// 		},
// 	});

// 	if (userApiLimit) {
// 		await db.userApiLimit.update({
// 			where: { userId: userId },
// 			data: { count: userApiLimit.count + 1 },
// 		});
// 	} else {
// 		await db.userApiLimit.create({
// 			data: { userId: userId, count: 1 },
// 		});
// 	}
// };

// export const checkApiLimit = async () => {
// 	const { userId } = auth();
// 	if (!userId) {
// 		return false;
// 	}
// 	const userApiLimit = await db.userApiLimit.findUnique({
// 		where: { userId: userId },
// 	});
// 	if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// export const getApiLimitCount = async () => {
// 	const { userId } = auth();

// 	if (!userId) {
// 		return 0;
// 	}
// 	const userApiLimit = await db.userApiLimit.findUnique({
// 		where: {
// 			userId,
// 		},
// 	});
// 	if (!userApiLimit) {
// 		return 0;
// 	}
// 	return userApiLimit.count;
// };
