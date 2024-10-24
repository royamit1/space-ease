/*
  Warnings:

  - The primary key for the `ParkingSpot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParkingSpot_id_seq";
