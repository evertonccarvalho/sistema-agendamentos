/*
  Warnings:

  - Added the required column `name` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scheduling" ADD COLUMN     "name" TEXT NOT NULL;
