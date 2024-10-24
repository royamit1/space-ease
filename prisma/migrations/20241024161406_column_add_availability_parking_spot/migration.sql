/*
  Warnings:

  - The primary key for the `ParkingSpot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ParkingSpot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `endTime` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_pkey",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id");
