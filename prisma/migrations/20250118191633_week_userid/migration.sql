/*
  Warnings:

  - The primary key for the `Availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `availabilityId` on the `AvailabilityInterval` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AvailabilityInterval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekDay` to the `AvailabilityInterval` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvailabilityInterval" DROP CONSTRAINT "AvailabilityInterval_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Availability_pkey" PRIMARY KEY ("userId", "weekDay");

-- AlterTable
ALTER TABLE "AvailabilityInterval" DROP COLUMN "availabilityId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "weekDay" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AvailabilityInterval" ADD CONSTRAINT "AvailabilityInterval_userId_weekDay_fkey" FOREIGN KEY ("userId", "weekDay") REFERENCES "Availability"("userId", "weekDay") ON DELETE CASCADE ON UPDATE CASCADE;
