/*
  Warnings:

  - Added the required column `hourlyRate` to the `ActiveRent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveRent" ADD COLUMN     "hourlyRate" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "ParkingSpot" ALTER COLUMN "hourlyRate" SET DATA TYPE DECIMAL(65,30);
