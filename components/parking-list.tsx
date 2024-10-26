import React from "react";
import {Parking} from "@/hooks/useParkingSpots";
import {ParkingSpotItem} from "./parking-item"; // Import the new component

interface ParkingListProps {
    parkingSpots: Parking[];
}

export function ParkingList({parkingSpots}: ParkingListProps) {
    return (
        <ul className="space-y-2 p-3">
            {parkingSpots.map((parking) => (
                <li key={parking.id}
                    className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200">
                    <ParkingSpotItem parking={parking}/>
                </li>
            ))}
        </ul>
    );
}
