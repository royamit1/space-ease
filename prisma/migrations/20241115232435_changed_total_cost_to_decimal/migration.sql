/*
  Warnings:

  - You are about to alter the column `totalCost` on the `RentalHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "RentalHistory" ALTER COLUMN "totalCost" SET DATA TYPE DECIMAL(65,30);
