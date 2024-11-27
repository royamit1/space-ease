-- CreateIndex
CREATE INDEX "ActiveRent_userId_idx" ON "ActiveRent"("userId");

-- CreateIndex
CREATE INDEX "ActiveRent_parkingSpotId_idx" ON "ActiveRent"("parkingSpotId");

-- CreateIndex
CREATE INDEX "ParkingImage_parkingSpotId_idx" ON "ParkingImage"("parkingSpotId");

-- CreateIndex
CREATE INDEX "ParkingSpot_startTime_endTime_idx" ON "ParkingSpot"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "ParkingSpot_hourlyRate_idx" ON "ParkingSpot"("hourlyRate");

-- CreateIndex
CREATE INDEX "ParkingSpot_userId_idx" ON "ParkingSpot"("userId");

-- CreateIndex
CREATE INDEX "ParkingSpot_latitude_longitude_idx" ON "ParkingSpot"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "RentalHistory_userId_idx" ON "RentalHistory"("userId");
