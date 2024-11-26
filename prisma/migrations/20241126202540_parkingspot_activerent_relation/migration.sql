-- AddForeignKey
ALTER TABLE "ActiveRent" ADD CONSTRAINT "ActiveRent_parkingSpotId_fkey" FOREIGN KEY ("parkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
