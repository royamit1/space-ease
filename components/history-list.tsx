'use client';
import React from "react";
import {RentalHistory} from "@/prisma/generated/client";
import {HistoryParkingSpotItem} from "@/components/history-parking-item";

interface ParkingListProps {
    historyParkingSpots: RentalHistory[];
}

export const HistoryParkingList: React.FC<ParkingListProps> = ({historyParkingSpots}) => (
    <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-3">
        {historyParkingSpots.map((historyParkingSpot) => (
            <HistoryParkingSpotItem
                key={historyParkingSpot.id}
                historyParkingSpot={historyParkingSpot}
            />
        ))}
    </ul>
);