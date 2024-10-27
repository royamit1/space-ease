import React from "react";
import {Parking} from "@/hooks/useParkingSpots";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    parkingSpots: Parking[];
    onParkingSpotClick: (parking: Parking) => void;
}

export function ParkingList({parkingSpots, onParkingSpotClick}: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {parkingSpots.map((parkingSpot) => (
                    <li
                        key={parkingSpot.id}
                        className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                        onClick={() => onParkingSpotClick(parkingSpot)} // Directly call setSelectedParking
                    >
                        <ParkingSpotItem parking={parkingSpot}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}