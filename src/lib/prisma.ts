import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof db };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
