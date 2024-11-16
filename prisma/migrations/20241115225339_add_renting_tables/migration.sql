-- CreateTable
CREATE TABLE "ActiveRent" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingSpotId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveRent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "parkingSpotId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RentalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveRent_userId_key" ON "ActiveRent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveRent_parkingSpotId_key" ON "ActiveRent"("parkingSpotId");
