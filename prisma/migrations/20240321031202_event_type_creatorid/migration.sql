/*
  Warnings:

  - Added the required column `creatorId` to the `EventType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventType" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "EventType_creatorId_idx" ON "EventType"("creatorId");

-- AddForeignKey
ALTER TABLE "EventType" ADD CONSTRAINT "EventType_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
