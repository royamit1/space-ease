/*
  Warnings:

  - Added the required column `address` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSpot" ADD COLUMN     "address" TEXT NOT NULL;
