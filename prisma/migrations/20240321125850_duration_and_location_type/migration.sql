-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ZOOM', 'PHONE_CALL', 'PRESENCIAL');

-- AlterTable
ALTER TABLE "EventType" ADD COLUMN     "address" TEXT,
ADD COLUMN     "arrivalInfo" TEXT,
ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "locationType" "LocationType";
