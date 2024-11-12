'use client';
import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    parkingSpots: ParkingSpot[];
}

export const ParkingList: React.FC<ParkingListProps> = ({parkingSpots}) => (
    <div className="flex-grow w-full p-3 overflow-y-auto">
        <ul className="space-y-2">
            {parkingSpots.map((spot) => (
                <ParkingSpotItem
                    key={spot.id}
                    spot={spot}
                />
            ))}
        </ul>
    </div>
);
