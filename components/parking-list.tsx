'use client';
import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    parkingSpots: ParkingSpot[];
    onParkingSelect: (spot: ParkingSpot) => void;
}

export function ParkingList({parkingSpots, onParkingSelect }: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {parkingSpots.map((spot) => (
                    <ParkingSpotItem
                        key={spot.id}
                        spot={spot}
                        onClick={() => onParkingSelect(spot)}
                    />
                ))}
            </ul>
        </div>
    );
}
