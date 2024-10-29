import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    parkingSpots: ParkingSpot[];
    setSelectedParking: (spot: ParkingSpot) => void;
}

export function ParkingList({parkingSpots, setSelectedParking}: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {parkingSpots.map((spot) => (
                    <ParkingSpotItem
                        key={spot.id}
                        spot={spot}
                        setSelectedParking={setSelectedParking}
                    />
                ))}
            </ul>
        </div>
    );
}
