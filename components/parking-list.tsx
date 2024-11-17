'use client';
import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    parkingSpots: ParkingSpot[];
}

export const ParkingList: React.FC<ParkingListProps> = ({parkingSpots}) => (
    <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-3">
        {parkingSpots.map((spot) => (
            <ParkingSpotItem
                key={spot.id}
                spot={spot}
            />
        ))}
    </ul>
);