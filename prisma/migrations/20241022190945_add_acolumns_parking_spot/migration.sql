/*
  Warnings:

  - Added the required column `createdAt` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSpot" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
