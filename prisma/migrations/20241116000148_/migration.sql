/*
  Warnings:

  - You are about to alter the column `hourlyRate` on the `ActiveRent` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `hourlyRate` on the `ParkingSpot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `totalCost` on the `RentalHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "ActiveRent" ALTER COLUMN "hourlyRate" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ParkingSpot" ALTER COLUMN "hourlyRate" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RentalHistory" ALTER COLUMN "totalCost" SET DATA TYPE DOUBLE PRECISION;
