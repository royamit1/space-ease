-- CreateTable
CREATE TABLE "ParkingImage" (
    "id" SERIAL NOT NULL,
    "parkingSpotId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParkingImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParkingImage" ADD CONSTRAINT "ParkingImage_parkingSpotId_fkey" FOREIGN KEY ("parkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
